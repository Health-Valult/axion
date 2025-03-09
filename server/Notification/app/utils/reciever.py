from asyncio import Future
from aio_pika import connect
from aio_pika.abc import AbstractIncomingMessage
from json import loads



async def recieveMQ(host:str,Qname:str,callback):
        print("reciever active")
        connection = await connect(host,heartbeat=30)
        async with connection:
            channel = await connection.channel()
            queue = await channel.declare_queue(Qname)
            await queue.consume(callback, no_ack=True)
            print(f"server now consuming on que : {Qname}")
            await Future()
        