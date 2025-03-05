import asyncio
from pymongo import errors, MongoClient
import uuid
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .models.user import *
from argon2 import PasswordHasher
import bson
from app.utils.reciever import recieveMQ
from app.utils.sender import sendMQ
from app.utils.authenticate_user import authenticate
from redis import Redis


RedisServe = Redis(host="localhost",port=6379)
URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"



app = FastAPI()
hasher = PasswordHasher()
MQ = sendMQ("localhost","security")
DBClient = MongoClient(URL)
Database = DBClient.get_database("users_db")
PatientsCollection = Database.get_collection("patients")
DoctorsCollection = Database.get_collection("doctors")
HospitalCollection = Database.get_collection("hospital")


@app.post("/axion/auth/signup/user")
def user_signup(cred:User):
    try:
        dictifiedUser = dict(cred)

        dictifiedUser["UserID"] = bson.Binary.from_uuid(uuid.uuid5(uuid.NAMESPACE_DNS,dictifiedUser["FirstName"]))

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
        print("error")


@app.post("/axion/auth/login/patient")
def user_login(cred:Userlg):
    return authenticate(collection=PatientsCollection,cred=cred,endpoint="patient")
    
@app.post("/axion/auth/login/doc")
def doctor_login(cred:Userlg):
    return authenticate(collection=DoctorsCollection,cred=cred,endpoint="doctor")

@app.post("/axion/auth/login/staff")
def staff_login(cred:Userlg):
    return authenticate(collection=HospitalCollection,cred=cred,endpoint="hospital")
    
@app.post("/axion/auth/refresh")
def refresh(cred:Refresh):
    pass

@app.post("/axion/auth/logout")
def logout():
    pass

@app.post("/axion/auth/reset-password")
def reset_password():
    pass

@app.post("/axion/user/profile")
def get_profile():
    pass


@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/",'security'))

if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8000,reload=True)