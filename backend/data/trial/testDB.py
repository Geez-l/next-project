import psycopg2
from config import config

try:
    conn = psycopg2.connect(**config())
    print("Connected successfully")
    conn.close()
except Exception as e:
    print("Connection failed:", e)