from contextlib import asynccontextmanager
import logging
import warnings
from fastapi import FastAPI
import asyncio
from pymongo import MongoClient
import uvicorn
from app.shared.utils.MQ.reciver import RedReciver
from app.shared.utils.MQ.sender import sendMQ
from app.shared.utils.Cache.redis import redis_AX
from dotenv import load_dotenv
from app.callback.callback import callback
from firebase_admin import credentials
import firebase_admin
from app.routes.WS import route as w_route
from app.routes.REST import route as r_route 
from app.routes.test import route as t_route

load_dotenv()

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

# suppress pymongo Azure warning
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

# setting up logger
logger = logging.getLogger("uvicorn")

# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):
    logger.info("v-000")
    
    app.state.consumer_task = asyncio.create_task(RedReciver("redis://cache",'security',executer=callback))

    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = MongoClient(URL)
    Database = DBClient.get_database("notifications_db")
    app.state.TokensCollection = Database.get_collection("userDeviceTokens")
    app.state.Notifications = Database.get_collection("notifications")

    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache:6379",10).connect()

    # firebase initialization
    logger.info("connecting to firebase 🔥...")
    c_credentials = credentials.Certificate("./app/data/axion-6a492-firebase-adminsdk-fbsvc-b2d355fda3.json")
    app.state.firebase = firebase_admin.initialize_app(credential=c_credentials)

    yield

    logger.info("shutting down server")

    # cleanup tasks
    app.state.consumer_task.cancel()
    DBClient.close()
    app.state.Cache.disconnect()


# instantiating FastAPI server
app = FastAPI(lifespan=lifespan,title="notification")

app.include_router(w_route)
app.include_router(r_route)
app.include_router(t_route)

logger.info(app.routes)

if __name__ == '__main__':
    uvicorn.run("app.main:app",host="0.0.0.0",port=8080,reload=True)