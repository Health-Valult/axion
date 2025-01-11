from pydantic import BaseModel
from pydantic import EmailStr
import datetime

class User(BaseModel):
    NIC:str
    FirstName:str
    LastName:str
    Email:EmailStr
    Telephone:int
    DateOfBirth:int 