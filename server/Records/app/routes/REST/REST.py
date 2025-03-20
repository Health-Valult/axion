import datetime
from typing import Annotated, Union
import uuid
from fastapi.responses import JSONResponse
from starlette.requests import Request
from app.models.upload_models import *
from fastapi import APIRouter,FastAPI,Depends, WebSocketDisconnect
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate, Authenticate_WS
from fastapi.websockets import WebSocket

route = APIRouter()
connected_clients:dict = {}

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

    connected_clients[c_uuid] = {
        "time":datetime.datetime.now(datetime.timezone.utc),
        "role":role,
        "socket":websocket
        }

    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
           text = await websocket.receive_text()  
           print(text)
    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")