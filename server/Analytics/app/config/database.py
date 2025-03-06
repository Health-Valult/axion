from pymongo import MongoClient

# Connect to the MongoDB, change the connection string to the actual MongoDB cluster environment
client = MongoClient("")

db = client.logs_db

collection_name = db["server_requests"]