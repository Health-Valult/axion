from firebase_admin.messaging import Message,Notification,send
from firebase_admin.exceptions import FirebaseError
from pymongo import MongoClient


URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"


DBClient = MongoClient(URL)
Database = DBClient.get_database("notifications_db")
Collection = Database.get_collection("userDeviceTokens")


async def send_notification(token:str,msg:dict) -> str:
    body = msg.get("body")
    title = msg.get("title")

    client = Message(
        notification = Notification(
            title=title,
            body=body
        ),
        token=token
    )
    try:
        response = send(message=client)
        return response
    
    except FirebaseError:
        return "notification error"

async def _send_one(body:dict) -> str:
    c_uuid = body.get("UserID")
    msg = body.get("msg")
    tokens:dict = Collection.find_one({"_id":c_uuid})
    deviceTokens:list = tokens.get("token")

    if deviceTokens is None:
        raise Exception("No Device token available")

    for token in deviceTokens:
        return send_notification(token=token,msg=msg)


async def _send_all():
    pass


