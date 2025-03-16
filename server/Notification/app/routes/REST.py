from fastapi import APIRouter, Depends
from starlette.requests import Request
from pymongo.collection import Collection
from app.shared.middleware.authentication import Authenticate
from server.Notification.app.models.models import *


route = APIRouter()

route.post("/notifications/set-device-token",dependencies=[Depends(Authenticate)])
async def set_device_token(request:Request,Token:SetToken):
    c_uuid,role = request.state.meta.get("uuid"),request.state.meta.get("role")
    Token:dict = Token.model_dump()
    Token["_id"] = c_uuid
    Token["role"] = role
    notificationCollection:Collection = request.app.state.TokensCollection

    notificationCollection.insert_one(Token)


# dont really know whats below me so im just gonna ignore it 😁
"""@route.post("/send-notification/")
async def send_notification(notification: Notification):
    
    notification_data = {
        "_id": str(uuid.uuid4()),
        "user_id": notification.user_id if notification.user_id else None,
        "message": notification.message,
        "type": notification.type,
        "is_global": notification.is_global,
        "timestamp": datetime.datetime.utcnow(),
        "read": False
    }

    await notifications_collection.insert_one(notification_data)

    connection, channel = get_rabbitmq_connection()
    channel.basic_publish(
        exchange="",
        routing_key="notifications",
        body=json.dumps(notification_data, default=str)
    )
    connection.close()

    if notification.phone_number:
        await send_sms(notification.phone_number, notification.message)

    # Send Email if email is provided
    if notification.email:
        await send_email(notification.email, "New Notification", notification.message)

    return {"status": "Notification sent!", "notification_id": notification_data["_id"]}

@route.get("/notifications/{user_id}", response_model=List[dict])
async def get_notifications(
    user_id: str,
    unread_only: bool = Query(False, description="Filter to show only unread notifications"),
    limit: int = Query(10, description="Number of notifications to retrieve"),
):
   "Fetch past notifications for a user with optional filters."
    filter_query = {"user_id": user_id}
    if unread_only:
        filter_query["read"] = False 

    notifications = await notifications_collection.find(filter_query).sort("timestamp", -1).limit(limit).to_list(None)
    
    return notifications

@route.patch("/notifications/{notification_id}/mark-read")
async def mark_notification_read(notification_id: str, read: bool = True):
    "Mark a notification as read or unread."
    notification = await notifications_collection.find_one({"_id": notification_id})
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    await notifications_collection.update_one(
        {"_id": notification_id},
        {"$set": {"read": read}}
    )

    return {"status": "Notification updated", "notification_id": notification_id, "read": read}

@route.post("/process-notification/")
async def process_notification(notification: dict):
    Receive notification from consumer.py and add it to WebSocket queue
    print(f"Received in FastAPI: {notification}")  
    await notification_queue.put(notification)
    return {"status": "Notification queued"}"""

