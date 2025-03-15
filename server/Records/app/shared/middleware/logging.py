import logging
from typing import Literal
from fastapi import HTTPException, Request
from pydantic import BaseModel, Field
from app.shared.utils.MQ.sender import sendMQ
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import json
import datetime

logger = logging.getLogger("uvicorn")

class GeneralLog(BaseModel):
    service:str
    endpoint:str
    user:str
    type:str
    timestamp:str = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())
    


class ErrorLog(BaseModel):
    service: str
    endpoint:str
    type: str
    description: str
    timeStamp: str = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())

class AuthLog(BaseModel):
    user:str
    timeStamp: str = Field(default_factory=lambda:datetime.datetime.now(tz=datetime.timezone.utc).isoformat())



def logit(Mq:sendMQ,type:Literal["general","error","auth"],log:GeneralLog|ErrorLog|AuthLog):
    log = log.model_dump()
    Mq.send(Qname = "analytics", task="log", body = {"type":type,"body":log},type="request")
    



class Logging(BaseHTTPMiddleware):
        
    async def dispatch(self,request: Request, call_next):
        response: Response = await call_next(request)

        Mq:sendMQ = request.app.state.sender_task

        if not hasattr(request.state,"meta"):
            logger.critical("unable to log event ☢️")
            return response
        
        state:dict = request.state.meta

        app = request.app

        route = request.scope.get("route")
        if not hasattr(route,"tags"):
            logger.critical("unable to log event ☢️")
        tag = route.tags[0]
        
        match tag:

            case "secure":
                log = GeneralLog(
                    service=app.title,
                    endpoint= request.url.path,
                    user = state.get("uuid"),
                    type= request.method
                )
                logit(Mq = Mq,type="general",log=log)

            case "auth":
                log = AuthLog(
                    user = state.get("uuid"),
                )
                logit(Mq = Mq,type="auth",log=log)

            case _:
                logger.critical("unknown log type 🤷🏾")
            
        
        return response