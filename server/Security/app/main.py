from typing import Union
import pymongo.errors
import uvicorn
from fastapi import FastAPI
from .models.user import User
from jose import jwt
import pymongo
from argon2 import PasswordHasher

URL = "mongodb://localhost:27017"

app = FastAPI()
hasher = PasswordHasher()
DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("User")

ClientCollection = Database.get_collection("Clients")

@app.post("/axion/auth/signup")
def signup(user:User):
    try:
        dictifiedUser = dict(user)
        NICExists = ClientCollection.find_one({"NIC":dictifiedUser["NIC"]}) is not None
        emailExists = ClientCollection.find_one({"Email":dictifiedUser["Email"]}) is not None
        phoneNumberExists = ClientCollection.find_one({"Telephone":dictifiedUser["Telephone"]}) is not None
        if NICExists or emailExists or phoneNumberExists:
            print("user already exists")
            return
        
        dictifiedUser["Password"] = hasher.hash(dictifiedUser["Password"]) 
        ClientCollection.insert_one(dictifiedUser)
    except pymongo.errors.OperationFailure:
        print("error")
def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()