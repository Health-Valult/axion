import redis
from datetime import datetime,timezone,timedelta
from typing import Literal

class redis_AX:
    def __init__(self,host:str,connection:int):
        self.pool = redis.ConnectionPool.from_url(host,max_connections=connection)

    def connect(self):
        self.r = redis.Redis(connection_pool=self.pool)
        return self
    
    def get_token(self, token, ):
        pass

    def set_token(self, token, id, ttl:int, token_type:Literal["session","refresh"]):
        
        tokenLog = {
            "type":token_type,
            "timeStamp":datetime.now(tz=timezone.utc),
            "token":token
        }
        self.r.hset(
            name=id,
            mapping=tokenLog
        )
        self.r.expire(name=id, time=timedelta(min=ttl))

    def validate_token(self,user):
        return bool(self.r.exists(name=user) and self.r.ttl(user) > 0)

    def disconnect(self):
        self.r.close()