cd /home/philomics-glee/Desktop/glee-philomics/next-project/backend/data && cat > data_pipeline.py <<'PY'
import psycopg2
from config import config
import os

csv_file = os.path.join(os.path.dirname(__file__), "penguins.csv")


def get_connection():
    params = config()
    return psycopg2.connect(**params)


def connect():
    conn = None
    try:
        print("Connecting to the database ...")
        conn = get_connection()
        with conn.cursor() as curs:
            curs.execute("SELECT version()")
            print("Postgresql database version", curs.fetchone())
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error occurred:", error)
        raise
    finally:
        if conn is not None:
            conn.close()
            print("Database connection terminated.")


def ingest_data():
    conn = get_connection()
    try:
        with conn.cursor() as curr:
            print("Loading csv to the staging table")
            with open(csv_file, 'r', encoding='utf-8') as file:
                curr.copy_expert(
                    """
                    COPY penguins_staging(species,island,bill_length_mm,bill_depth_mm,flipper_length_mm,body_mass_g,sex,diet,life_stage,health_metrics,year_taken,image_url)
                    FROM STDIN WITH CSV HEADER DELIMITER ','
                    """,
                    file,
                )
            conn.commit()
            print("Data ingested successfully")
    finally:
        conn.close()


def clean_data():
    conn = get_connection()
    try:
        with conn.cursor() as curr:
            print("Cleaning data")
            curr.execute("DELETE FROM penguins_staging WHERE species IS NULL")
            curr.execute("UPDATE penguins_staging SET species = INITCAP(species)")
            conn.commit()
            print("Data cleaned")
    finally:
        conn.close()


def upsert():
    conn = get_connection()
    try:
        with conn.cursor() as curr:
            print("Inserting/updating reference and fact tables")
            curr.execute(
                """
                INSERT INTO species_pen(species)
                SELECT DISTINCT species
                FROM penguins_staging
                ON CONFLICT (species) DO NOTHING
                """
            )

            curr.execute(
                """
                INSERT INTO penguins(island, sex, diet, life_stage, health_metrics, year_penguin, species_id)
                SELECT ps.island, ps.sex, ps.diet, ps.life_stage, ps.health_metrics, ps.year_taken, s.species_id
                FROM penguins_staging ps
                JOIN species_pen s ON ps.species = s.species
                ON CONFLICT (species_id, island, year_penguin) DO UPDATE
                SET
                    sex = EXCLUDED.sex,
                    diet = EXCLUDED.diet,
                    life_stage = EXCLUDED.life_stage,
                    health_metrics = EXCLUDED.health_metrics
                """
            )

            curr.execute(
                """
                INSERT INTO measurement(bill_length_mm, bill_depth_mm, flipper_length_mm, body_mass_g, penguin_id)
                SELECT ps.bill_length_mm, ps.bill_depth_mm, ps.flipper_length_mm, ps.body_mass_g, p.penguins_id
                FROM penguins_staging ps
                JOIN species_pen s ON ps.species = s.species
                JOIN penguins p ON p.species_id = s.species_id
                """
            )

            curr.execute(
                """
                INSERT INTO images(image_url, penguin_id)
                SELECT ps.image_url, p.penguins_id
                FROM penguins_staging ps
                JOIN species_pen s ON ps.species = s.species
                JOIN penguins p ON p.species_id = s.species_id
                WHERE ps.image_url IS NOT NULL
                """
            )

            conn.commit()
            print("Tables upsert completed")
    finally:
        conn.close()


def run_pipeline():
    ingest_data()
    clean_data()
    upsert()
    print("Pipeline executed")


if __name__ == "__main__":
    run_pipeline()
PY