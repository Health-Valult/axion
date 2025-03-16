import redis
from datetime import datetime,timezone,timedelta
from typing import Literal
import uuid

class redis_AX:
    def __init__(self,host:str,connection:int):
        self.pool = redis.ConnectionPool.from_url(host,max_connections=connection)

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


    def disconnect(self):
        self.r.close()