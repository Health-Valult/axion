import json
import aio_pika
import asyncio
import aio_pika
import aio_pika.abc



class Que:
    def __init__(self,host:str):
        self.host = host

    async def initialize(self,):

        self.connection = await aio_pika.connect(self.host)
        async with self.connection:
            self.channel = await self.connection.channel()
        return self.channel

    async def recieveMQ(channel:aio_pika.abc.AbstractChannel,Qname:str):

        async def callback(message:aio_pika.abc.AbstractIncomingMessage) -> None:
            print("Message body is: %r" % message.body)

        async def retrun_function():
            queue = await channel.declare_queue(Qname)
            await queue.consume(callback, no_ack=True)
            print(f"server now consuming on que : {Qname}")
            await asyncio.Future()
        print("returning")
        return retrun_function

    async def sendMQ(self,Qname:str,msg:dict):

        msg = json.dumps(msg).encode("utf-8")

        queue = await self.channel.declare_queue(Qname)
        await self.channel.default_exchange.publish(
            aio_pika.Message(msg),
            routing_key=queue.name,
        )
        print(f"[x] Sent msg to {Qname}")

    def terminateMQ(self):
        self.connection.close()