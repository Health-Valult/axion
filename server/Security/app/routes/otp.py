import hmac
import logging
import random
from fastapi import APIRouter
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.models.models import *
from starlette.requests import Request
from app.callback import authenticate_session
from app.shared.utils.Cache.redis import redis_AX,Body


logger = logging.getLogger("uvicorn")

route = APIRouter()

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])


@route.post("/axion/auth/send/otp")
def send_otp(request:Request,cred:SendOtp):

    state:FastAPI = request.app.state
    cache:redis_AX = request.app.state.Cache

    id = cred.tempID
    type = cred.type
    data = cred.data
    
    name = f"otp::{id}"
    otp = generate_otp()
    payload = {
        "uuid":id,
        "type":type,
        "otp":otp
    }
    cache.set_item(name=name,payload=payload)
    body = Body(
        task="send-email",
        body={
        "email":data,
        "subject":"Axion Verification OTP",
        "body":f"your otp is {otp}"
    })
    
    cache.scarletSender("notification",body=body)
    
    return JSONResponse(status_code=200,content={"msg":"otp sent"})



@route.post("/axion/auth/verify/otp")
def verify_otp(request:Request,cred:OTP):
    state:FastAPI = request.app.state
    cache:redis_AX = request.app.state.Cache

    c_otp = cred.otp
    c_id = cred.tempID
   
    name = f"otp::{c_id}"
    otp_payload = cache.get_item(name=name)
    logger.warning(otp_payload)
    if otp_payload is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})

    otp = otp_payload.get(b"otp").decode()
    if otp is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})
    
    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})

    return JSONResponse(status_code=200,content={"msg":"otp verified"})