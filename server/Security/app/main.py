# modules
import asyncio
import logging
import warnings
import uvicorn
import os

# functions and classes
from pymongo import MongoClient
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# utilities
from app.shared.utils.MQ.reciver import RedReciver
from app.shared.utils.MQ.sender import scarletSender
from app.shared.utils.Cache.redis import redis_AX
#from app.shared.middleware.logging import Logging

# routes
from app.routes.signUp import route as s_route
from app.routes.login import route as l_route
from app.routes.user import route as u_route
from app.routes.otp import route as o_route

# reciver callback function
from app.callback.callBack import callback_security

# setting up logger
logger = logging.getLogger("uvicorn")

AZURE_DATABASE_URL = os.getenv("AZURE_DATABASE_URL")


if not AZURE_DATABASE_URL:
    logger.critical("Unable to load environment variable : AZURE_DATABASE_URL")



# suppress pymongo Azure warning
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")




# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):

    app.state.consumer_task = asyncio.create_task(RedReciver("redis://cache",'security',callback_security))
    
    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = MongoClient(AZURE_DATABASE_URL)
    Database = DBClient.get_database("users_db")
    app.state.PatientsCollection = Database.get_collection("patients")
    app.state.DoctorsCollection = Database.get_collection("doctors")
    app.state.HospitalCollection = Database.get_collection("hospital")
    
    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache",10,service="security").connect()

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


# instantiating FastAPI server
app = FastAPI(lifespan=lifespan,title="security")

# loading routes
app.include_router(s_route)
app.include_router(l_route)
app.include_router(u_route)
app.include_router(o_route)

#app.add_middleware(Logging)
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "https://patient.axionhealth.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# main app
if __name__ == '__main__':
    uvicorn.run(app= "app.main:app",host= "0.0.0.0",port=8000,reload=True)