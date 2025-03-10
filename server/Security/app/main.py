import asyncio
import random
from pymongo import errors, MongoClient
import uuid
import uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from fastapi.responses import JSONResponse
from .models.user import *
from argon2 import PasswordHasher
import hmac
from app.utils.reset_pw import _password_reset
from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ
from app.utils.redis import redis_AX
from app.consumer_proceses_callback.authenticate_session import authenticate_session
from app.utils.gen_tokens import generateTokens
from app.utils.get_profile import _get_profile
from app.utils.delete_profile import _delete_profile
from app.routes.signUp import route as s_route
from app.routes.login import route as l_route
from app.routes.user import route as u_route

with open('./app/data/keys/refresh_private.pem', 'r') as file:
        refresh_private_key = file.read()

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

app = FastAPI()

hasher = PasswordHasher()

MQ = sendMQ("localhost","security")

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

@app.post("/axion/auth/refresh")
def refresh(cred:Token):

    refresh_token = cred.Token
    print(refresh_token)
    response = authenticate_session(refresh_token,refresh_token=True,Red=app.state.Cache).get("uuid")
    new_session = generateTokens(type="session",endpoint="patient",payload=response,key=refresh_private_key,exp=60)
    return JSONResponse(status_code=200, content={"token":new_session})
    

@app.post("/axion/auth/logout")
def logout(request:Request):
    token = request.headers.get('authorization')
    print(token)
    response = authenticate_session(token,Red=app.state.Cache)["uuid"]
    print(response)
    app.state.Cache.set_token(token = token,key = response,ttl=60,token_type="session")
    app.state.Cache.delete_token(key = response,token_type="refresh")
    return JSONResponse(status_code=200, content={"msg":"logout sucessful"})




@app.post("/axion/auth/send/otp")
def send_otp(request:Request,cred:SendOtp):
    type = cred.type
    data = cred.data
    
    c_uuid,role = 35726845687,"patient"
    name = f"otp::{role}::{c_uuid}"
    otp = generate_otp()
    payload = {
        "uuid":c_uuid,
        "type":type,
        "role":role,
        "otp":otp
    }
    app.state.Cache.set_item(name=name,payload=payload,ttl=2)
    body = {
        "email":data,
        "subject":"Axion Verification OTP",
        "body":f"your otp is {otp}"
    }
    response = MQ.send_and_await("notification","send-email",body=body)
    print(response)
    return JSONResponse(status_code=200,content={"msg":"otp sent"})

@app.post("/axion/auth/verify/otp")
def verify_otp(request:Request,cred:OTP):
    c_otp = cred.otp

    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=app.state.Cache)
    c_uuid,role = session.get("uuid"),session.get("role")

    name = f"otp::{role}::{c_uuid}"
    otp_payload = app.state.Cache.get_item(name=name)

    if otp_payload is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})

    otp = otp_payload.get("otp")

    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})

    return JSONResponse(status_code=200,content={"msg":"otp verified"})


app.include_router(s_route)
app.include_router(l_route)
app.include_router(u_route)

@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/",'security'))

@app.on_event("startup")
async def load_db():
    DBClient = MongoClient(URL)
    Database = DBClient.get_database("users_db")
    app.state.PatientsCollection = Database.get_collection("patients")
    app.state.DoctorsCollection = Database.get_collection("doctors")
    app.state.HospitalCollection = Database.get_collection("hospital")

@app.on_event("startup")
async def load_cache():
    app.state.Cache = redis_AX("redis://localhost:6379",10).connect()

if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8000,reload=True)