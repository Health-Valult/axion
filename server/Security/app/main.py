from typing import Union
import uvicorn
from fastapi import FastAPI
from .models.user import User
from jose import jwt
import pymongo
from argon2 import PasswordHasher

URL = "mongodb://localhost:27017"

app = FastAPI()
DBClient = pymongo.MongoClient(URL)
Database = DBClient.get_database("User")
ClientCollection = Database.get_collection("Clients")

@app.post("/axion/auth/signup")
def signup(user:User):
    jsonifiedUser = user.model_dump_json()
    ClientCollection.insert_one(jsonifiedUser)

def main():
    print("running security services")
    uvicorn.run("app.main:app",port=8000,reload=True)

if __name__ == '__main__':
    main()