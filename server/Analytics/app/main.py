import asyncio
from contextlib import asynccontextmanager
import logging
import os
from fastapi import FastAPI
from pymongo import MongoClient
import uvicorn
from app.shared.utils.MQ.reciver import RedReciver
from app.shared.utils.Cache.redis import redis_AX
from app.callback.callback import callback_security

# setting up logger
logger = logging.getLogger("uvicorn")

AZURE_DATABASE_URL = os.getenv("AZURE_DATABASE_URL")


if not AZURE_DATABASE_URL:
    logger.critical("Unable to load environment variable : AZURE_DATABASE_URL")

# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):

    app.state.consumer_task = asyncio.create_task(RedReciver("redis://cache",'analytics',callback_security))
    
    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = MongoClient(AZURE_DATABASE_URL)
    Database = DBClient.get_database("users_db")
    app.state.PatientsCollection = Database.get_collection("patients")
    app.state.DoctorsCollection = Database.get_collection("doctors")
    app.state.HospitalCollection = Database.get_collection("hospitals")
    
    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache",10,service="analytics").connect()

    # loading refresh token
    with open('./app/data/keys/refresh_private.pem', 'r') as file:
        app.state.refresh_private_key = file.read()

    logger.info(app.state)

    yield

    logger.info("shutting down server")

    # cleanup tasks
    app.state.consumer_task.cancel()
    DBClient.close()
    app.state.Cache.disconnect()






app = FastAPI(title="Analytics Server", description="Microservice to recieve logs and persist in database for monitoring.",lifespan=lifespan)









if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8080,reload=True)


