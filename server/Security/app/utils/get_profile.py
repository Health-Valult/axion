from typing import Literal
from uuid import UUID
import bson
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pymongo.collection import Collection


endpoints = {
"doctor" : {
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
},

"hospital": {
    "_id": 0,
    "FullName": 1,
    "DateOfBirth": 1,
    "Gender": 1,
    "NIC": 1,
    "ContactNumber": 1,
    "Email": 1,
    "Address": 1,
    "City": 1,
    "PostalCode": 1,
    "HospitalName": 1,
    "PhoneNumber": 1,
    "WorkLocation": 1,
    "Department": 1,
    "MedicalRegistrationNumber": 1,
    "YearsOfExperience": 1,
    "ShiftType": 1
}
}
"""xmH27@74LXuF@LQ"""


def _get_profile(collection:Collection,c_uuid:UUID,endpoint:Literal["patient","doctor","hospital"]):
    currunt = collection.find_one({"UserID":c_uuid}, endpoints.get(endpoint))
    encoded = jsonable_encoder(currunt)
    return JSONResponse(status_code=200, content=encoded)

