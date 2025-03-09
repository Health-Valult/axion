from fastapi import APIRouter 

from routes.logs_routes import post_log

router = APIRouter()

@router.post("/log")
async def log_message(log: LogMessage):
    await post_log(log)
    return {"status": "success", "message": "Log received"}