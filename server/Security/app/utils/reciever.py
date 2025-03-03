from asyncio import Future
from aio_pika import connect
from ..consumer_proceses_callback.callBack import callback_security
from json import loads




async def recieveMQ(host:str,Qname:str):

        connection = await connect(host,heartbeat=30)
        async with connection:
            channel = await connection.channel()
            queue = await channel.declare_queue(Qname)
            await queue.consume(callback_security, no_ack=True)
            print(f"server now consuming on que : {Qname}")
            await Future()
        