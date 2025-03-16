from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from app.shared.utils.MQ.sender import sendMQ


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