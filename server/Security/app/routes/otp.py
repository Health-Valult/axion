import hmac
import random
from fastapi import APIRouter
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.models.models import *
from starlette.requests import Request
from app.callback import authenticate_session

route = APIRouter()

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])


@route.post("/axion/auth/send/otp")
def send_otp(request:Request,cred:SendOtp):

    state:FastAPI = request.app.state

    id = cred.tempID
    type = cred.type
    data = cred.data
    
    c_uuid,role = 35726845687,"patient"
    name = f"otp::{id}"
    otp = generate_otp()
    payload = {
        "uuid":id,
        "type":type,
        "otp":otp
    }
    state.Cache.set_item(name=name,payload=payload)
    body = {
        "email":data,
        "subject":"Axion Verification OTP",
        "body":f"your otp is {otp}"
    }
    response = state.sender_task.send_and_await("notification","send-email",body=body)
    print(response)
    return JSONResponse(status_code=200,content={"msg":"otp sent"})



@route.post("/axion/auth/verify/otp")
def verify_otp(request:Request,cred:OTP):
    state:FastAPI = request.app
    c_otp = cred.otp
    c_id = cred.tempID
   
    name = f"otp::{c_id}"
    otp_payload = state.state.Cache.get_item(name=name)

    if otp_payload is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})

    otp = otp_payload.get("otp")

    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})

    return JSONResponse(status_code=200,content={"msg":"otp verified"})