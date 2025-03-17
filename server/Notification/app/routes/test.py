from fastapi import APIRouter, Depends
from fastapi.responses import PlainTextResponse
from starlette.requests import Request
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate
from app.shared.utils.MQ.sender import sendMQ
from app.models.models import *
from pydantic import BaseModel, EmailStr

class Email(BaseModel):
    email:EmailStr
    subject:str
    body:str

route = APIRouter()

@route.post("/notifications/test/email")
async def set_device_token(request:Request,email:Email):
    send:sendMQ = request.app.state.sender_task
    body = email.model_dump()
    response = send.send_and_await(Qname="notification",task="send-email",body=body)
    return PlainTextResponse(content=f"email sent {response}")

@route.post("/notifications/test/ws")
async def set_device_token(request:Request):
    send:sendMQ = request.app.state.sender_task

@route.post("/notifications/test/push")
async def set_device_token(request:Request):
    send:sendMQ = request.app.state.sender_task