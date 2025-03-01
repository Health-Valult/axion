import asyncio
from reciever import Que

MQ = Que("amqp://guest:guest@localhost/")
MQ.initialize()

async def main():
    """Main thread function."""
    print("Main thread started")

    
    task = asyncio.create_task(MQ.recieveMQ("hello"))

    
    for i in range(10):
        print(f"Main thread working... {i}")
        await asyncio.sleep(1)  

    print("Main thread finished, stopping background task")

    
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Background task stopped")

asyncio.run(main())