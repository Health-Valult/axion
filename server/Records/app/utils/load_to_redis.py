import asyncio
import logging
from fastapi import FastAPI
from pymongo.collection import Collection
from pymongo.cursor import Cursor
import redis

logger = logging.getLogger("uvicorn")


async def load_to_redis(app:FastAPI):
    collection:Collection = app.state.PatientsCollection
    cache = redis.Redis(host ="cache" ,port=6379)
    patients:Cursor = collection.find({},{"_id": 0, "FirstName": 1, "NIC": 1,"UserID":1 })
    logger.info("indexing to 🟥is")
    for documents in patients:
        nic = documents.get("NIC")
        
        if not cache.exists(nic):
            cache.hset(
                name=f"user::search::{documents.get("NIC")}",
                mapping={
                    "name":documents.get("FirstName"),
                    "id":documents.get("UserID")
                }
            )


async def loader(app):
    while True:
        await load_to_redis(app=app)
        await asyncio.sleep(10.0)