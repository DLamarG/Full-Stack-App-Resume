from flask import Flask, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
import os
import boto3
from botocore.exceptions import NoCredentialsError, ClientError

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)


CORS(app, resources={r"/visit": {"origins": "*"}})

# AWS DynamoDB Configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION")
DYNAMODB_TABLE = os.getenv("DYNAMODB_TABLE", 'VisitCounter')

# Initialize DynamoDB client
dynamodb = boto3.resource(
    "dynamodb",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)
table = dynamodb.Table(DYNAMODB_TABLE)

# Function to initialize the counter in the existing DynamoDB table
def initialize_db():
    try:
        # Check if the counter item exists
        response = table.get_item(Key={"id": "counter"})
        if "Item" not in response:
            # Initialize the counter if it doesn't exist
            print("Initializing visit counter...")
            table.put_item(Item={"id": "counter", "visits": 0})
            print("Visit counter initialized.")
        else:
            print("Visit counter already exists.")
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

# Route to update and fetch visit count
@app.route('/visit', methods=['POST', 'GET'])
def visit():
    try:
        response = table.update_item(
            Key={"id": "counter"},
            UpdateExpression="SET visits = visits + :inc",
            ExpressionAttributeValues={":inc": 1},
            ReturnValues="UPDATED_NEW"
        )
        new_count = response["Attributes"]["visits"]

        # Create a response and add CORS headers
        res = make_response(jsonify({"message": "Visit recorded", "total_visits": new_count}))
        res.headers.add("Access-Control-Allow-Origin", "*")  # Allow all origins (change in prod)
        res.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        res.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return res

    except NoCredentialsError:
        return jsonify({"error": "AWS credentials not found"}), 500
    except ClientError as e:
        return jsonify({"error": str(e)}), 500
# def visit():
#     try:
#         # Update the visit count in DynamoDB
#         response = table.update_item(
#             Key={"id": "counter"},
#             UpdateExpression="SET visits = visits + :inc",
#             ExpressionAttributeValues={":inc": 1},
#             ReturnValues="UPDATED_NEW"
#         )
#         new_count = response["Attributes"]["visits"]
#         return jsonify({"message": "Visit recorded", "total_visits": new_count})
#     except NoCredentialsError:
#         return jsonify({"error": "AWS credentials not found"}), 500
#     except ClientError as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/')
# def serve_frontend():
#     return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    initialize_db()
    app.run(host='0.0.0.0', port=5500, debug=True)












































# # Second Configuration
# from flask import Flask, jsonify
# import psycopg2
# from flask_cors import CORS
# from dotenv import load_dotenv
# import os


# load_dotenv()

# app = Flask(__name__)

# CORS(app)

# # PostgreSQL Connection Details
# DB_HOST = os.getenv("DB_HOST")
# DB_NAME = os.getenv("DB_NAME")
# DB_USER = os.getenv("DB_USER")
# DB_PASSWORD = os.getenv("DB_PASSWORD")

# # Function to connect to the database
# def get_db_connection():
#     return psycopg2.connect(
#         host=DB_HOST,
#         database=DB_NAME,
#         user=DB_USER,
#         password=DB_PASSWORD
#     )

# # Function to initialize the database
# def initialize_db():
#     conn = get_db_connection()
#     cursor = conn.cursor()

#     # Create a table if it doesn't exist
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS counter (
#             id SERIAL PRIMARY KEY,
#             visits INT DEFAULT 0
#         )
#     """)

#     # Check if there's an existing row, if not, insert one
#     cursor.execute("SELECT COUNT(*) FROM counter")
#     count = cursor.fetchone()[0]
#     if count == 0:
#         cursor.execute("INSERT INTO counter (visits) VALUES (0)")

#     conn.commit()
#     cursor.close()
#     conn.close()

# # Route to update and fetch visit count
# @app.route('/visit', methods=['POST'])
# def visit():
#     conn = get_db_connection()
#     cursor = conn.cursor()

#     # Update visit count
#     cursor.execute("UPDATE counter SET visits = visits + 1 RETURNING visits")
#     new_count = cursor.fetchone()[0]

#     conn.commit()
#     cursor.close()
#     conn.close()

#     return jsonify({"message": "Visit recorded", "total_visits": new_count})

# if __name__ == '__main__':
#     initialize_db()
#     app.run(host='0.0.0.0', port=5500, debug=True)



