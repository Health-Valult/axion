from datetime import datetime
import pymongo.errors
import uuid
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .models.user import *
import pymongo
from argon2 import PasswordHasher
from authlib.jose import jwt
import bson

URL = "mongodb://localhost:27017"

with open('./data/keys/private.pem', 'r') as file:
        private_key = file.read()

with open('./data/keys/refresh_private.pem', 'r') as file:
        refresh_private_key = file.read()

app = FastAPI()
hasher = PasswordHasher()

DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("User")
ClientCollection = Database.get_collection("Clients")



@app.post("/axion/auth/signup/user")
def user_signup(user:User):
    try:
        dictifiedUser = dict(user)

        dictifiedUser["UserID"] = bson.Binary.from_uuid(uuid.uuid5(uuid.NAMESPACE_DNS,dictifiedUser["FirstName"]))

        NICExists = ClientCollection.find_one({"NIC":dictifiedUser["NIC"]}) is not None
        emailExists = ClientCollection.find_one({"Email":dictifiedUser["Email"]}) is not None
        phoneNumberExists = ClientCollection.find_one({"Telephone":dictifiedUser["Telephone"]}) is not None

        if NICExists or emailExists or phoneNumberExists:
            print("user already exists")
            return JSONResponse(status_code=409, content={"details":"user already exists"})
        
        dictifiedUser["Password"] = hasher.hash(dictifiedUser["Password"]) 
        ClientCollection.insert_one(dictifiedUser)
        return JSONResponse(status_code=201, content={"details":"user created successfuly"})
    
    except pymongo.errors.OperationFailure:
        print("error")




@app.post("/axion/auth/login/user")
def user_login(cred:Userlg):

    emailExists = ClientCollection.find_one({"Email":cred.Email})
    if emailExists is None:
        return JSONResponse(status_code=404, content={"details":"user does not exist"})
    
    hashed_password = emailExists["Password"]
    password_is_valid = hasher.verify(password=cred.Password,hash=hashed_password)

    if not password_is_valid:
        return JSONResponse(status_code=401, content={"details":"password is invalid"})
    
    header = {'alg': 'RS256'}
    session_payload = {
        'iss': 'axion::security::auth::login::client::session',
        'sub': str(uuid.UUID(bytes=emailExists["UserID"])),
        "iat": datetime.datetime.now(tz=datetime.timezone.utc),
        "nbf": datetime.datetime.now(tz=datetime.timezone.utc),
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=45)
        }
    
    refresh_payload = {
        'iss': 'axion::security::auth::login::client::session',
        'sub': str(uuid.UUID(bytes=emailExists["UserID"])),
        "iat": datetime.datetime.now(tz=datetime.timezone.utc),
        "nbf": datetime.datetime.now(tz=datetime.timezone.utc),
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(minutes=45)
        }
    
    session_token = jwt.encode(header, session_payload, private_key)
    refresh_token = jwt.encode(header, refresh_payload, refresh_private_key)
    return JSONResponse(status_code=200, content={"session_token":session_token.decode("utf-8"), "refresh_token":refresh_token.decode("utf-8")})
    
@app.post("/axion/auth/login/doc")
def doctor_login(cred:Userlg):
    pi = cred.Email
    
@app.post("/axion/auth/login/stf")
def staff_login(cred:Userlg):
    pi = cred.Email
    
@app.post("/axion/auth/refresh")
def refresh():
    pass

def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()