from fastapi import HTTPException, Request
from ..utils.sender import sendMQ
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


class Auth(BaseHTTPMiddleware):
    def __init__(self,app,Mq:sendMQ):
        super().__init__(app)
        self.Mq = Mq

    async def dispatch(self,request: Request, call_next):

        token = request.headers['authorization']
        sessionResponse = self.Mq.send_and_await("security","sessionAuth",{"token":token})
        
        if sessionResponse["task"] != "verifiedToken":
            raise HTTPException(status_code=401, detail="invalid token")
        
        request.state.user = sessionResponse["data"]
        response: Response = await call_next(request)
        return response