# Second Configuration
from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)

CORS(app)

# PostgreSQL Connection Details
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Function to connect to the database
def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

# Function to initialize the database
def initialize_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Create a table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS counter (
            id SERIAL PRIMARY KEY,
            visits INT DEFAULT 0
        )
    """)

    # Check if there's an existing row, if not, insert one
    cursor.execute("SELECT COUNT(*) FROM counter")
    count = cursor.fetchone()[0]
    if count == 0:
        cursor.execute("INSERT INTO counter (visits) VALUES (0)")

    conn.commit()
    cursor.close()
    conn.close()

# Route to update and fetch visit count
@app.route('/visit', methods=['POST'])
def visit():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Update visit count
    cursor.execute("UPDATE counter SET visits = visits + 1 RETURNING visits")
    new_count = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Visit recorded", "total_visits": new_count})

if __name__ == '__main__':
    initialize_db()
    app.run(host='0.0.0.0', port=5500, debug=True)










# Initial Configuration

# from flask import Flask, jsonify

# app = Flask(__name__)

# @app.route('/visit', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Hello from Flask API!"})

# if __name__ == '__main__':
#     app.run(debug=True)
