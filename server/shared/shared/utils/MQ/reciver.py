from asyncio import Future
from aio_pika import connect
from typing import Callable



async def recieveMQ(host:str,Qname:str,callback:Callable):

        connection = await connect(host,heartbeat=30)
        async with connection:
            channel = await connection.channel()
            queue = await channel.declare_queue(Qname)
            await queue.consume(callback=callback, no_ack=True)
            print(f"server now consuming on que : {Qname}")
            await Future()