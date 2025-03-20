from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.shared.utils.Cache.redis import redis_AX
class Body(BaseModel):
    task:str
    body:dict

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