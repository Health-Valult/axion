from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

DB_URI = os.getenv("DB_URI")
DB_NAME = "notifications_db"

client = AsyncIOMotorClient(DB_URI)
db = client[DB_NAME]
notifications_collection = db["notifications"]
