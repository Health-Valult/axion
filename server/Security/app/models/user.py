from typing_extensions import Annotated
from pydantic import AfterValidator, BaseModel,EmailStr,Field, model_validator, validator
import datetime
import re
from pydantic import BaseModel, EmailStr, constr
from typing import List, Optional
import re

def PasswordValidator(value:str):
    match = re.match(r'^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d.*\d)(?=.*[@_&#]).+$',value)
    if not match:
       raise ValueError(f'{value} is not a valid password')
    return value


class User(BaseModel):
    NIC:str
    FirstName:str
    LastName:str
    Email:EmailStr
    Telephone:str = Field(min_length=10,max_length=10)
    DateOfBirth:int 
    Password:Annotated[str,AfterValidator(PasswordValidator)]
    

class Userlg(BaseModel):
    Email:EmailStr
    Password:Annotated[str,AfterValidator(PasswordValidator)]

class Token(BaseModel):
    Token:str

class Password(BaseModel):
    Old:Annotated[str,AfterValidator(PasswordValidator)]
    New:Annotated[str,AfterValidator(PasswordValidator)]

class Delete(BaseModel):
    NIC:str
    Password:Annotated[str,AfterValidator(PasswordValidator)]

class OTP(BaseModel):
    otp:int = Field(min_length=6,max_length=6)

class SendOtp(BaseModel):
    type:str
    data:EmailStr


nic_regex = re.compile(r"^[0-9]{9}[VvXx]$|^[0-9]{12}$")
phone_regex = re.compile(r"^\+?\d{10,15}$")
slmc_regex = re.compile(r"^\d{5,10}$")
password_regex = re.compile(r"^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@!#$%^&])[A-Za-z\d@!#$%^&]{8,}$")

class Qualification(BaseModel):
    degree: str
    institution: str
    year: int

class Doctor(BaseModel):
    FullName: str
    NIC: str
    Email: EmailStr
    Telephone: str = Field(min_length=10,max_length=10)
    Address: str
    Specialization: str
    Affiliation: str
    OfficeHours: str
    SlmcNumber: str
    Experience: int
    Qualifications: Optional[List[Qualification]] = []
    Password: Annotated[str,AfterValidator(PasswordValidator)]