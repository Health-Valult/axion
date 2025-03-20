from asyncio import Future
import logging
from aio_pika import connect
from typing import Callable
from redis.asyncio import Redis
from pydantic import BaseModel
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


logger = logging.getLogger("uvicorn")

import redis.asyncio as redis
async def reader(channel: redis.client.PubSub,executer:Callable):
    while True:
        message:dict = await channel.get_message(ignore_subscribe_messages=True)
        if message is not None:
            data:str = message.get("data").decode("utf-8")
            print(data)
            request = RedRequest.model_validate_json(data)
            response = await executer(request)
            print(response)
async def RedReciver(host:str,channel:str,executer:Callable):

    

    r = redis.from_url(host)
    logger.info(f"server now reciving on 🟥is channel: {channel}")
    async with r.pubsub() as pubsub:
        await pubsub.subscribe(channel)

        await reader(pubsub,executer=executer)



