import datetime
import json
import logging
from typing import Annotated, Union
import uuid
from fastapi.responses import JSONResponse
from starlette.requests import Request
from app.models.upload_models import *
from fastapi import APIRouter,FastAPI,Depends, WebSocketDisconnect, WebSocketException
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate, Authenticate_WS
from fastapi.websockets import WebSocket
from app.shared.utils.Cache.redis import redis_AX
from app.models.models import *

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
    pass
"""
@route.post(path="/records/select-patient")
async def verify_doctor(pateint:SelectPatient):
    NIC = pateint.NIC
    


@route.websocket("/records/search",)
async def websocket_endpoint(websocket: WebSocket):
    
    await websocket.accept()
    token = websocket.query_params.get("token")
    
    if token is None:
        raise WebSocketException(code=1008, reason="session token not sent")
    c_uuid,role = await Authenticate_WS(webSocket=websocket,token=token)
    connected_clients[c_uuid] = {
        "time":datetime.datetime.now(datetime.timezone.utc),
        "role":role,
        "socket":websocket
        }

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