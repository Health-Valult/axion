from json import loads
from aio_pika.abc import AbstractIncomingMessage
from.authenticate_session import *
from ..utils.sender import sendMQ

MQ = sendMQ("localhost","security")

functions = {
    "sessionAuth":authenticate_session
}

async def callback_security(message:AbstractIncomingMessage) -> None:
    msg = loads(message.body)
    runner = functions[msg["task"]]
    if callable(runner):
        try:
            result = runner(msg["data"]["token"])
            MQ.send(msg["service"],"verifiedToken",result)
        except Exception as e:
            MQ.send(msg["service"],"verifiedTokenError",{"err":e})