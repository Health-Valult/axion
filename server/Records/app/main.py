import warnings
import pymongo
import uvicorn
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
import asyncio
from strawberry import Info
from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ
from .ax_types.observation import *
from typing import Optional,List


URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("records_db")
Collection = Database.get_collection("observations")

observation_type = strawberry.union(name="obs_u", types=(Observation,ObservationStack))

MQ = sendMQ("localhost","record")

@strawberry.type
class Query:
    @strawberry.field
    def observations(
            self,
            info:Info,
            patient:str,
            code:str,
            encounter:str
        ) -> Observation: # type: ignore
        
        query={ selection.name:1 for selection in info.selected_fields[0].selections}
        observationAggregate = Collection.aggregate([
                {"$match": {
                    "patient": patient, 
                    "code": code, 
                    "encounter":encounter
                    }},
                {"$project": query|{"_id":0}} 
            ])
        
        observationAggregateResult = next(observationAggregate,None)
        if observationAggregateResult is None:
            return None
        observationQueryResult = Observation(**observationAggregateResult)
        return observationQueryResult
    

    @strawberry.field
    def observationStack(
        self,
        info:Info,
        patient:str,
        code:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        )-> ObservationStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        observationAggregate = Collection.aggregate([
                {"$match": {
                    "patient": patient, 
                    "code": code, 
                    }},
                {"$project": query|{"_id":0}} 
            ])
        
        MQ.send("security","sessionAuth",{"token":info.context["request"].headers["authorization"]})
        return ObservationStack(
            Observations=[Observation(**obs) for obs in observationAggregate]
        )
    @strawberry.field
    def medications(self, id:str,patientId:str) -> str:
        return "med"
    @strawberry.field
    def hospitals(self, id:str,patientId:str) -> str:
        return "hos"
    @strawberry.field
    def encounters(self, id:str,patientId:str) -> str:
        return "enc"
    @strawberry.field
    def patient(self, id:str,patientId:str) -> str:
        return "pat"
    @strawberry.field
    def practioner(self, id:str,patientId:str) -> str:
        return "prac"
    @strawberry.field
    def allergys(self, id:str,patientId:str) -> str:
        return "alle"
    @strawberry.field
    def immunization(self, id:str,patientId:str) -> str:
        return "immun"

schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)



app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")



@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/",'hello'))


if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8080,reload=True)


































"""
CBC
Urine full Report UFR
CRP
Liver Function Test
Fasting Blood Sugar
Serum Creatinine SER
Serum electrolytes 
Lipid Profile
HBA1C
ESR
Thyroxine
"""
# Az cluster user - TestAxionAdmin
# Az cluster pw - YRmx2JtrK44FDLV