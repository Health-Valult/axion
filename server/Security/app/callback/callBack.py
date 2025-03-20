from json import loads
from aio_pika.abc import AbstractIncomingMessage
from pydantic import BaseModel
from .authenticate_session import *

class Body(BaseModel):
    task:str
    body:dict


class RedRequest(BaseModel):
    sender:str
    reciver:str
    id:str
    body:Body

class RedResponse(BaseModel):
    sender:str
    reciver:str
    id:str
    body:Body

functions = {
    "sessionAuth":authenticate_session
}

async def callback_security(request:RedRequest) -> None:


    runner = functions.get(request.body.task)
    if callable(runner):
        try:
            result = runner(request.body.body)
            return result
  
        except Exception as e:
            return e