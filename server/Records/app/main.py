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
from app.routes.GQL.Doctor import Query as d_query
from app.utils import load_to_redis
from app.routes.REST.REST import route as w_route
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

logger = logging.getLogger("uvicorn")




# startup events
@asynccontextmanager
async def lifespan(app:FastAPI):


    # database connection startup
    logger.info("connecting to DB 🍃...")
    DBClient = pymongo.MongoClient(URL)
    Database = DBClient.get_database("records_db")
    ptclient = DBClient.get_database("users_db")
    app.state.ObservationCollection = Database.get_collection("observations")
    app.state.AllergiesCollection = Database.get_collection("allergyIntolerance")
    app.state.MedicationsCollection = Database.get_collection("medications")
    app.state.ImmunizationsCollection = Database.get_collection("immunizations")
    app.state.ProceduresCollection = Database.get_collection("procedures")
    app.state.LabsCollection = Database.get_collection("labs")
    app.state.PrescriptionsCollection = Database.get_collection("prescriptions")

    app.state.PatientsCollection = ptclient.get_collection("patients")
    app.state.DoctorsCollection = ptclient.get_collection("doctors")

    # cache connection startup
    logger.info("connecting to cache 📚...")
    app.state.Cache = redis_AX("redis://cache",100,service="records").connect()


    yield

    logger.info("shutting down server")

    # cleanup tasks
    DBClient.close()
    app.state.Cache.disconnect()


# instantiating FastAPI server
app = FastAPI(title="record",lifespan=lifespan)

# aGts37rYk@fVrFJ
       
patient_schema = strawberry.Schema(PatientQuery)
patient_gql_router = GraphQLRouter(patient_schema,dependencies=[Depends(Authenticate)])


        

doctor_schema = strawberry.Schema(d_query)
doctor_gql_router = GraphQLRouter(doctor_schema,dependencies=[Depends(Authenticate)])

app.include_router(patient_gql_router, prefix="/graphql/patient")
app.include_router(doctor_gql_router, prefix="/graphql/doctor")
app.include_router(w_route)

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
    uvicorn.run(app= "app.main:app",host="0.0.0.0",port=5000,reload=True)





# Az cluster user - TestAxionAdmin
# Az cluster pw - YRmx2JtrK44FDLV