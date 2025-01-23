from typing_extensions import Annotated
from pydantic import AfterValidator, BaseModel,EmailStr,Field,field_validator
import datetime
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
    ConfirmPassword:str = Field(min_length=10,max_length=10)
 







   #