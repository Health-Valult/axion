from json import loads
from aio_pika.abc import AbstractIncomingMessage
from.authenticate_session import *

functions = {
    "sessionAuth":authenticate_session
}

async def callback_security(message:AbstractIncomingMessage) -> None:
    msg = loads(message.body)
    print(msg["task"])
    print(msg["data"]["token"])
    runner = functions[msg["task"]]
    if callable(runner):
        runner(msg["data"]["token"])
