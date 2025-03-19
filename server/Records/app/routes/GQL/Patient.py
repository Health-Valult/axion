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
    async def observations(info:Info,LabTest:str) -> ObservationStack:
        
        request:Request = info.context.get("request")
        patient = request.state.meta.get("uuid")
        collection:Collection = request.app.state.ObservationCollection

      
        result={
            "_id":0,
            "patientID": 1,
            "code": 1,
            "display": 1,
            "dosage": 1,
            "route": 1,
            "prescriber": 1,
            "meta": 1
        }

        query = {
            "patient": patient,
        }

        Aggregate:Cursor = collection.find_one(query,result)
        
        observationQueryResult = Observation(**Aggregate)
        
        return observationQueryResult
        

    @strawberry.field
    async def observationStack(info:Info,code:str,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET)-> ObservationStack:
        
        request:Request = info.context.get("request")
        patient = request.state.meta.get("uuid")
        collection:Collection = request.app.state.ObservationCollection

        result={
            "_id":0,
            "patientID": 1,
            "code": 1,
            "display": 1,
            "dosage": 1,
            "route": 1,
            "prescriber": 1,
            "meta": 1
        }

        query = {
            "patient": patient,
            "code":code
        }

        Aggregate:Cursor = collection.find(query,result)
       
        return ObservationStack(
            Observations=[Observation(**obs) for obs in Aggregate]
        )
       

    @strawberry.field
    async def allergys(info:Info) -> AllergyIntoleranceStack:
        
        request:Request = info.context.get("request")
        patient = request.state.meta.get("uuid")
        collection:Collection = request.app.state.AllergiesCollection

        result={
            "_id":0,
            "patientID": 1,
            "code": 1,
            "display": 1,
            "timestamp":1,
            "criticality":1,
            "severity":1,
            "category":1,
            "active":1,
            "source":1,
            "verificationStatus":1,
            "meta": 1
        }

        query = {
            "patient": patient,
 
        }

        Aggregate:Cursor = collection.find(query,result)
        
        return AllergyIntoleranceStack(
                allergyIntolerances=[AllergyIntolerance(**obs) for obs in Aggregate]
            )
            
       

    @strawberry.field
    async def medications(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> MedicationStack:
        
            request:Request = info.context.get("request")
            patient = request.state.meta.get("uuid")
            collection:Collection = request.app.state.MedicationsCollection
            
            query = {"patientID": patient}

            result={
                "_id":0,
                "patientID": 1,
                "code": 1,
                "display": 1,
                "dosage": 1,
                "route": 1,
                "prescriber": 1,
                "meta": 1
            }

            Aggregate:Cursor = collection.find(query,result)
            return MedicationStack(medications=[Medication(**obs) for obs in Aggregate])


    @strawberry.field
    async def immunization(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> ImmunizationStack:
        
            request:Request = info.context.get("request")
            patient = request.state.meta.get("uuid")

            collection:Collection = request.app.state.ImmunizationsCollection

            
            query = {"patientID": patient}

            result={
                "_id":0,
                "patientID": 1,
                "code": 1,
                "display": 1,
                "status": 1,
                "dosage": 1,
                "unit": 1,
                "site": 1,
                "timestamp": 1,
                "manufacturer":1,
                "meta": 1
            }

            Aggregate:Cursor = collection.find(query,result)
       
            return ImmunizationStack(immunizations=[Immunization(**obs) for obs in Aggregate])
    
    @strawberry.field
    async def Labs(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> LabStack:
        
            request:Request = info.context.get("request")
            patient = request.state.meta.get("uuid")
 
            collection:Collection = request.app.state.LabsCollection
            query = {"patientID": patient}

            result={
                "_id":0,
                "id":1,
                "patientID": 1,
                "code": 1,
                "display": 1,
                "timestamp":1,
                "meta": 1
            }

            Aggregate:Cursor = collection.find(query,result)
           
            return LabStack(Procedures=[Lab(**obs) for obs in Aggregate])


    @strawberry.field
    async def procedures(info:Info,start:Optional[str] = strawberry.UNSET,end:Optional[str] = strawberry.UNSET) -> ProcedureStack:
        
            request:Request = info.context.get("request")
            patient = request.state.meta.get("uuid")
            collection:Collection = request.app.state.ProceduresCollection
            print(query)
            query = {"patientID": patient}

            result={
                "_id":0,
                "encounterID":1,
                "patientID": 1,
                "code": 1,
                "display": 1,
                "date": 1,
                "meta": 1
            }

            Aggregate:Cursor = collection.find(query,result)
           
            return ProcedureStack(Procedures=[Procedure(**obs) for obs in Aggregate])