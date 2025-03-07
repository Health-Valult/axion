import hmac
from uuid import UUID
from argon2 import PasswordHasher
import bson
from fastapi.responses import JSONResponse
from argon2.exceptions import VerificationError
from pymongo.collection import Collection


hasher = PasswordHasher()

def _delete_profile(collection:Collection,c_uuid:UUID,nic:str,pw:str):
    currunt = collection.aggregate([
            {"$match": {"UserID":bson.Binary.from_uuid(c_uuid)}},
            {"$project": {"_id":0,"Password":1,"NIC":1}} 
        ])
    data = next(currunt,None)
    hash,nic_db = data.get("Password"),data.get("NIC")
    try:    
        pw_valid = hasher.verify(password=pw,hash=hash)
        nic_valid = hmac.compare_digest(nic_db,nic)
    except VerificationError:
        return JSONResponse(status_code=406,content={"msg":"password is invalid"})
    if not pw_valid:
        return JSONResponse(status_code=406,content={"msg":"password is invalid"})
    if not nic_valid:
        return JSONResponse(status_code=406,content={"msg":"NIC is invalid"})
    
    collection.delete_one({
        "UserID":bson.Binary.from_uuid(c_uuid)
    })

    return JSONResponse(status_code=418 ,content={"msg":"account deleted succesfully"})