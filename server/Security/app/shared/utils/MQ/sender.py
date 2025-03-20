import json
import logging
import time
from pika import BlockingConnection,ConnectionParameters
from pika.exceptions import AMQPConnectionError
from pika import BasicProperties
from json import dumps
import uuid
from typing import Callable, Literal

from redis import Redis

from app.shared.utils.MQ.reciver import RedRequest, RedResponse,Body

logger = logging.getLogger("uvicorn")




def scarletSender(host:str,channel:str):

    connection = Redis(host=host,retry_on_timeout=True)
    
    bo = Body(
        task="sessionAuth",
        body={
            "token":"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJheGlvbjo6c2VjdXJpdHk6OmF1dGg6OmxvZ2luOjpwYXRpZW50OjpzZXNzaW9uIiwic3ViIjoiMmNkOTkxNmYtNjdlMi01ZWExLTk5NzEtN2E0ODgyMzljODNmIiwiaWF0IjoxNzQyMzYxMzM3LCJuYmYiOjE3NDIzNjEzMzcsImV4cCI6MTc0MjM2NDkzNywicm9sZSI6InBhdGllbnQifQ.YDclN7K6yQBk_43zRRrdPTJxtLyy3freAmoilUCh9CGvdgvmdQoaTKPgeUKMCn1NnIcbbCkbIC1s7dwyH6YTJA1Atnm5qIU6rClV0Y4xDY7uOQ7BReZFPPoN2DK-APRxevRMxwplVmxed9M-2g8tKWucNjVZKRt0Ic4wAI3nDfUWgZfV2UGIlELWkFJ-qKKHdfwyiu4RKklP0GH0Um5WnS---qe3vtU9WgL4xXXI8Gry_B7ZeRd_LWOtQr0UXMbH44tohAXpotBHYo95vA0Xmr2GIGmSkE1Et1OSQ8sLFlGRbsI8puSVQ1Hfh6nNSNDwb3jtcRzaOEJVRz_xBU8jhQ"
        }
    )
    message = RedRequest(
        sender="qwerty",
        reciver="qwerty",
        id="23467845890",
        body=bo
    )

    connection.publish(channel, message.model_dump_json())
    print(f"Published: {message}")
    


scarletSender("localhost",'security')