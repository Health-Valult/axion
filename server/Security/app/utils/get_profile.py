from uuid import UUID
import bson
from fastapi.responses import JSONResponse
from pymongo.collection import Collection

def _get_profile(collection:Collection,c_uuid:UUID,):
    currunt = collection.aggregate([
            {"$match": {"UserID":bson.Binary.from_uuid(c_uuid)}},
            {"$project": {
                "_id":0,
                ""
                "FirstName":1,
                "LastName":1,
                "Email":1,
                "Telephone":1,
                "DateOfBirth":1
            }} 
        ])
    data = next(currunt,None)
    return JSONResponse(status_code=200, content=data)

