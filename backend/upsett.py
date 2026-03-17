import psycopg2
import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# =========================
# DATABASE CONFIG
# =========================

DB = {
    "host": "localhost",
    "database": "penguin_db",
    "user": "postgres",
    "password": "password",
    "port": "5432"
}

CSV_FILE = "penguins.csv"


def connect():
    return psycopg2.connect(**DB)


# =========================
# COPY CSV → STAGING
# =========================

def load_csv():

    conn = connect()
    cur = conn.cursor()

    print("Loading CSV to staging table...")

    cur.execute("TRUNCATE staging_penguins")

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        cur.copy_expert(
            """
            COPY staging_penguins
            FROM STDIN
            WITH CSV HEADER
            DELIMITER ','
            """,
            f
        )

    conn.commit()
    cur.close()
    conn.close()

    print("CSV loaded.")


# =========================
# CLEAN DATA
# =========================

def clean_data():

    conn = connect()
    cur = conn.cursor()

    print("Cleaning data...")

    # Remove rows without species
    cur.execute("""
    DELETE FROM staging_penguins
    WHERE species IS NULL
    """)

    # Standardize species name
    cur.execute("""
    UPDATE staging_penguins
    SET species = INITCAP(species)
    """)

    conn.commit()
    cur.close()
    conn.close()

    print("Cleaning finished.")


# =========================
# UPSERT PRODUCTION TABLES
# =========================

def upsert():

    conn = connect()
    cur = conn.cursor()

    print("Updating production tables...")

    # UPSERT species
    cur.execute("""
    INSERT INTO species (species_name)
    SELECT DISTINCT species
    FROM staging_penguins
    ON CONFLICT (species_name) DO NOTHING
    """)

    # UPSERT penguins
    cur.execute("""
    INSERT INTO penguins (
        species_id,
        island,
        sex,
        diet,
        life_stage,
        health_metrics,
        year
    )
    SELECT
        s.species_id,
        sp.island,
        sp.sex,
        sp.diet,
        sp.life_stage,
        sp.health_metrics,
        sp.year
    FROM staging_penguins sp
    JOIN species s
    ON sp.species = s.species_name
    ON CONFLICT (species_id, island, year) DO UPDATE
    SET
        sex = EXCLUDED.sex,
        diet = EXCLUDED.diet,
        life_stage = EXCLUDED.life_stage,
        health_metrics = EXCLUDED.health_metrics
    """)

    # INSERT measurements
    cur.execute("""
    INSERT INTO measurements (
        penguin_id,
        bill_length_mm,
        bill_depth_mm,
        flipper_length_mm,
        body_mass_g
    )
    SELECT
        p.penguin_id,
        sp.bill_length_mm,
        sp.bill_depth_mm,
        sp.flipper_length_mm,
        sp.body_mass_g
    FROM staging_penguins sp
    JOIN species s
        ON sp.species = s.species_name
    JOIN penguins p
        ON p.species_id = s.species_id
    """)

    # INSERT images
    cur.execute("""
    INSERT INTO images (penguin_id, image_url)
    SELECT
        p.penguin_id,
        sp.image
    FROM staging_penguins sp
    JOIN species s
        ON sp.species = s.species_name
    JOIN penguins p
        ON p.species_id = s.species_id
    WHERE sp.image IS NOT NULL
    """)

    conn.commit()
    cur.close()
    conn.close()

    print("Production tables updated.")


# =========================
# RUN PIPELINE
# =========================

def run_pipeline():

    print("Pipeline started")

    load_csv()
    clean_data()
    upsert()

    print("Pipeline finished")


# =========================
# WATCH FOR CSV CHANGES
# =========================

class CSVWatcher(FileSystemEventHandler):

    def on_modified(self, event):

        if event.src_path.endswith(CSV_FILE):

            print("CSV updated")
            run_pipeline()


def watch_csv():

    observer = Observer()

    observer.schedule(
        CSVWatcher(),
        path=os.getcwd(),
        recursive=False
    )

    observer.start()

    print("Watching for CSV updates...")

    try:
        while True:
            time.sleep(2)

    except KeyboardInterrupt:
        observer.stop()

    observer.join()


if __name__ == "__main__":
    watch_csv()