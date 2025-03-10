from typing import Literal
import uuid
import bson
from fastapi.responses import JSONResponse
from pymongo.collection import Collection
from argon2 import PasswordHasher
from pymongo import errors

hasher = PasswordHasher()

patientQuery = {
    "$or":[{"NIC":""},{"Email":""},{"Telephone":""}]
}

docQuery = {
    "$or":[{"NIC":""},{"Email":""},{"Telephone":""},{"SlmcNumber":""}]
}

staffQuery = {
    "$or":[{"NIC":""},{"Email":""},{"Telephone":""}]
}


def _sign_in_user(credentials,Collection:Collection,query:dict)->JSONResponse:
    try:
        c_user_exists = Collection.find_one(query) is not None
        

        if c_user_exists:
            print("user already exists")
            return JSONResponse(status_code=409, content={"details":"user already exists"})
        credentials["UserID"] = bson.Binary.from_uuid(uuid.uuid5(uuid.NAMESPACE_DNS,credentials.get("Email")))
        credentials["Password"] = hasher.hash(credentials.get("Password")) 
        Collection.insert_one(credentials)
        return JSONResponse(status_code=201, content={"details":"user created successfuly"})
    
    except errors.OperationFailure:
        return JSONResponse(status_code=500, content={"details":"internal server error"})
