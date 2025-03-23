from json import loads
from aio_pika.abc import AbstractIncomingMessage
from app.utils.sender import sendMQ
from .callback_log import *



functions = {
    "log":log_event,
    
}

async def callback(message:AbstractIncomingMessage) -> None:
    msg = loads(message.body)
    print(msg["request"]["task"])
    runner = functions[msg["request"]["task"]]
    if callable(runner):
        try:
            result = await runner(msg["request"]["body"])

            print(result)
            
        except Exception as e:
            print(e)
            