from json import loads
from aio_pika.abc import AbstractIncomingMessage
from ..utils.sender import sendMQ
from .callback_send_email import _send_email
from .callback_send_notification import _send_one, _send_all
from .callback_send_sms import _send_sms
from .callback_send_ws_notification import _send_ws_notification


MQ = sendMQ("mq","notification")

functions = {
    "send-email":_send_email,
    "send-sms":_send_sms,
    "send-notification": _send_one,
    "send-ws": _send_ws_notification
}

async def callback(message:AbstractIncomingMessage) -> None:
    
    msg:dict = loads(message.body)
    return_q = message.reply_to
    print(return_q)
    runner = functions.get(msg.get("request").get("task"))
    if callable(runner):
        try:
            result = await runner(msg.get("request").get("body"))

            print(result)
            MQ.send(
                Qname=return_q,
                task = msg.get("request").get("task"),
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
                task = msg.get("request").get("task"),
                body={
                    "result":""
                },
                type="response",
                status="error",
                declare=False
            )