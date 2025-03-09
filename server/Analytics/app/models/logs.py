from pydantic import BaseModel
import datetime

class LogMessage(BaseModel):
    Requester: str
    token: str
    body: str
    timeStamp: datetime.datetime