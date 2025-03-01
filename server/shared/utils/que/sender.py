import asyncio
import aio_pika
import aio_pika.abc
import pika

async def main() -> None:
    # Perform connection
    connection = await aio_pika.connect("amqp://guest:guest@localhost/")

    async with connection:
        # Creating a channel
        channel = await connection.channel()
        queue = await channel.declare_queue("hello")
        await channel.default_exchange.publish(
            aio_pika.Message(b"Hello World!"),
            routing_key=queue.name,
        )
        print(" [x] Sent 'Hello World!'")

if __name__ == "__main__":
    asyncio.run(main())