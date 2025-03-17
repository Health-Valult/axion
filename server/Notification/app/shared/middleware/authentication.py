from fastapi import HTTPException, Request,WebSocket,WebSocketException
from app.shared.utils.MQ.sender import sendMQ
import logging
logger = logging.getLogger("uvicorn")

def Authenticate(request: Request):
    
    Mq:sendMQ = request.app.state.sender_task 
    token:str = request.headers.get('authorization')
    if token is None:
        raise HTTPException(status_code=401, detail="No session token sent")
    
    rabbitResponse:dict = Mq.send_and_await("security","sessionAuth",{"token":token})[0]
    response:dict = rabbitResponse.get("response")
    
    status = response.get("task")
    if status != "verifiedToken":
        raise HTTPException(status_code=401, detail="session token expired or invalid")
    
    request.state.meta = response.get("body")
    
    return request


def Authenticate_WS(webSocket: WebSocket):
    
    Mq:sendMQ = webSocket.app.state.sender_task 
    token:str = webSocket.headers.get('authorization')
    print("logged as mid")
    if token is None:
        webSocket.close()
        raise WebSocketException(code=1008, reason="session token expired or invalid")
    
    rabbitResponse:dict = Mq.send_and_await("security","sessionAuth",{"token":token})[0]
    response:dict = rabbitResponse.get("response")
    
    status = response.get("task")
    if status != "verifiedToken":
        webSocket.close()
        raise WebSocketException(code=1008, reason="session token expired or invalid")
    print(response.get("body"))
    webSocket.state.meta = response.get("body")
    
    return webSocket