from fastapi import HTTPException, Request, Response, WebSocket, WebSocketException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.shared.utils.Cache.redis import redis_AX
from starlette.middleware.base import BaseHTTPMiddleware



class Body(BaseModel):
    task:str
    body:dict

# Dependancy injection
def Authenticate(request: Request):
    
    Mq:redis_AX = request.app.state.Cache 
    token:str = request.headers.get('authorization')
    if token is None:
        raise HTTPException(status_code=401, detail="No session token sent")
    
    body = Body(
        task="sessionAuth",
        body={
            "token":token
        }
    )
    
    rabbitResponse = Mq.scarletSender_is_waiting("security",body)
    
    if rabbitResponse is None:
        raise HTTPException(status_code=500, detail="Authentication service did not respond")
    
    response:dict = rabbitResponse.body
    status = response.task
    if status != "verifiedToken":
        raise HTTPException(status_code=401, detail="session token expired or invalid")
    
    request.state.meta = response.body
    
    return request


async def Authenticate_WS(webSocket: WebSocket,token:str):
    
    Mq:redis_AX = webSocket.app.state.Cache 


    if token is None:
        await webSocket.close()
        raise WebSocketException(code=1008, reason="session token expired or invalid")
    
    body = Body(
        task="sessionAuth",
        body={
            "token":token
        }
    )
    
    rabbitResponse = Mq.scarletSender_is_waiting("security",body)
    
    if rabbitResponse is None:
        raise HTTPException(status_code=500, detail="Authentication service did not respond")
    
    response = rabbitResponse.body
    status = response.task
    if status != "verifiedToken":
        raise HTTPException(status_code=401, detail="session token expired or invalid")

    body = response.body
    
    
    return body.get("uuid"), body.get("role")

