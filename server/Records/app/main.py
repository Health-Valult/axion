from contextlib import asynccontextmanager
import logging
import warnings
import pymongo
import uvicorn
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from app.utils.sender import sendMQ
from app.utils.logging import*
from app.shared.utils.Cache.redis import redis_AX
from app.shared.middleware.authentication import AuthenticateMiddleware
from app.routes.GQL import Query

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

logger = logging.getLogger("uvicorn")


# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):

    # rabbitMQ connection startup
    #app.state.sender_task = sendMQ("mq","record")

    # loader function
    #app.state.search_loader = asyncio.create_task(load_to_redis.loader())

    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = pymongo.MongoClient(URL)
    Database = DBClient.get_database("users_db")
    app.state.ObservationCollection = Database.get_collection("observations")
    app.state.AllergiesCollection = Database.get_collection("allergyIntolerance")
    app.state.MedicationsCollection = Database.get_collection("medications")
    app.state.ImmunizationsCollection = Database.get_collection("immunizations")
    app.state.ProceduresCollection = Database.get_collection("procedures")

    app.state.PatientsCollection = Database.get_collection("patients")


    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache:6379",10).connect()

    logger.info(app.state)

    yield

    logger.info("shutting down server")

    # cleanup tasks
    #app.state.consumer_task.cancel()
    DBClient.close()
    app.state.Cache.disconnect()


# instantiating FastAPI server
app = FastAPI(title="record",lifespan=lifespan)


# aGts37rYk@fVrFJ
       

schema = strawberry.Schema(Query)
graphql_app = GraphQLRouter(schema)

app.include_router(graphql_app, prefix="/graphql")
#app.add_middleware(AuthenticateMiddleware)

# main app
if __name__ == '__main__':
    uvicorn.run(app= "app.main:app",port=5000,reload=True)





# Az cluster user - TestAxionAdmin
# Az cluster pw - YRmx2JtrK44FDLV