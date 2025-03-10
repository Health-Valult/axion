from fastapi import APIRouter
from fastapi import FastAPI
from app.models.user import *
from starlette.requests import Request
from pymongo.collection import Collection
from app.utils.authenticate_user import authenticate

route = APIRouter()

@route.post("/axion/auth/login/patient")
def user_login(request:Request,cred:Userlg):
    state:FastAPI = request.app
    collection:Collection = state.state.PatientsCollection
    cache = state.state.Cache

    return authenticate(collection=collection,cred=cred,endpoint="patient",Red=cache)
    

@route.post("/axion/auth/login/doc")
def doctor_login(request:Request,cred:Userlg):
    state:FastAPI = request.app
    collection:Collection = state.state.PatientsCollection
    cache = state.state.Cache
    return authenticate(collection=collection,cred=cred,endpoint="doctor")


@route.post("/axion/auth/login/staff")
def staff_login(request:Request,cred:Userlg):
    state:FastAPI = request.app
    collection:Collection = state.state.PatientsCollection
    cache = state.state.Cache
    return authenticate(collection=collection,cred=cred,endpoint="hospital")
    