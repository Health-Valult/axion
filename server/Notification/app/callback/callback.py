from json import loads
import logging
from aio_pika.abc import AbstractIncomingMessage
from pydantic import BaseModel
from ..utils.sender import sendMQ
from .callback_send_email import send_email
from .callback_send_notification import _send_one, _send_all
from .callback_send_sms import _send_sms
from .callback_send_ws_notification import _send_ws_notification

logger = logging.getLogger("uvicorn")


functions = {
    "send-email":send_email,
    "send-sms":_send_sms,
    "send-notification": _send_one,
    "send-ws": _send_ws_notification
}

class Body(BaseModel):
    task:str
    body:dict


class RedRequest(BaseModel):
    sender:str
    reciver:str
    id:str
    body:Body

class RedResponse(BaseModel):
    sender:str
    reciver:str
    id:str
    body:Body


async def callback(request:RedRequest) -> None:
    try:
        logger.warning("qwertyui")
        logger.warning(request.body.task)
        runner = functions.get(request.body.task)
        if callable(runner):
            try:
                result = await runner(request.body.body)
                return result
    
            except Exception as e:
                return {}
    except Exception as e:
        logger.warning(e)