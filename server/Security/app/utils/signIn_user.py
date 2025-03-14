from typing import Literal
import uuid
import bson
from fastapi.responses import JSONResponse
from pymongo.collection import Collection
from argon2 import PasswordHasher
from pymongo import errors

hasher = PasswordHasher()




def _sign_in_user(credentials,Collection:Collection,query:dict)->JSONResponse:
    try:
        c_user_exists = Collection.find_one(query) 
        print(c_user_exists)
        print(c_user_exists is not None)
        if c_user_exists:
            return JSONResponse(status_code=409, content={"details":"user already exists"})
        
        credentials["UserID"] = bson.Binary.from_uuid(uuid.uuid5(uuid.NAMESPACE_DNS,credentials.get("Email")))
        credentials["prevLogin"]={}
        credentials["Password"] = hasher.hash(credentials.get("Password")) 

        Collection.insert_one(credentials)
        
        return JSONResponse(status_code=201, content={"details":"user created successfuly"})
    
    except errors.OperationFailure:
        return JSONResponse(status_code=500, content={"details":"internal server error"})


