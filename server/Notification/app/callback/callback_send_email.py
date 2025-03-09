import os
from mailjet_rest import Client as MailjetClient

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_API_SECRET = os.getenv("MAILJET_API_SECRET")
MAILJET_FROM_EMAIL = os.getenv("MAILJET_FROM_EMAIL")

mailjet_client = MailjetClient(auth=(MAILJET_API_KEY, MAILJET_API_SECRET), version='v3.1')

async def send_email(email_content:dict):
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
                            "Email": email_content.get("email"),
                            "Name": "User"
                        }
                    ],
                    "Subject": email_content.get("subject"),
                    "TextPart": email_content.get("body")
                }
            ]
        }
        response = mailjet_client.send.create(data=data)
        print(f"Email sent to {email_content.get("email")}: {email_content.get("subject")}")
    except Exception as e:
        print(f"Failed to send email: {e}")