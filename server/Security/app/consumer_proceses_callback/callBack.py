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
    return_q = message.reply_to
    print(return_q)
    runner = functions[msg["task"]]
    if callable(runner):
        try:
            result = runner(msg["data"]["token"])
            print(result)
            MQ.send(return_q,"verifiedToken",result, declare=False)
        except Exception as e:
            print(e)
            MQ.send(return_q,"verifiedTokenError",{"err":str(e)},declare=False)