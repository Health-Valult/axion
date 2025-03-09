import asyncio
from fastapi import FastAPI
import uvicorn
#from app.routes.logs_reciever import router as reciever_router
#from app.routes.logs_routes import router as logs_router
from app.utils.reciever import recieveMQ

def create_app() -> FastAPI:
    """Define a FastAPI application and add routes.
    Returns:
        FastAPI: A FastAPI object.
    """	
    app = FastAPI(title="Analytics Server", description="Microservice to recieve logs and persist in database for monitoring.")
    #app.include_router(reciever_router)
    #app.include_router(logs_router)

    return app



app = create_app()

@app.on_event("startup")
async def startup_event():
    app.state.consumer_task = asyncio.create_task(recieveMQ("amqp://guest:guest@localhost/","analytics"))


if __name__ == '__main__':
    uvicorn.run("app.main:app",port=8080,reload=True)


