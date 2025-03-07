from uuid import UUID
from argon2 import PasswordHasher
import bson
from fastapi.responses import JSONResponse
from argon2.exceptions import VerificationError
from pymongo.collection import Collection

hasher = PasswordHasher()

def _password_reset(collection:Collection,c_uuid:UUID,old_pw:str,new_pw:str):
    currunt = collection.aggregate([
            {"$match": {"UserID":bson.Binary.from_uuid(c_uuid)}},
            {"$project": {"_id":0,"Password":1}} 
        ])
    hash = next(currunt,None).get("Password")
    try:    
        valid = hasher.verify(password=old_pw,hash=hash)
    except VerificationError:
        return JSONResponse(status_code=406,content={"msg":"Old password is invalid"})
    if not valid:
        return JSONResponse(status_code=406,content={"msg":"Old password is invalid"})
    
    hashed_pw = hasher.hash(new_pw)
    collection.update_one(
        { "UserID": bson.Binary.from_uuid(c_uuid)}, 
        { "$set": { "Password": hashed_pw} }
    )
    return JSONResponse(status_code=202,content={"msg":"password successfuly updated"})