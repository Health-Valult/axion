from twilio.rest import Client as TwilioClient
import os

TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")

twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

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