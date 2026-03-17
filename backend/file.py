import psycopg2
import pandas as pd
import json
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
# LOAD CSV → STAGING
# =========================

def load_csv():

    print("Loading CSV...")

    df = pd.read_csv(CSV_FILE)

    conn = connect()
    cur = conn.cursor()

    cur.execute("TRUNCATE staging_penguins")

    for _, row in df.iterrows():

        raw_json = json.dumps(row.dropna().to_dict())

        cur.execute(
            """
            INSERT INTO staging_penguins (raw_data)
            VALUES (%s)
            """,
            (raw_json,)
        )

    conn.commit()
    cur.close()
    conn.close()

    print("CSV loaded to staging")


# =========================
# CLEAN DATA
# =========================

def clean_data():

    conn = connect()
    cur = conn.cursor()

    print("Cleaning data")

    # Remove rows without species
    cur.execute("""
    DELETE FROM staging_penguins
    WHERE raw_data->>'species' IS NULL
    """)

    conn.commit()
    cur.close()
    conn.close()

    print("Cleaning complete")


# =========================
# UPSERT TO PRODUCTION
# =========================

def upsert():

    conn = connect()
    cur = conn.cursor()

    print("Updating production tables")

    # UPSERT species
    cur.execute("""
    INSERT INTO species (species_name)
    SELECT DISTINCT raw_data->>'species'
    FROM staging_penguins
    ON CONFLICT DO NOTHING
    """)

    # Insert penguins with JSONB
    cur.execute("""
    INSERT INTO penguins (
        species_id,
        island,
        sex,
        year,
        measurements,
        extra_attributes
    )
    SELECT
        s.species_id,
        raw_data->>'island',
        raw_data->>'sex',
        (raw_data->>'year')::INT,

        jsonb_build_object(
            'bill_length_mm', raw_data->>'bill_length_mm',
            'bill_depth_mm', raw_data->>'bill_depth_mm',
            'flipper_length_mm', raw_data->>'flipper_length_mm',
            'body_mass_g', raw_data->>'body_mass_g'
        ),

        raw_data
        - 'species'
        - 'island'
        - 'sex'
        - 'year'
        - 'bill_length_mm'
        - 'bill_depth_mm'
        - 'flipper_length_mm'
        - 'body_mass_g'

    FROM staging_penguins sp
    JOIN species s
    ON raw_data->>'species' = s.species_name
    """)

    conn.commit()
    cur.close()
    conn.close()

    print("Production updated")


# =========================
# PIPELINE
# =========================

def run_pipeline():

    print("Pipeline started")

    load_csv()
    clean_data()
    upsert()

    print("Pipeline finished")


# =========================
# WATCH CSV
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

    print("Watching CSV for updates")

    try:
        while True:
            time.sleep(2)

    except KeyboardInterrupt:
        observer.stop()

    observer.join()


if __name__ == "__main__":
    watch_csv()


-- =========================
-- STAGING TABLE
-- =========================

DROP TABLE IF EXISTS staging_penguins;

CREATE TABLE staging_penguins (
    raw_data JSONB
);


-- =========================
-- PRODUCTION TABLES
-- =========================

DROP TABLE IF EXISTS penguins CASCADE;
DROP TABLE IF EXISTS species CASCADE;

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    species_name TEXT UNIQUE
);

CREATE TABLE penguins (
    penguin_id SERIAL PRIMARY KEY,
    species_id INT REFERENCES species(species_id),

    island TEXT,
    sex TEXT,
    year INT,

    measurements JSONB,
    extra_attributes JSONB
);

CREATE INDEX idx_penguin_extra
ON penguins
USING GIN (extra_attributes);