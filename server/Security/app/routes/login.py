from fastapi import APIRouter, Depends
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.models.models import *
from starlette.requests import Request
from pymongo.collection import Collection
from app.utils.authenticate_user import authenticate
from app.callback.authenticate_session import authenticate_session
from app.utils.gen_tokens import generateTokens
from app.shared.middleware.authentication import Authenticate

route = APIRouter()

@route.post("/axion/auth/login/patient",tags=["auth"])
def user_login(request:Request,cred:Userlg):
    state:FastAPI = request.app.state
    collection:Collection = state.PatientsCollection
    cache = state.Cache
    return authenticate(collection=collection,cred=cred,endpoint="patient",Red=cache,state=state)
    

@route.post("/axion/auth/login/doctor",tags=["auth"])
def doctor_login(request:Request,cred:Userlg):
    state:FastAPI = request.app
    collection:Collection = state.state.DoctorsCollection
    cache = state.state.Cache
    return authenticate(collection=collection,cred=cred,endpoint="doctor",Red=cache,state=state)


@route.post("/axion/auth/login/staff",tags=["auth"])
def staff_login(request:Request,cred:Userlg):
    state:FastAPI = request.app
    collection:Collection = state.state.HospitalCollection
    cache = state.state.Cache
    return authenticate(collection=collection,cred=cred,endpoint="hospital",state=state)



@route.post("/axion/auth/refresh",tags=["secure"])
def refresh(request:Request,cred:Token):
    state:FastAPI = request.app
    cache = state.state.Cache
    refresh_token = cred.Token
    response = authenticate_session(refresh_token,refresh_token=True,Red=cache).get("uuid")
    new_session = generateTokens(type="session",endpoint="patient",payload=response,key=state.refresh_private_key,exp=60)
    return JSONResponse(status_code=200, content={"token":new_session})
    

@route.post("/axion/auth/logout",tags=["secure"],dependencies=[Depends(Authenticate)])
def logout(request:Request):
    state:FastAPI = request.app
    cache = state.state.Cache
    token = request.headers.get('authorization')
    response = authenticate_session(token,Red=cache)["uuid"]
    cache.set_token(token = token,key = response,ttl=60,token_type="session")
    cache.delete_token(key = response,token_type="refresh")
    return JSONResponse(status_code=200, content={"msg":"logout sucessful"})