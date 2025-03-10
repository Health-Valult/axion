from pymongo import MongoClient
from app.models.logs import*
URL = "mongodb+srv://TestAxionAdmin:YRmx2JtrK44FDLV@axion-test-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"

DBClient = MongoClient(URL)
Database = DBClient.get_database("logs_db")
ErrorCollection = Database.get_collection("errors")
GeneralCollection = Database.get_collection("general")
LoginCollection = Database.get_collection("logins")
SiginupCollection = Database.get_collection("signups")

async def log_event(event:dict)->None:
    print(event)
    event_type = event.get("type")
    data:dict = event.get("body")

    if event_type == "error":
        log = ErrorLog(
            sender=data.get("sender"),
            type=data.get("type"),
            description=data.get("description")
        )
        jsonLog = log.model_dump()
        ErrorCollection.insert_one(jsonLog)

    if event_type == "login":
        log = LoginLog(
            user=data.get("user"),
            ip=data.get("ip")
        )
        jsonLog = log.model_dump()
        LoginCollection.insert_one(jsonLog)

    if event_type == "signup":
        log = SignupLog(
            user=data.get("user"),
        )
        jsonLog = log.model_dump()
        SiginupCollection   .insert_one(jsonLog)

    if event_type == "general":
        print("general")
        log = GeneralLog(
            service=data.get("service"),
            endpoint=data.get("endpoint"),
            requester=data.get("requester"),
            type=data.get("type"),
            responseCode=data.get("responseCode")
        )
        jsonLog = log.model_dump()
        GeneralCollection.insert_one(jsonLog)