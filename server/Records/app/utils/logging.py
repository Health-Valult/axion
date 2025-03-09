from typing import Literal
import uuid
from fastapi import Request
from pydantic import BaseModel, Field
from .sender import sendMQ
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import json
import datetime


class GeneralLog(BaseModel):
    service:str
    endpoint:str
    requester:str
    type:str
    timestamp:datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())
    


class ErrorLog(BaseModel):
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())
    sender: str
    type: str
    description: str
    

class LoginLog(BaseModel):
    user:str
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())
    ip:str

class SignupLog(BaseModel):
    user:str
    timeStamp: datetime.datetime = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())


    


def log(Mq:sendMQ,type:Literal["general","error","signup","login"],log:GeneralLog|ErrorLog|LoginLog|SignupLog):
    log = log.model_dump()
    Mq.send(Qname = "analytics", task="log", body = {"type":type,"body":log},type="request")
    print("log sent")