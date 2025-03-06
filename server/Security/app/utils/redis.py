import redis
from datetime import datetime,timezone,timedelta
from typing import Literal
import uuid

class redis_AX:
    def __init__(self,host:str,connection:int):
        self.pool = redis.ConnectionPool.from_url(host,max_connections=connection)

    def connect(self):
        self.r = redis.Redis(connection_pool=self.pool)
        return self
    
    def get_token(self, token, ):
        pass

    def set_token(self, token:str, id:bytes, ttl:int, token_type:Literal["session","refresh"]):
        name = f"{token_type}::{str(uuid.UUID(bytes=id))}"
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

    def validate_token(self,user):
        return bool(self.r.exists(name=user) and self.r.ttl(user) > 0)

    def disconnect(self):
        self.r.close()