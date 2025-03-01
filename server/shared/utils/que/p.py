import asyncio

import aio_pika


async def on_message(message:aio_pika.abc.AbstractIncomingMessage) -> None:
    """
    on_message doesn't necessarily have to be defined as async.
    Here it is to show that it's possible.
    """
    print(" [x] Received message %r" % message)
    print("Message body is: %r" % message.body)

    print("Before sleep!")
    await asyncio.sleep(5)  # Represents async I/O operations
    print("After sleep!")

async def tset() -> None:
    # Perform connection
    connection = await aio_pika.connect("amqp://guest:guest@localhost/")
    async with connection:
        # Creating a channel
        channel = await connection.channel()

        # Declaring queue
        queue = await channel.declare_queue("hello")

        # Start listening the queue with name 'hello'
        await queue.consume(on_message, no_ack=True)

        print(" [*] Waiting for messages. To exit press CTRL+C")
        await asyncio.Future()

async def main():
    """Main thread function."""
    print("Main thread started")

    # Start background task
    task = asyncio.create_task(tset())

    # Keep main thread active (for demonstration, runs for 10 seconds)
    for i in range(10):
        print(f"Main thread working... {i}")
        await asyncio.sleep(1)  # Simulate some work

    print("Main thread finished, stopping background task")

    # Cancel the background task gracefully
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Background task stopped")

if __name__ == "__main__":
    asyncio.run(main())  # Start the event loop
