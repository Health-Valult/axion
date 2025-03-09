from json import loads
from aio_pika.abc import AbstractIncomingMessage
from ..utils.sender import sendMQ
from .callback_send_email import *
from .callback_send_sms import *
MQ = sendMQ("localhost","notification")

functions = {
    "send-email":send_email,
    "send-sms":send_sms
}

async def callback(message:AbstractIncomingMessage) -> None:
    msg = loads(message.body)
    return_q = message.reply_to
    print(return_q)
    runner = functions[msg["request"]["task"]]
    if callable(runner):
        try:
            result = await runner(msg["request"]["body"])

            print(result)
            MQ.send(
                Qname=return_q,
                task = msg["request"]["task"],
                body={
                    "result":result
                },
                type="response",
                status="success",
                declare=False
                )
        except Exception as e:
            print(e)
            MQ.send(
                Qname=return_q,
                task = msg["request"]["task"],
                body={
                    "result":""
                },
                type="response",
                status="error",
                declare=False
            )