import uuid
from pydantic import BaseModel, Field
import datetime

class ErrorLog(BaseModel):
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc))
    sender: str
    type: str
    description: str
    

class LoginLog(BaseModel):
    user:uuid.UUID
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc))
    ip:str

class SignupLog(BaseModel):
    user:uuid.UUID
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc))


class GeneralLog(BaseModel):
    service:str
    endpoint:str
    requester:str
    type:str
    timestamp:datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc))
    responseCode:int