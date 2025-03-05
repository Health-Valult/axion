from fastapi import Request
from ..utils.sender import sendMQ
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import json
import datetime

class Logging(BaseHTTPMiddleware):
    def __init__(self,app,Mq:sendMQ):
        super().__init__(app)
        self.Mq = Mq

    async def dispatch(self,request: Request, call_next):

        

        print(request.headers['authorization'])
        body = await request.body()
        body = json.loads(body)
        if hasattr(request.state,"user"):
            print(request.state.user)
        log = {
            
            "token":request.headers['authorization'],
            "body":body,
            "timeStamp":str(datetime.datetime.now(tz=datetime.timezone.utc))
        }
        self.Mq.send(Qname = "analytics", task="log", msg = log)
        response: Response = await call_next(request)
        return response