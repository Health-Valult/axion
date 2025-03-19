from typing import Optional
from strawberry import Info
import strawberry
from app.ax_types.observation import *
from app.ax_types.allergyIntolerance import *
from app.ax_types.medications import *
from app.ax_types.immunization import *
from app.ax_types.procedure import *
from app.ax_types.Labs import *

from starlette.requests import Request

from pymongo.cursor import Cursor
from pymongo.collection import Collection

@strawberry.type
class PatientQuery:

    @strawberry.field
    async def observations(
        info:Info,LabTest:str
        ) -> ObservationStack:
        
        request = info.context["request"]
        patient = request.state.meta.get("uuid")
        query = { selection.name:1 for selection in info.selected_fields[0].selections}
        collection:Collection = request.app.state.ObservationCollection

        Aggregate:Cursor = collection.find(
            {"patient": patient,"encounter":LabTest},
            query|{"_id":0}
        )
        
        observationAggregateResult = next(Aggregate,None)
        if observationAggregateResult is None:
            return None
        observationQueryResult = Observation(**observationAggregateResult)
        
        return observationQueryResult
        

    @strawberry.field
    async def observationStack(self,
        info:Info,code:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        )-> ObservationStack:
        
        request:Request = info.context["request"]
        patient = request.state.meta.get("uuid")
        collection:Collection = request.app.state.ObservationCollection

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}

        Aggregate:Cursor = collection.find(
            {"patient": patient,"code":code},
            query|{"_id":0}
        )
       
        return ObservationStack(
            Observations=[Observation(**obs) for obs in Aggregate]
        )
       

    @strawberry.field
    async def allergys(
        info:Info
        ) -> AllergyIntoleranceStack:
        
        request:Request = info.context["request"]
        patient = request.state.meta.get("uuid")
        collection:Collection = request.app.state.AllergiesCollection

        query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
        print(query)
        allergyAggregate:Cursor = collection.find(
                        {"patient": patient},
                        query|{"_id":0}
                    )
        
        return AllergyIntoleranceStack(
                allergyIntolerances=[AllergyIntolerance(**obs) for obs in allergyAggregate]
            )
            
       

    @strawberry.field
    async def medications(
        info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> MedicationStack:
        
            request:Request = info.context["request"]
            patient = request.state.meta.get("uuid")
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            collection:Collection = request.app.state.MedicationsCollection
            print(query)
            medicationAggregate:Cursor = collection.find(
                        {"patientID": patient},
                        query|{"_id":0}
                    )

            for i in medicationAggregate:
                  print(i)

            return MedicationStack(
                    medications=[Medication(**obs) for obs in medicationAggregate]
                )

    @strawberry.field
    async def immunization(
        info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> ImmunizationStack:
        
            request:Request = info.context["request"]
            patient:dict = request.state.meta.get("uuid")
            query:dict = { selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            collection:Collection = request.app.state.ImmunizationsCollection

            immunizationAggregate:Cursor = collection.find(
                        {"patient": patient},
                        query|{"_id":0}
                    )
       
            return ImmunizationStack(immunizations=[Immunization(**obs) for obs in immunizationAggregate])
    
    @strawberry.field
    async def Labs(
        info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> LabStack:
        
            request:Request = info.context["request"]
            patient = request.state.meta.get("uuid")
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            collection:Collection = request.app.state.LabsCollection
            labAggregate:Cursor = collection.find(
                        {"patient": patient},
                        query|{"_id":0}
                    )
           
            return LabStack(Procedures=[Lab(**obs) for obs in labAggregate])


    @strawberry.field
    async def procedures(
        info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET
        ) -> ProcedureStack:
        
            request:Request = info.context["request"]
            patient = request.state.meta.get("uuid")
            query={ selection.name:1 for selection in info.selected_fields[0].selections[0].selections}
            print(query)
            procedureAggregate:Cursor = request.app.state.ProceduresCollection.find(
                        {"patient": patient},
                        query|{"_id":0}
                    )
           
            return ProcedureStack(
                    Procedures=[Procedure(**obs) for obs in procedureAggregate]
                )