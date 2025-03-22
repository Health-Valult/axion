from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, WebSocketException
from app.shared.middleware.authentication import Authenticate_WS

import datetime

route = APIRouter()
connected_clients:dict = {}



@route.websocket("/",)
async def websocket_endpoint(websocket: WebSocket,):
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
    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            await websocket.receive_text()  
    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")
        connected_clients.remove(websocket)


# im not sure what this does but im too scared to remove it
"""async def process_queue():
    while True:
        notification = await notification_queue.get()
        disconnected_clients = []
        
        for ws in connected_clients.copy():
            try:
                await ws.send_json(notification)
            except:
                disconnected_clients.append(ws)
        
        for ws in disconnected_clients:
            connected_clients.remove(ws)
"""