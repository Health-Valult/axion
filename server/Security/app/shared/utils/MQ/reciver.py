from asyncio import Future
import logging
from aio_pika import connect
from typing import Callable

logger = logging.getLogger("uvicorn")

async def recieveMQ(host:str,Qname:str,callback:Callable):
    
    connection = await connect(host,heartbeat=30)
    async with connection:
        channel = await connection.channel()
        queue = await channel.declare_queue(Qname)
        await queue.consume(callback=callback, no_ack=True)
        logger.info(f"server now reciving on 🐇MQ : {Qname}")
        await Future()
    