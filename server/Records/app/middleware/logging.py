from fastapi import Request
from pydantic import BaseModel, Field
from ..utils.sender import sendMQ
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import json
import datetime


class GeneralLog(BaseModel):
    service:str
    endpoint:str
    requester:str
    type:str
    timestamp:datetime.datetime = Field(default_factory=datetime.datetime.now(tz=datetime.timezone.utc))
    responseCode:int

class Logging(BaseHTTPMiddleware):
    def __init__(self,app,Mq:sendMQ):
        super().__init__(app)
        self.Mq = Mq

    async def dispatch(self,request: Request, call_next):

        print(request.headers)
        body = await request.body()
        body = json.loads(body)
        if hasattr(request.state,"user"):
            print(request.state.user)
        """log = GeneralLog(
            service="record",
            endpoint=
        )"""
        self.Mq.send(Qname = "analytics", task="log", body = {"test":"tes"},type="request")
        response: Response = await call_next(request)
        return response