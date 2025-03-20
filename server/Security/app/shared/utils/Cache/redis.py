import json
import time
from pydantic import BaseModel
import redis
import redis.asyncio as Rio
from datetime import datetime,timezone,timedelta
from typing import Literal,Optional
import uuid


class Body(BaseModel):
    task:str
    body:dict


class RedRequest(BaseModel):
    sender:str
    reciver:str
    id:str
    returnChannel:Optional[str]
    body:Body



class redis_AX:
    def __init__(self,host:str,connection:int,service:str):
        self.pool = redis.ConnectionPool.from_url(host,max_connections=connection)
        self.service = service

    def connect(self):
        self.r = redis.Redis(connection_pool=self.pool,retry_on_timeout=True)
        return self
    
    def get_token(self, token, ):
        pass

    def set_token(self, token:str, key:str, ttl:int, token_type:Literal["session","refresh","invalid"]):
        name = f"{token_type}::{key}"
        tokenLog = {
            "type":token_type,
            "timeStamp":datetime.now(tz=timezone.utc).isoformat(),
            "token":token
        }
        self.r.hset(
            name=name,
            mapping=tokenLog
        )
        self.r.expire(name=name, time=ttl*60)

    def validate_token(self,key:str, token_type:Literal["session","refresh"]):
        name = f"{token_type}::{key}"
        return bool(self.r.exists(name))
    
    def delete_token(self,key:str, token_type:Literal["session","refresh","invalid"]):
        name = f"{token_type}::{key}"
        self.r.delete(name)

    def set_item(self,name:str,payload:dict,ttl:int=None,):
        self.r.hset(
            name=name,
            mapping=payload
        )
        if ttl != None:
            self.r.expire(name=name, time=ttl*60)

    def get_item(self,name:str,):
        return self.r.hgetall(name=name)


    def scarletSender(self,channel:str,body:Body):
        message = RedRequest(
            sender=self.service,
            reciver=channel,
            id=str(uuid.uuid4()),
            body=body.model_dump()
        )

        self.r.publish(channel, message.model_dump_json())
        print(f"Published: {message}")


    def scarletSender_is_waiting(self,channel:str,body:Body):
        temp_channel = f"temp_channel_{uuid.uuid4().hex}"
        message = RedRequest(
            sender=self.service,
            reciver=channel,
            id=str(uuid.uuid4()),
            returnChannel=temp_channel,
            body=body.model_dump()
        )

        self.r.publish(channel, message.model_dump_json())

        waiting_channel = self.r.pubsub()
        waiting_channel.subscribe(temp_channel)
        start_time = time.time()
        timeout = 5
        print("u got here 1")
        for message in waiting_channel.get_message():
            print(message)
            message = json.loads(message)
            if message['type'] == 'message':
                data = message.get("data").decode("utf-8")
                response = RedRequest.model_validate_json(data)
                print("u got here")
                return response
                
            if time.time() - start_time > timeout:
                print("Timeout reached, stopping listener.")
                break 
        
        raise Exception("error is her")

    def disconnect(self):
        self.r.close()


