from typing import Optional
from strawberry import Info
import strawberry
from app.ax_types.observation import *
from app.ax_types.allergyIntolerance import *
from app.ax_types.medications import *
from app.ax_types.immunization import *
from app.ax_types.procedure import *

from starlette.requests import Request
@strawberry.type
class Query:

    @strawberry.field
    async def observations(
            self,info:Info,patient:str,code:str,encounter:str
        ) -> Observation:
        
        request = info.context["request"]
        query={ selection.name:1 for selection in info.selected_fields[0].selections}
        observationAggregate = request.app.state.ObservationCollection.aggregate([
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
    async def observationStack(self,
        info:Info,patient:str,code:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        )-> ObservationStack:
        
        request:Request = info.context["request"]

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}

        observationAggregate = request.app.state.ObservationCollection.aggregate([
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
    async def allergys(
        self,info:Info,patient:str
        ) -> AllergyIntoleranceStack:
        
        request:Request = info.context["request"]
        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        allergyAggregate = request.app.state.AllergiesCollection.aggregate([
                    {"$match": {
                        "patient": patient,  
                        }},
                    {"$project": query|{"_id":0}} 
                ])
        
        return AllergyIntoleranceStack(
                allergyIntolerances=[AllergyIntolerance(**obs) for obs in allergyAggregate]
            )
            
       

    @strawberry.field
    async def medications(
        self, info:Info,patient:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> MedicationStack:
        
            request:Request = info.context["request"]
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            print(query)
            medicationAggregate = request.app.state.MedicationsCollection.aggregate([
                        {"$match": {
                            "patient": patient,  
                            }},
                        {"$project": query|{"_id":0}} 
                    ])
           
            return MedicationStack(
                    medications=[Medication(**obs) for obs in medicationAggregate]
                )


    @strawberry.field
    async def immunization(
        self,info:Info,patient:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> ImmunizationStack:
        
            request:Request = info.context["request"]
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            print(query)
            immunizationAggregate = request.app.state.ImmunizationsCollection.aggregate([
                        {"$match": {
                            "patient": patient,  
                            }},
                        {"$project": query|{"_id":0}} 
                    ])
       
            return ImmunizationStack(
                    immunizations=[Immunization(**obs) for obs in immunizationAggregate]
                )
      

    @strawberry.field
    async def procedures(
        self, info:Info,patient:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> ProcedureStack:
        
            request:Request = info.context["request"]
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            print(query)
            procedureAggregate = request.app.state.ProceduresCollection.aggregate([
                        {"$match": {
                            "patient": patient,  
                            }},
                        {"$project": query|{"_id":0}} 
                    ])
           
            return ProcedureStack(
                    Procedures=[Procedure(**obs) for obs in procedureAggregate]
                )