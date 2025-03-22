import datetime
import hmac
import json
import logging
import random
from typing import Annotated, Union
import uuid
from fastapi.responses import JSONResponse
from starlette.requests import Request
from app.models.upload_models import *
from fastapi import APIRouter,FastAPI,Depends, WebSocketDisconnect, WebSocketException
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate, Authenticate_WS
from fastapi.websockets import WebSocket
from app.shared.utils.Cache.redis import Body, redis_AX
from app.models.models import *
import requests

def generate_otp(length=6):
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])

route = APIRouter()
connected_clients:dict = {}
logger = logging.getLogger("uvicorn")
"""@route.post(path="records/upload/{type}")
async def upload_report(type:str,report:Annotated[Union[
        CBCReportTemplate,
        UFRTemplate,
        CRPReportTemplate,
        LFTReportTemplate,
        FBSReportTemplate,
        SerumCreatinineReportTemplate,
        SerumElectrolytesReportTemplate,
        LipidProfileReportTemplate,
        HbA1cReportTemplate,
        ESRReportTemplate,
        TFTReportTemplate
        ]]): # type: ignore
    pass"""

@route.post(path="/records/select-patient",dependencies=[Depends(Authenticate)])
async def verify_doctor(request:Request,pateint:SelectPatient):

    collection:Collection = request.app.state.PatientsCollection
    cache:redis_AX = request.app.state.Cache
    c_uuid,role = request.state.meta.get("uuid"),request.state.meta.get("role")
    NIC = pateint.NIC
    credentials = collection.find_one({"NIC":NIC},{"_id":0,"Email":1,"UserID":1})

    logger.info(credentials)

    if not credentials:
        return JSONResponse(status_code=401,content={"Details":"patient does not exist"})

    EMAIL = credentials.get("Email")
    UUID = credentials.get("UserID")

    name = f"otp::verify:records::request::{UUID}"
    otp = generate_otp()
    payload = {
        "uuid":c_uuid,
        "type":"email",
        "NIC":NIC,
        "otp":otp
    }
    cache.set_item(name=name,payload=payload)
    body = Body(
        task="send-email",
        body={
        "email":EMAIL,
        "subject":"Axion Verification OTP",
        "body":f"your otp is {otp}"
    })
    
    cache.scarletSender("notification",body=body)
    return JSONResponse(status_code=200,content={"Details":"pending verification status"})


@route.post(path="/records/verify-request",dependencies=[Depends(Authenticate)])
async def verify_doctor_request(request:Request,cred:OTP):
    state:FastAPI = request.app.state
    cache:redis_AX = request.app.state.Cache
    collection:Collection = request.app.state.DoctorsCollection
    c_otp = cred.otp
    c_uuid,role = request.state.meta.get("uuid"),request.state.meta.get("role")
    
   
    name = f"otp::verify:records::request::{c_uuid}"
    otp_payload = cache.get_item(name=name)
    logger.warning(otp_payload)
    if not otp_payload:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})

    otp = otp_payload.get(b"otp").decode()
    requester = otp_payload.get(b"uuid").decode()
    if otp is None:
        return JSONResponse(status_code=200,content={"msg":"otp expired or invalid"})
    
    if not hmac.compare_digest(otp,c_otp):
        return JSONResponse(status_code=200,content={"msg":"otp invalid"})
    
    new_patients = {
        "UserID":c_uuid
    }

    """collection.update_one(
        {"UserID":requester},
          {"$addToSet": {"patients": {"$each": [new_patients]}}}
    )"""
    cache.set_item(
        name=f"verified::doc::{requester}",
        payload={"patient":c_uuid},
        ttl=60
    )

    return JSONResponse(status_code=200,content={"msg":"otp verified"})


@route.post(path="/records/add-prescription",dependencies=[Depends(Authenticate)])
async def add_prescriptions():
    pass


















@route.websocket("/records/search",)
async def websocket_endpoint(websocket: WebSocket):
    
    await websocket.accept()
    token = websocket.query_params.get("token")
    
    if token is None:
        raise WebSocketException(code=1008, reason="session token not sent")
    c_uuid,role = await Authenticate_WS(webSocket=websocket,token=token)

    pt:Collection = websocket.app.state.PatientsCollection


    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            text = await websocket.receive_json()  
            logger.warning(text)
            prefix = text.get("packet")
            logger.warning(prefix)
            auto = pt.find({ "NIC": { "$regex": f"^{prefix}", "$options": 'i' } },{"_id":0,"NIC":1,"FirstName":1})
            auto_list = list(auto)
            logger.warning(auto_list)
            response = {
                "packet":auto_list
            }
            
            await websocket.send_json(response)

    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")


