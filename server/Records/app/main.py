import pymongo
import uvicorn
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry

from strawberry import Info
from .ax_types.observation import *
from typing import Optional,List


URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("records_db")
Collection = Database.get_collection("observations")

observation_type = strawberry.union(name="obs_u", types=(Observation,ObservationStack))

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
        patientId:str,
        code:str,
        start:Optional[str] = strawberry.UNSET,
        end:Optional[str] = strawberry.UNSET
        )-> ObservationStack:
        query={ selection.name:1 for selection in info.selected_fields[0].selections}
        print(info.context["request"].headers["authorization"])
        return 
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




def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()

# Az cluster user - TestAxionAdmin
# Az cluster pw - YRmx2JtrK44FDLV


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