import asyncio
import random
from pymongo import errors, MongoClient
import uuid
import uvicorn
from fastapi import FastAPI,Depends
from starlette.requests import Request
from fastapi.responses import JSONResponse
from .models.user import *
from argon2 import PasswordHasher
import bson
import hmac
from app.utils.reset_pw import _password_reset
from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ
from app.utils.authenticate_user import authenticate
from app.utils.redis import redis_AX
from app.consumer_proceses_callback.authenticate_session import authenticate_session
from app.utils.gen_tokens import generateTokens
from app.utils.get_profile import _get_profile
from app.utils.delete_profile import _delete_profile


with open('./app/data/keys/refresh_private.pem', 'r') as file:
        refresh_private_key = file.read()

URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

app = FastAPI()
hasher = PasswordHasher()

MQ = sendMQ("localhost","security")
REDIS = redis_AX("redis://localhost:6379",10).connect()

DBClient = MongoClient(URL)
Database = DBClient.get_database("users_db")
PatientsCollection = Database.get_collection("patients")
DoctorsCollection = Database.get_collection("doctors")
HospitalCollection = Database.get_collection("hospital")

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

@app.post("/axion/auth/signup/user")
def user_signup(cred:User):
    try:
        dictifiedUser = dict(cred)

        dictifiedUser["UserID"] = bson.Binary.from_uuid(uuid.uuid5(uuid.NAMESPACE_DNS,dictifiedUser["Email"]))

        NICExists = PatientsCollection.find_one({"NIC":dictifiedUser["NIC"]}) is not None
        emailExists = PatientsCollection.find_one({"Email":dictifiedUser["Email"]}) is not None
        phoneNumberExists = PatientsCollection.find_one({"Telephone":dictifiedUser["Telephone"]}) is not None

        if NICExists or emailExists or phoneNumberExists:
            print("user already exists")
            return JSONResponse(status_code=409, content={"details":"user already exists"})
        
        dictifiedUser["Password"] = hasher.hash(dictifiedUser["Password"]) 
        PatientsCollection.insert_one(dictifiedUser)
        return JSONResponse(status_code=201, content={"details":"user created successfuly"})
    
    except errors.OperationFailure:
        return JSONResponse(status_code=500, content={"details":"internal server error"})

@app.post("/axion/auth/signup/user")
def doctor_signup():
    pass

def staff_signup():
    pass


@app.post("/axion/auth/login/patient")
def user_login(cred:Userlg):
    return authenticate(collection=PatientsCollection,cred=cred,endpoint="patient",Red=REDIS)
    
@app.post("/axion/auth/login/doc")
def doctor_login(cred:Userlg):
    return authenticate(collection=DoctorsCollection,cred=cred,endpoint="doctor")

@app.post("/axion/auth/login/staff")
def staff_login(cred:Userlg):
    return authenticate(collection=HospitalCollection,cred=cred,endpoint="hospital")
    
@app.post("/axion/auth/refresh")
def refresh(cred:Token):

    refresh_token = cred.Token
    print(refresh_token)
    response = authenticate_session(refresh_token,refresh_token=True,Red=REDIS).get("uuid")
    new_session = generateTokens(type="session",endpoint="patient",payload=response,key=refresh_private_key,exp=60)
    return JSONResponse(status_code=200, content={"token":new_session})
    

@app.post("/axion/auth/logout")
def logout(request:Request):
    token = request.headers.get('authorization')
    print(token)
    response = authenticate_session(token,Red=REDIS)["uuid"]
    print(response)
    REDIS.set_token(token = token,key = response,ttl=60,token_type="session")
    REDIS.delete_token(key = response,token_type="refresh")
    return JSONResponse(status_code=200, content={"msg":"logout sucessful"})



@app.post("/axion/auth/reset-password")
def reset_password(request:Request,cred:Password):

    new_pw = cred.New
    old_pw = cred.Old
    print(new_pw)
    print(old_pw)
    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=REDIS)
    c_uuid,role = session.get("uuid"),session.get("role")
    if new_pw == old_pw:
        return JSONResponse(status_code=406,content={"msg":"Old password cannot be the same as new password"})

    if role == "patient":
        return _password_reset(collection=PatientsCollection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw)
    
    if role == "doctor":
        return _password_reset(collection=DoctorsCollection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw,)

    if role == "hospital":
        return _password_reset(collection=HospitalCollection,c_uuid=uuid.UUID(c_uuid),old_pw=old_pw,new_pw=new_pw)
    



@app.get("/axion/user/profile")
def get_profile(request:Request):
    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=REDIS)
    c_uuid,role = session.get("uuid"),session.get("role")

    if role == "patient":
        return _get_profile(collection=PatientsCollection,c_uuid=uuid.UUID(c_uuid),)
    
    if role == "doctor":
        return _get_profile(collection=DoctorsCollection,c_uuid=uuid.UUID(c_uuid),)

    if role == "hospital":
        return _get_profile(collection=HospitalCollection,c_uuid=uuid.UUID(c_uuid),)
    

@app.post("/axion/user/profile/delete")
def delete_profile(request:Request,cred:Delete):

    password = cred.Password
    nic = cred.NIC

    token = token = request.headers.get('authorization')
    session = authenticate_session(token,Red=REDIS)
    c_uuid,role = session.get("uuid"),session.get("role")

    if role == "patient":
        return _delete_profile(collection=PatientsCollection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)
    
    if role == "doctor":
        return _delete_profile(collection=DoctorsCollection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)

    if role == "hospital":
        return _delete_profile(collection=HospitalCollection,c_uuid=uuid.UUID(c_uuid),nic=nic,pw=password)

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
    REDIS.set_item(name=name,payload=payload,ttl=2)
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
    session = authenticate_session(token,Red=REDIS)
    c_uuid,role = session.get("uuid"),session.get("role")

    name = f"otp::{role}::{c_uuid}"
    otp_payload = REDIS.get_item(name=name)

    if otp_payload is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})

    otp = otp_payload.get("otp")

    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})

    return JSONResponse(status_code=200,content={"msg":"otp verified"})




@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/",'security'))

if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8000,reload=True)