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
from app.routes.GQL.results import *
from pymongo.cursor import Cursor
from pymongo.collection import Collection

from app.shared.utils.Cache.redis import redis_AX

def get_patient(uuid:str,CACHE:redis_AX):
    name = f"verified::doc::{uuid}"
    patient = CACHE.get_item(name=name)
    if not patient:
        raise Exception("patient not found")
    return patient.get("patient")

@strawberry.type
class Query:

    @strawberry.field
    async def Labs(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> LabStack:

            request:Request = info.context.get("request")
            Doctor = request.state.meta.get("uuid")
            
            cache:redis_AX = request.app.state.Cache
            patient = get_patient(uuid=Doctor,CACHE=cache)

            collection:Collection = request.app.state.LabsCollection
            query = {"patientID": patient}
            Aggregate:Cursor = collection.find(query,labsResult)
            return LabStack(labs=[Lab(**obs) for obs in Aggregate])
    
    @strawberry.field
    async def observation(info:Info,code:str,LabID:str) -> ObservationStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.ObservationCollection
        query = {"patientID": patient,"LabID":LabID,"code":code}
        Aggregate:Cursor = collection.find_one(query,observationsResult)   
        observationQueryResult = Observation(**Aggregate)  
        return observationQueryResult

    @strawberry.field
    async def observationStack(info:Info,LabID:str) -> ObservationStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.ObservationCollection
        query = {"patientID": patient,"labID":LabID}
        Aggregate:Cursor = collection.find(query,observationsResult)   

        return ObservationStack(Observations=[Observation(**obs) for obs in Aggregate])
        

    @strawberry.field
    async def observationGraph(info:Info,code:str, start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET)-> ObservationStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.ObservationCollection
        query = {"patientID": patient,"code":code}
        Aggregate:Cursor = collection.find(query,observationsResult)
        return ObservationStack(Observations=[Observation(**obs) for obs in Aggregate])
       

    @strawberry.field
    async def allergys(info:Info) -> AllergyIntoleranceStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.AllergiesCollection
        query = {"patientID": patient}
        Aggregate:Cursor = collection.find(query,allergysResult)
        return AllergyIntoleranceStack(allergyIntolerances=[AllergyIntolerance(**obs) for obs in Aggregate])
            
       
    @strawberry.field
    async def medications(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> MedicationStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.MedicationsCollection
        query = {"patientID": patient}
        Aggregate:Cursor = collection.find(query,medicationsResult)
        return MedicationStack(medications=[Medication(**obs) for obs in Aggregate])


    @strawberry.field
    async def immunization(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> ImmunizationStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.ImmunizationsCollection
        query = {"patientID": patient}        
        Aggregate:Cursor = collection.find(query,immunizationResult)            
        return ImmunizationStack(immunizations=[Immunization(**obs) for obs in Aggregate])
    

    @strawberry.field
    async def procedures(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> ProcedureStack:
        
        request:Request = info.context.get("request")
        Doctor = request.state.meta.get("uuid")

        cache:redis_AX = request.app.state.Cache
        patient = get_patient(uuid=Doctor,CACHE=cache)
 
        collection:Collection = request.app.state.ProceduresCollection
        query = {"patientID": patient}
        Aggregate:Cursor = collection.find(query,proceduresResult)
        return ProcedureStack(Procedures=[Procedure(**obs) for obs in Aggregate])