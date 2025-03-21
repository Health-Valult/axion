import datetime
import json
import logging
from typing import Annotated, Union
import uuid
from fastapi.responses import JSONResponse
from starlette.requests import Request
from app.models.upload_models import *
from fastapi import APIRouter,FastAPI,Depends, WebSocketDisconnect
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate, Authenticate_WS
from fastapi.websockets import WebSocket
from app.shared.utils.Cache.redis import redis_AX

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

@route.post(path="records/upload/{type}")
async def verify_doctor():
    pass
"""

@route.websocket("/records/search",)
async def websocket_endpoint(websocket: WebSocket,):

    c_uuid,role = await Authenticate_WS(webSocket=websocket)
    await websocket.accept()
    
    pt:Collection = websocket.app.state.PatientsCollection

    connected_clients[c_uuid] = {
        "time":datetime.datetime.now(datetime.timezone.utc),
        "role":role,
        "socket":websocket
        }

    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            text = await websocket.receive_json()  
            logger.warning(text)
            prefix = text.get("packet")
            logger.warning(prefix)
            auto = pt.find({ "NIC": { "$regex": f"^{prefix}", "$options": 'i' } },{"_id":0,"NIC":1,"FirstName":1})
            logger.warning(list(auto))
            response = {
                "packet":list(auto)
            }
            
            await websocket.send_json(response)

    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")