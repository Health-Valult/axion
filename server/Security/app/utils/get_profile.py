from typing import Literal
from uuid import UUID
import bson
from fastapi.responses import JSONResponse
from pymongo.collection import Collection


endpoints = {"doctors" : {
    "_id":0,
    "FullName":1,
    "NIC":1,
    "Email":1,
    "Telephone":1,
    "Address":1,
    "Specialization":1,
    "Affiliation":1,
    "OfficeHours":1,
    "Experience":1,
    "Qualifications":1
},

"patient":{
    "_id":0,
    "NIC":1,
    "FirstName":1,
    "LastName":1,
    "Email":1,
    "Telephone":1,
    "DateOfBirth":1
}}

def _get_profile(collection:Collection,c_uuid:UUID,endpoint:Literal["patient","doctor","hospital"]):
    currunt = collection.find_one({"UserID":c_uuid}, endpoints.get(endpoint))
    data = next(currunt,None)
    return JSONResponse(status_code=200, content=data)

