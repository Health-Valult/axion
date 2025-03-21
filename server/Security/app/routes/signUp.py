from fastapi import APIRouter
from fastapi import FastAPI
from app.models.models import *
from app.utils.signIn_user import _sign_in_user
from starlette.requests import Request
from pymongo.collection import Collection

route = APIRouter()

@route.post("/axion/auth/signup/patient",tags=["signup"])
def user_signup(request:Request,credentials:User):

    state:FastAPI = request.app
    collection:Collection = state.state.PatientsCollection

    credentials:dict = credentials.model_dump()

    c_nic = credentials.get("NIC")
    c_email = credentials.get("Email")
    c_phone = credentials.get("Telephone")

    patientQuery = {
    "$or":[{"NIC":c_nic},{"Email":c_email},{"Telephone":c_phone}]
    }

    return _sign_in_user(credentials=credentials,Collection=collection,query=patientQuery)


@route.post("/axion/auth/signup/doctor",tags=["signup"])
def doctor_signup(request:Request,credentials:Doctor):
    
    state:FastAPI = request.app
    collection:Collection = state.state.DoctorsCollection

    credentials:dict = credentials.model_dump()

    c_nic = credentials.get("NIC")
    c_email = credentials.get("Email")
    c_phone = credentials.get("Telephone")
    c_slmc = credentials.get("SlmcNumber")

    docQuery = {
    "$or":[{"NIC":c_nic},{"Email":c_email},{"Telephone":c_phone},{"SlmcNumber":c_slmc}]
    }

    return _sign_in_user(credentials=credentials,Collection=collection,query=docQuery)


@route.post("/axion/auth/signup/hospital-staff",tags=["signup"])
def staff_signup(request:Request,credentials:HospitalStaff):

    state:FastAPI = request.app
    collection:Collection = state.state.HospitalCollection


    c_nic = credentials.NIC
    c_email = credentials.Email
    c_phone = credentials.ContactNumber
    c_mrn = credentials.MedicalRegistrationNumber
    credentials:dict = credentials.model_dump()
    staffQuery = {
    "$or":[{"NIC":c_nic},{"Email":c_email},{"ContactNumber":c_phone},{"MedicalRegistrationNumber":c_mrn},]
    }

    return _sign_in_user(credentials=credentials,Collection=collection,query=staffQuery)
