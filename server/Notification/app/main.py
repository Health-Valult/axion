from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query, HTTPException
from pydantic import BaseModel
import pika
import json
import uuid
import datetime
import asyncio
from typing import List
from .db import notifications_collection  

app = FastAPI()

# Store connected WebSocket clients
connected_clients = set()
notification_queue = asyncio.Queue()  # Queue for passing notifications

# Establish RabbitMQ Connection
def get_rabbitmq_connection():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()
    channel.queue_declare(queue="notifications")
    return connection, channel

# WebSocket Endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    print(f"✅ WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        print(f"❌ WebSocket Disconnected: {websocket.client}")
        connected_clients.remove(websocket)

# Background Task: Process Notifications from Queue
async def process_queue():
    while True:
        notification = await notification_queue.get()
        print(f"📢 Processing Notification: {notification}")
        disconnected_clients = []
        
        for ws in connected_clients.copy():
            try:
                await ws.send_json(notification)
            except:
                disconnected_clients.append(ws)  # Mark failed clients
        
        # Remove disconnected clients
        for ws in disconnected_clients:
            connected_clients.remove(ws)

# Start Background Task on Server Startup
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(process_queue())  # Start notification processor

# Notification Model
class Notification(BaseModel):
    user_id: str | None  # If None, it's a global notification
    message: str
    type: str  # e.g., "alert", "reminder"
    is_global: bool = False

@app.post("/send-notification/")
async def send_notification(notification: Notification):
    """Handle sending a notification"""
    notification_data = {
        "_id": str(uuid.uuid4()),
        "user_id": notification.user_id if notification.user_id else None,
        "message": notification.message,
        "type": notification.type,
        "is_global": notification.is_global,
        "timestamp": datetime.datetime.utcnow(),
        "read": False
    }

    # Store in MongoDB
    await notifications_collection.insert_one(notification_data)

    # Publish to RabbitMQ
    connection, channel = get_rabbitmq_connection()
    channel.basic_publish(
        exchange="",
        routing_key="notifications",
        body=json.dumps(notification_data, default=str)
    )
    connection.close()

    return {"status": "Notification sent!", "notification_id": notification_data["_id"]}

@app.get("/notifications/{user_id}", response_model=List[dict])
async def get_notifications(
    user_id: str,
    unread_only: bool = Query(False, description="Filter to show only unread notifications"),
    limit: int = Query(10, description="Number of notifications to retrieve"),
):
    """Fetch past notifications for a user with optional filters."""
    filter_query = {"user_id": user_id}
    if unread_only:
        filter_query["read"] = False  # Fetch only unread notifications

    notifications = await notifications_collection.find(filter_query).sort("timestamp", -1).limit(limit).to_list(None)
    
    return notifications

@app.patch("/notifications/{notification_id}/mark-read")
async def mark_notification_read(notification_id: str, read: bool = True):
    """Mark a notification as read or unread."""
    notification = await notifications_collection.find_one({"_id": notification_id})
    
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    await notifications_collection.update_one(
        {"_id": notification_id},
        {"$set": {"read": read}}
    )

    return {"status": "Notification updated", "notification_id": notification_id, "read": read}

@app.post("/process-notification/")
async def process_notification(notification: dict):
    """Receive notification from consumer.py and add it to WebSocket queue"""
    print(f"📩 Received in FastAPI: {notification}")  # Debugging
    await notification_queue.put(notification)  # Add to queue
    return {"status": "Notification queued"}
