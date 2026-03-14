# Connect postgres to python

import psycopg2
from config import config

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

if __name__ == "__main__":
    connect()


