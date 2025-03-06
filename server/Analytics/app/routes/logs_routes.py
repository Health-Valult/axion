from fastapi import APIRouter 
from models.logs import LogMessage as Log
from config.database import collection_name
from schema.schemas import multiple_serial
from bson import ObjectId 

router = APIRouter()

# GET Request 
@router.get("/get")
async def get_logs():
    logs = multiple_serial(collection_name.find())
    return logs

# POST Request
@router.post("/post")
async def post_log(log: Log):
    collection_name.insert_one(dict(log))

# DELETE Request
@router.delete("/{id}")
async def delete_log(id: str):
    collection_name.find_one_and_delete({"_id": ObjectId(id)})