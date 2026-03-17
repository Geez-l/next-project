# cd /home/philomics-glee/Desktop/glee-philomics/next-project/backend/data and cat > data_pipeline.py <<'PY'
# Connect postgres to python

import psycopg2
from config import config
import csv

import os
import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from watchdog.events import FileSystemEventHandler

# csv_file = "/backend/data/penguins.csv"
csv_file = os.path.join(os.path.dirname(__file__), 'penguins.csv')

# create connection
def connect():
    conn = None
    try: 
        params = config()
        print("Connecting to the database ...")
        conn = psycopg2.connect(**params)

        # create a cursor
        # curs = conn.cursor()
        # print("Postgresql database version")
        # curs.execute("SELECT version()")
        # db_version = curs.fetchone()
        # print(db_version)
        # curs.close()
        return conn
         
    # except Exception as e :
    #     print("Error occurred: {e}")
    except(Exception, psycopg2.DatabaseError) as error:
        print("Error occurred:", error)  
    # finally:
    #     if conn is not None:
    #         conn.close()
    #         print("Database connection terminated.")

def ingest_data():
    # connect to postgresql
    conn = connect()
    curr = conn.cursor()
    print("Loading csv to the staging table")

    # open the csv file
    with open(csv_file, 'r', encoding="utf-8") as file:
        curr.copy_expert(
            """
        COPY penguins_staging
        (
        species,
        island,
        bill_length_mm,
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
        WITH (FORMAT csv, 
        HEADER true
        DELIMITER ','
            """,
            file
        )

        conn.commit()
        curr.close()
        conn.close()
        print("Data ingested successfully")

# clean the data
def clean_data():
    conn = connect()
    curr = conn.cursor()
    print("Cleaning data")

    # remove rows without species
    curr.execute("""
    DELETE FROM penguins_staging 
    WHERE species is NULL
    """)

    # standardize species name
    curr.execute("""
    UPDATE penguins_staging 
    SET species = INITCAP(species)
    """)

    conn.commit()
    curr.close()
    conn.close()
    print("Data cleaned")

def upsert():
    conn = connect()
    curr =conn.cursor()
    print("Updating tables")

    # update species
    curr.execute("""
    INSERT INTO species
    (species)
    SELECT DISTINCT species
    FROM penguins_staging
    WHERE species is NOT NULL
    ON CONFLICT (species)
    DO NOTHING
    """)

    # update penguins 
    curr.execute("""
    INSERT INTO penguins(
    species_id,
    island,
    sex,
    diet,
    life_stage,
    health_metrics,
    year_penguin
    )
    SELECT
    s.species_id,
    ps.island,
    ps.sex,
    ps.diet,
    ps.life_stage,
    ps.health_metrics,
    ps.year_penguin
    FROM penguins_staging ps
    JOIN species s
    ON ps.species = s.species
    ON CONFLICT (species_id, island, year_penguin)
    DO UPDATE 

    SET
        sex = EXCLUDED.sex,
        diet = EXCLUDED.diet,
        life_stage = EXCLUDED.diet,
        health_metrics = EXCLUDED.health_metrics
        
    """)

    # update measurements
    curr.execute("""
    INSERT INTO measurement(
    penguins_id,
    bill_length_mm,
    flipper_length_mm,
    body_mass_g
    )
    SELECT 
    p.penguins_id
    ps.bill_length_mm,
    ps.bill_depth_mm,
    ps.flipper_length_mm,
    ps.body_mass_g
    FROM penguins_staging ps
    JOIN psecies s
    ON ps.psecies = s.species
    JOIN penguins p 
    ON p.species_id = s.species_id
    """)

    # update images
    curr.execute("""
    INSERT INTO images (
    penguin_id,
    image_url
    )
    SELECT 
    p.penguin_id,
    ps.image_url
    FROM penguins_staging ps
    JOIN species s
    ON ps.species = s.species
    JOIN penguins p
    ON p.species_id = s.species_id
    WHERE ps.image is NOT NULL
    """)

    conn.commit()
    curr.close()
    print("Tables updated")

def run_pipeline():
    connect()
    ingest_data()
    clean_data()
    upsert()

    print("Pipeline executed")


# CSV Watcher for changes 
class CSVWatcher(FileSystemEventHandler):
    def on_modify(self, event):
        if event.src_path.endswith(csv_file):
            print("CSV updated")
            run_pipeline()

def watch_csv():
    observer = Observer()
    observer.schedule(
        CSVWatcher(),
        path = os.getcwd(),
        recursive = False
    )

    observer.start()
    print("Watching csv updates")

    try:
        while True: 
            time.sleep(2)
    # finally: 
    #     observer.stop()
    #     observer.join()      
    except KeyboardInterrupt:
        observer.stop()

    observer.join()  

if __name__ == "__main__":
    # connect()
    watch_csv()


