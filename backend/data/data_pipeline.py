# Connect postgres to python

import psycopg2
from config import config
import csv

csv_file = "/backend/data/penguins.csv"
# create connection
def connect():
    conn = None
    try: 
        params = config()
        print("Connecting to the database ...")
        conn = psycopg2.connect(**params)

        # create a cursor
        curs = conn.cursor()
        print("Postgresql database version")
        curs.execute("SELECT version()")
        db_version = curs.fetchone()
        print(db_version)
        curs.close()
         
    # except Exception as e :
    #     print("Error occurred: {e}")
    except(Exception, psycopg2.DatabaseError) as error:
        print("Error occurred:", error)  
    finally:
        if conn is not None:
            conn.close()
            print("Database connection terminated.")

def ingest_data():
    # connect to postgresql
    conn = connect()
    curr = conn.cursor()
    print("Loading csv to the staging table")

    # open the csv file
    with open(csv_file, 'r', encoding="utf-8") as file:
        curr.copy_expert(
            """
        COPY penguins_staging FROM STDIN
        DELIMITER as ','
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
    INSERT INTO species_pen(species)
    SELECT species_id, species
    FROM penguins_staging
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
    
    """)

if __name__ == "__main__":
    connect()


