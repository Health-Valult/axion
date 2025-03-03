from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query, HTTPException
from pydantic import BaseModel
from twilio.rest import Client as TwilioClient
from mailjet_rest import Client as MailjetClient
import pika
import json
import uuid
import datetime
import asyncio
from typing import List
from .db import notifications_collection, otp_collection
from .otp import generate_otp
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

connected_clients = set()
notification_queue = asyncio.Queue() 

TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_API_SECRET = os.getenv("MAILJET_API_SECRET")
MAILJET_FROM_EMAIL = os.getenv("MAILJET_FROM_EMAIL")

def get_rabbitmq_connection():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    try:
        channel.queue_declare(
            queue="notifications",
            arguments={"x-dead-letter-exchange": "", "x-dead-letter-routing-key": "notifications_dlq"}
        )
    except pika.exceptions.PreconditionFailed:
        print("Queue already exists with different parameters")

    return connection, channel


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    print(f"WebSocket Client Connected: {websocket.client}")

    try:
        while True:
            await websocket.receive_text()  
    except WebSocketDisconnect:
        print(f"WebSocket Disconnected: {websocket.client}")
        connected_clients.remove(websocket)

async def process_queue():
    while True:
        notification = await notification_queue.get()
        disconnected_clients = []
        
        for ws in connected_clients.copy():
            try:
                await ws.send_json(notification)
            except:
                disconnected_clients.append(ws)
        
        for ws in disconnected_clients:
            connected_clients.remove(ws)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(process_queue()) 

class Notification(BaseModel):
    user_id: str | None = None # If None, it's a global notification
    message: str
    type: str  # e.g., "alert", "reminder"
    is_global: bool = False
    phone_number: str | None = None
    email: str | None = None

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

@app.get("/notifications/{user_id}", response_model=List[dict])
async def get_notifications(
    user_id: str,
    unread_only: bool = Query(False, description="Filter to show only unread notifications"),
    limit: int = Query(10, description="Number of notifications to retrieve"),
):
    """Fetch past notifications for a user with optional filters."""
    filter_query = {"user_id": user_id}
    if unread_only:
        filter_query["read"] = False 

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
    print(f"Received in FastAPI: {notification}")  
    await notification_queue.put(notification)
    return {"status": "Notification queued"}

@app.post("/generate-otp/{patient_nic}")
async def generate_otp_api(patient_nic: str):
    otp_code, otp_secret = generate_otp()
    expiry_time = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)

    await otp_collection.insert_one({
        "_id": str(ObjectId()),
        "patient_nic": patient_nic,
        "otp": otp_code,
        "secret": otp_secret,
        "expires_at": expiry_time,  
        "used": False
    })

    return {"status": "OTP generated", "otp": otp_code, "expires_at": 30}

class OTPVerificationRequest(BaseModel):
    otp_input: str

@app.post("/verify-otp/{patient_nic}")
async def verify_otp(patient_nic: str, otp_data: OTPVerificationRequest):
    """Verify OTP entered by the patient."""
    otp_entry = await otp_collection.find_one({"patient_nic": patient_nic, "used": False})

    if not otp_entry:
        raise HTTPException(status_code=404, detail="No active OTP found")

    # Convert MongoDB timestamp to datetime (if needed)
    otp_expiry = otp_entry["expires_at"]

    if isinstance(otp_expiry, str):  # In case MongoDB stored it as a string
        otp_expiry = datetime.datetime.fromisoformat(otp_expiry)

    if datetime.datetime.utcnow() > otp_expiry:
        raise HTTPException(status_code=400, detail="OTP expired")

    if otp_data.otp_input != otp_entry["otp"]:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    await otp_collection.update_one(
        {"_id": otp_entry["_id"]},
        {"$set": {"used": True}}
    )

    return {"status": "OTP verified, access granted"}

twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
mailjet_client = MailjetClient(auth=(MAILJET_API_KEY, MAILJET_API_SECRET), version='v3.1')

async def send_sms(phone_number: str, message: str):
    try:
        twilio_client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        print(f"SMS sent to {phone_number}: {message}")
    except Exception as e:
        print(f"Failed to send SMS: {e}")

async def send_email(to_email: str, subject: str, message: str):
    try:
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": MAILJET_FROM_EMAIL,
                        "Name": "AXION HEALTH"
                    },
                    "To": [
                        {
                            "Email": to_email,
                            "Name": "User"
                        }
                    ],
                    "Subject": subject,
                    "TextPart": message
                }
            ]
        }
        response = mailjet_client.send.create(data=data)
        print(f"Email sent to {to_email}: {subject}")
    except Exception as e:
        print(f"Failed to send email: {e}")
