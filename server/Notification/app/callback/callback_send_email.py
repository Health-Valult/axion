import logging
import os
from mailjet_rest import Client as MailjetClient
from app.utils.gen_email import _gen_email

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_API_SECRET = os.getenv("MAILJET_API_SECRET")
MAILJET_FROM_EMAIL = os.getenv("MAILJET_FROM_EMAIL")

mailjet_client = MailjetClient(auth=(MAILJET_API_KEY, MAILJET_API_SECRET), version='v3.1')
logger = logging.getLogger("uvicorn")
async def send_email(email_content:dict):
    logger.warning("email triggered")
    htmlContent = _gen_email(msg=email_content.get("body"),client="Father Touchboys")

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
                            "Name": "Father Touchboys"
                        }
                    ],
                    "Subject": email_content.get("subject"),
                    
                    "HTMLPart":htmlContent
                    

                }
            ]
        }
        response = mailjet_client.send.create(data=data)
        logger.warning(response)
        logger.warning(f"Email sent to {email_content.get("email")}: {email_content.get("subject")}")
    except Exception as e:
        print(f"Failed to send email: {e}")