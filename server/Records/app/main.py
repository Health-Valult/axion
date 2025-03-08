import warnings
import pymongo
import uvicorn
from fastapi import FastAPI,HTTPException
from strawberry.fastapi import GraphQLRouter
import strawberry
import asyncio
from strawberry import Info
from typing import Optional

from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ

from app.ax_types.observation import *
from app.ax_types.allergyIntolerance import *
from app.ax_types.medications import *
from app.ax_types.immunization import *
from app.ax_types.procedure import *

from app.middleware.auth import Auth
from app.middleware.logging import Logging

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
warnings.filterwarnings("ignore", message="You appear to be connected to a CosmosDB cluster")

DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("records_db")

ObsCollection = Database.get_collection("observations")
AllCollection = Database.get_collection("allergyIntolerance")
MedCollection = Database.get_collection("medications")
ImmCollection = Database.get_collection("immunizations")
ProCollection = Database.get_collection("procedures")

#MQ = sendMQ("localhost","record")

@strawberry.type
class Query:

    @strawberry.field
    def observations(
            self,
            info:Info,
            patient:str,
            code:str,
            encounter:str
        ) -> Observation:
        
        query={ selection.name:1 for selection in info.selected_fields[0].selections}
        observationAggregate = ObsCollection.aggregate([
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
            observationAggregate = ObsCollection.aggregate([
                    {"$match": {
                        "patient": patient, 
                        "code": code, 
                        }},
                    {"$project": query|{"_id":0}} 
                ])
            
            return ObservationStack(
                Observations=[Observation(**obs) for obs in observationAggregate]
            )
        

    @strawberry.field
    def allergys(
        self,
        info:Info,
        patient:str
        ) -> AllergyIntoleranceStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        allergyAggregate = AllCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])

        return AllergyIntoleranceStack(
                allergyIntolerances=[AllergyIntolerance(**obs) for obs in allergyAggregate]
            )


    @strawberry.field
    def medications(
        self, 
        info:Info,
        patient:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        ) -> MedicationStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        medicationAggregate = MedCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])

        return MedicationStack(
                medications=[Medication(**obs) for obs in medicationAggregate]
            )


    @strawberry.field
    def immunization(
        self,
        info:Info,
        patient:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        ) -> ImmunizationStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        immunizationAggregate = ImmCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])
        
        return ImmunizationStack(
                immunizations=[Immunization(**obs) for obs in immunizationAggregate]
            )


    @strawberry.field
    def procedures(
        self, 
        info:Info,
        patient:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        ) -> ProcedureStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        procedureAggregate = ProCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])
        
        return ProcedureStack(
                Procedures=[Procedure(**obs) for obs in procedureAggregate]
            )


    @strawberry.field
    def procedures(
        self, 
        info:Info,
        patient:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        ) -> ProcedureStack:

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        procedureAggregate = ProCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])
        
        return ProcedureStack(
                Procedures=[Procedure(**obs) for obs in procedureAggregate]
            )

schema = strawberry.Schema(Query)

graphql_app = GraphQLRouter(schema)



app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

#app.add_middleware(Auth,Mq=MQ)
#app.add_middleware(Logging,Mq=MQ)


"""@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/","record"))"""


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