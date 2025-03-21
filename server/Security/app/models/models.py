from typing_extensions import Annotated
from pydantic import AfterValidator, BaseModel,EmailStr,Field, constr
import re
from pydantic import BaseModel, EmailStr,IPvAnyAddress,UUID4, confloat
from typing import List, Optional

def PasswordValidator(value:str):
    match = re.match(r'^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d.*\d)(?=.*[@_&#]).+$',value)
    if not match:
       raise ValueError(f'{value} is not a valid password')
    return value



class Location(BaseModel):
    Latitude:confloat(strict=True,ge=-90,le=90) # type: ignore
    Longitude:confloat(strict=True,ge=-180,le=180) # type: ignore

class User(BaseModel):
    NIC:str
    FirstName:str
    LastName:str
    Email:EmailStr
    Telephone:constr(regex=r'^\d{10}$') # type: ignore
    DateOfBirth:int 
    Password:Annotated[str,AfterValidator(PasswordValidator)]
    

class Userlg(BaseModel):
    Email:EmailStr
    Password:Annotated[str,AfterValidator(PasswordValidator)]
    Location:Location
    IpAddress:IPvAnyAddress
    AndroidId:str

class Token(BaseModel):
    Token:str

class Password(BaseModel):
    Old:Annotated[str,AfterValidator(PasswordValidator)]
    New:Annotated[str,AfterValidator(PasswordValidator)]

class Delete(BaseModel):
    Email:str
    Password:Annotated[str,AfterValidator(PasswordValidator)]

class OTP(BaseModel):
    tempID:UUID4
    otp:str

class SendOtp(BaseModel):
    tempID:UUID4
    type:str
    data:EmailStr

class Qualification(BaseModel):
    degree: str
    institution: str
    year: int

class Doctor(BaseModel):
    FullName: str
    NIC: str
    Email: EmailStr
    Telephone: constr(regex=r'^\d{10}$') # type: ignore
    Address: str
    Specialization: str
    Affiliation: str
    OfficeHours: str
    SlmcNumber: str
    Experience: int
    Qualifications: Optional[List[Qualification]] = []
    Password: Annotated[str,AfterValidator(PasswordValidator)]


class HospitalStaff(BaseModel):
    FullName: str
    NIC: str
    Gender: str
    DateOfBirth: str
    ContactNumber: constr(regex=r'^\d{10}$') # type: ignore
    Email: EmailStr
    Department: str
    MedicalRegistrationNumber: str
    Experience: int
    Hospital: str
    Address: str
    City: str
    PostalCode: str
    PhoneNumber: constr(regex=r'^\d{10}$') # type: ignore
    WorkLocation: str
    ShiftType: str
    Password:Annotated[str,AfterValidator(PasswordValidator)]








