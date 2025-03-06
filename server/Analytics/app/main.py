from fastapi import FastAPI
from routes.logs_reciever import router as reciever_router
from routes.logs_routes import router as logs_router

def create_app() -> FastAPI:
    """Define a FastAPI application and add routes.
    Returns:
        FastAPI: A FastAPI object.
    """	
    app = FastAPI(title="Analytics Server", description="Microservice to recieve logs and persist in database for monitoring.")
    app.include_router(reciever_router)
    app.include_router(logs_router)

    return app

app = create_app()




