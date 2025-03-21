from asyncio import Future
import logging
from aio_pika import connect
from typing import Callable, Optional
from redis.asyncio import Redis
from pydantic import BaseModel
from app.shared.utils.Cache.redis import redis_AX
class Body(BaseModel):
    task:str
    body:dict

class RedRequest(BaseModel):
    sender:str
    reciver:str
    id:str
    returnChannel:Optional[str]
    body:Body

class RedResponse(BaseModel):
    sender:str
    reciver:str
    id:str
    body:Body


logger = logging.getLogger("uvicorn")

redisax = redis_AX("redis://cache",200,service="security").connect()

import redis.asyncio as redis
async def reader(channel: redis.client.PubSub,executer:Callable):
    while True:
        message:dict = await channel.get_message(ignore_subscribe_messages=True)
        if message is not None:
            data:str = message.get("data").decode("utf-8")
            
            request = RedRequest.model_validate_json(data)
            
            response = await executer(request)
            body = Body(
                task = "verifiedToken",
                body = response
            )
            print(request.returnChannel)
            redisax.scarletSender(request.returnChannel,body=body)

async def RedReciver(host:str,channel:str,executer:Callable):

    

    r = redis.from_url(host)
    logger.info(f"server now reciving on 🟥is channel: {channel}")
    async with r.pubsub() as pubsub:
        await pubsub.subscribe(channel)

        await reader(pubsub,executer=executer)



