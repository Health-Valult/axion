from json import loads
from aio_pika.abc import AbstractIncomingMessage
from .authenticate_session import *
from app.shared.utils.MQ.sender import sendMQ

MQ = sendMQ("mq","security")

functions = {
    "sessionAuth":authenticate_session
}

async def callback_security(message:AbstractIncomingMessage) -> None:
    msg = loads(message.body)
    return_q = message.reply_to

    runner = functions[msg["request"]["task"]]
    if callable(runner):
        try:
            result = runner(msg["request"]["body"]["token"])

            MQ.send(Qname=return_q,task="verifiedToken",body=result, declare=False,type="response",status="success")
  
        except Exception as e:
            print(e)
            MQ.send(Qname=return_q,task="verifiedTokenError",body={"err":str(e)},declare=False,type="response",status="error")