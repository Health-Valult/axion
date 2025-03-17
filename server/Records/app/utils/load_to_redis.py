from fastapi import FastAPI
from pymongo.collection import Collection
from pymongo.cursor import Cursor
import redis


async def load_to_redis(app:FastAPI):
    collection:Collection = app.state.PatientsCollection
    cache = redis.Redis(host ="cache" ,port=6379)
    patients:Cursor = collection.find({},{"_id": 0, "FirstName": 1, "NIC": 1,"UserID":1 })
    
    for documents in patients:
        nic = documents.get("NIC")
        
        if not cache.exists(nic):
            cache.hset(
                name=documents.get("NIC"),
                mapping={
                    "name":documents.get("FirstName"),
                    "id":documents.get("UserID")
                }
            )

