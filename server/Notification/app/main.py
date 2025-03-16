from contextlib import asynccontextmanager
import logging
import warnings
from fastapi import FastAPI
import asyncio
import uvicorn
from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ
from app.shared.utils.Cache.redis import redis_AX
from dotenv import load_dotenv
import os
from app.callback.callback import callback

load_dotenv()

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

# suppress pymongo Azure warning
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

# setting up logger
logger = logging.getLogger("uvicorn")

# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):

    # rabbitMQ connection startup
    app.state.sender_task = sendMQ("localhost","security")
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@mq/",'security',callback=callback))

    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = MongoClient(URL)
    Database = DBClient.get_database("users_db")
    app.state.PatientsCollection = Database.get_collection("patients")
    app.state.DoctorsCollection = Database.get_collection("doctors")
    app.state.HospitalCollection = Database.get_collection("hospital")
    
    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache:6379",10).connect()

    yield

    logger.info("shutting down server")

    # cleanup tasks
    app.state.consumer_task.cancel()
    DBClient.close()
    app.state.Cache.disconnect()


# instantiating FastAPI server
app = FastAPI(lifespan=lifespan,title="notification")

connected_clients = set()
notification_queue = asyncio.Queue() 

TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_API_SECRET = os.getenv("MAILJET_API_SECRET")
MAILJET_FROM_EMAIL = os.getenv("MAILJET_FROM_EMAIL")



if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8080,reload=True)