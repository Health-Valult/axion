import hmac
from uuid import UUID
from argon2 import PasswordHasher
import bson
from fastapi.responses import JSONResponse
from argon2.exceptions import VerificationError
from pymongo.collection import Collection


hasher = PasswordHasher()

def _delete_profile(collection:Collection,c_uuid:str,email:str,pw:str):
    currunt = collection.aggregate([
            {"$match": {"UserID":c_uuid}},
            {"$project": {"_id":0,"Password":1,"Email":1}} 
        ])
    data = next(currunt,None)
    hash,email_db = data.get("Password"),data.get("NIC")
    try:    
        pw_valid = hasher.verify(password=pw,hash=hash)
        email_valid = hmac.compare_digest(email_db,email)
    except VerificationError:
        return JSONResponse(status_code=406,content={"msg":"password is invalid"})
    if not pw_valid:
        return JSONResponse(status_code=406,content={"msg":"password is invalid"})
    if not email_valid:
        return JSONResponse(status_code=406,content={"msg":"NIC is invalid"})
    
    collection.delete_one({
        "UserID":c_uuid
    })

    return JSONResponse(status_code=418 ,content={"msg":"account deleted succesfully"})