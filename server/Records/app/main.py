import asyncio
from contextlib import asynccontextmanager
import logging
import warnings
import pymongo
import uvicorn
from fastapi import Depends, FastAPI, WebSocket, WebSocketDisconnect
from strawberry.fastapi import GraphQLRouter
import strawberry
from app.utils.sender import sendMQ
from app.utils.logging import*
from app.shared.utils.Cache.redis import redis_AX
from app.shared.middleware.authentication import Authenticate
from app.routes.GQL.Patient import PatientQuery
from app.utils import load_to_redis
from app.routes.REST.REST import route as w_route

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

logger = logging.getLogger("uvicorn")


# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):

    # rabbitMQ connection startup


    # loader function
    app.state.search_loader = asyncio.create_task(load_to_redis.loader(app=app))

    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = pymongo.MongoClient(URL)
    Database = DBClient.get_database("records_db")
    app.state.ObservationCollection = Database.get_collection("observations")
    app.state.AllergiesCollection = Database.get_collection("allergyIntolerance")
    app.state.MedicationsCollection = Database.get_collection("medications")
    app.state.ImmunizationsCollection = Database.get_collection("immunizations")
    app.state.ProceduresCollection = Database.get_collection("procedures")
    app.state.LabsCollection = Database.get_collection("labs")

    app.state.PatientsCollection = Database.get_collection("patients")


    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache",10,service="records").connect()

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
       
patient_schema = strawberry.Schema(PatientQuery)
patient_gql_router = GraphQLRouter(patient_schema,dependencies=[Depends(Authenticate)])


        

#doctor_schema = strawberry.Schema(Query)
#doctor_gql_router = GraphQLRouter(patient_schema)

app.include_router(patient_gql_router, prefix="/graphql/patient")
#app.include_router(doctor_gql_router, prefix="/graphql/doctor")
app.include_router(w_route)
#app.add_middleware(AuthenticateMiddleware)

# main app
if __name__ == '__main__':
    uvicorn.run(app= "app.main:app",host="0.0.0.0",port=5000,reload=True)





# Az cluster user - TestAxionAdmin
# Az cluster pw - YRmx2JtrK44FDLV