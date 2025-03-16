import asyncio
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.requests import Request
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate
from app.main import notification_queue

route = APIRouter()
connected_clients = set()



@route.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            await websocket.receive_text()  
    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")
        connected_clients.remove(websocket)

async def process_queue():
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
