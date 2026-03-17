import psycopg2
from config import config
import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

csv_file = os.path.join(os.path.dirname(__file__), "penguins.csv")


def connect():
    try:
        params = config()
        return psycopg2.connect(**params)
    except Exception as e:
        print("Database connection error:", e)
        return None


def ingest_data():
    conn = connect()
    if not conn:
        return

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT current_database(), current_user;")
            db_name, db_user = cur.fetchone()
            print("Connected to database:", db_name)
            print("Connected as user:", db_user)

            print("Truncating staging table...")
            cur.execute("TRUNCATE TABLE penguins_staging RESTART IDENTITY;")

            print("Loading CSV into staging...")
            with open(csv_file, "r", encoding="utf-8") as file:
                cur.copy_expert(
                    """
                    COPY penguins_staging (
                        species,
                        island,
                        bill_length_mm,
                        bill_depth_mm,
                        flipper_length_mm,
                        body_mass_g,
                        sex,
                        diet,
                        life_stage,
                        health_metrics,
                        year_taken,
                        image_url
                    )
                    FROM STDIN
                    WITH (FORMAT CSV, HEADER TRUE)
                    """,
                    file
                )

            cur.execute("SELECT COUNT(*) FROM penguins_staging;")
            count = cur.fetchone()[0]
            conn.commit()
            print(f"Data ingested successfully: {count} rows loaded into staging.")

    except Exception as e:
        conn.rollback()
        print("Ingest error:", e)
    finally:
        conn.close()


def clean_data():
    conn = connect()
    if not conn:
        return

    try:
        with conn.cursor() as cur:
            print("Cleaning staging data...")

            cur.execute("""
                DELETE FROM penguins_staging
                WHERE species IS NULL
                   OR TRIM(species) = '';
            """)

            cur.execute("""
                UPDATE penguins_staging
                SET
                    species = INITCAP(TRIM(species)),
                    island = NULLIF(TRIM(island), ''),
                    sex = LOWER(TRIM(sex)),
                    diet = NULLIF(TRIM(diet), ''),
                    life_stage = NULLIF(TRIM(life_stage), ''),
                    health_metrics = NULLIF(TRIM(health_metrics), ''),
                    image_url = NULLIF(TRIM(image_url), '');
            """)
            cur.execute("""
                UPDATE penguins_staging
                SET sex = NULL
                WHERE sex NOT IN ('male', 'female');
            """)

            cur.execute("SELECT COUNT(*) FROM penguins_staging;")
            count = cur.fetchone()[0]
            conn.commit()
            print(f"Data cleaned. Remaining rows in staging: {count}")

    except Exception as e:
        conn.rollback()
        print("Clean error:", e)
    finally:
        conn.close()


def upsert():
    conn = connect()
    if not conn:
        return

    try:
        with conn.cursor() as cur:
            print("Upserting data...")

            # 1) SPECIES
            cur.execute("""
                INSERT INTO species (species)
                SELECT DISTINCT species
                FROM penguins_staging
                WHERE species IS NOT NULL
                ON CONFLICT (species) DO NOTHING;
            """)

            # 2) PENGUINS
            cur.execute("""
                INSERT INTO penguins (
                    species_id,
                    island,
                    sex,
                    diet,
                    life_stage,
                    health_metrics,
                    year_taken
                )
                SELECT
                    s.species_id,
                    ps.island,
                    CASE
                        WHEN ps.sex IN ('male', 'female')
                        THEN ps.sex::sex_type
                        ELSE NULL
                    END,
                    ps.diet,
                    ps.life_stage,
                    ps.health_metrics,
                    ps.year_taken
                FROM (
                    SELECT
                        species,
                        island,
                        year_taken,
                        MAX(sex) AS sex,
                        MAX(diet) AS diet,
                        MAX(life_stage) AS life_stage,
                        MAX(health_metrics) AS health_metrics
                    FROM penguins_staging
                    GROUP BY species, island, year_taken
                ) ps
                JOIN species s
                  ON s.species = ps.species
                ON CONFLICT (species_id, island, year_taken)
                DO UPDATE SET
                    sex = EXCLUDED.sex,
                    diet = EXCLUDED.diet,
                    life_stage = EXCLUDED.life_stage,
                    health_metrics = EXCLUDED.health_metrics;
            """)

            # 3) CLEAR CHILD TABLES BEFORE RELOADING
            # This is the easiest way when rerunning whole pipeline from scratch
            cur.execute("TRUNCATE TABLE measurement RESTART IDENTITY CASCADE;")
            cur.execute("TRUNCATE TABLE images RESTART IDENTITY CASCADE;")

            # 4) MEASUREMENT
            cur.execute("""
                INSERT INTO measurement (
                    penguins_id,
                    bill_length_mm,
                    bill_depth_mm,
                    flipper_length_mm,
                    body_mass_g
                )
                SELECT
                    p.penguins_id,
                    ps.bill_length_mm,
                    ps.bill_depth_mm,
                    ps.flipper_length_mm,
                    ps.body_mass_g
                FROM penguins_staging ps
                JOIN species s
                  ON s.species = ps.species
                JOIN penguins p
                  ON p.species_id = s.species_id
                 AND p.island = ps.island
                 AND p.year_taken = ps.year_taken;
            """)

            # 5) IMAGES
            cur.execute("""
                INSERT INTO images (
                    penguins_id,
                    image_url
                )
                SELECT
                    p.penguins_id,
                    ps.image_url
                FROM penguins_staging ps
                JOIN species s
                  ON s.species = ps.species
                JOIN penguins p
                  ON p.species_id = s.species_id
                 AND p.island = ps.island
                 AND p.year_taken = ps.year_taken
                WHERE ps.image_url IS NOT NULL;
            """)

            conn.commit()
            print("Upsert complete.")

            # show row counts
            cur.execute("SELECT COUNT(*) FROM species;")
            print("species rows:", cur.fetchone()[0])

            cur.execute("SELECT COUNT(*) FROM penguins;")
            print("penguins rows:", cur.fetchone()[0])

            cur.execute("SELECT COUNT(*) FROM measurement;")
            print("measurement rows:", cur.fetchone()[0])

            cur.execute("SELECT COUNT(*) FROM images;")
            print("images rows:", cur.fetchone()[0])

    except Exception as e:
        conn.rollback()
        print("Upsert error:", e)
    finally:
        conn.close()


def run_pipeline():
    print("\n--- Running pipeline ---")
    ingest_data()
    clean_data()
    upsert()
    print("--- Pipeline complete ---\n")


class CSVWatcher(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith("penguins.csv"):
            print("CSV updated!")
            run_pipeline()


def watch_csv():
    observer = Observer()
    observer.schedule(CSVWatcher(), path=os.path.dirname(csv_file), recursive=False)
    observer.start()
    print("Watching CSV for changes...")
    try:
        while True:
            time.sleep(2)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    run_pipeline()
    # watch_csv()
    # ingest_data()
    # clean_data()
    # upsert()