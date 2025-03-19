import json
import logging
import time
from pika import BlockingConnection,ConnectionParameters
from pika.exceptions import AMQPConnectionError,ChannelWrongStateError
from pika import BasicProperties
from json import dumps
import uuid
from typing import Literal


logger = logging.getLogger("uvicorn")

class sendMQ:

    def __init__(self,host:str,service:str):
        self.service = service
        retries = 5
        for attempt in range(retries):
            try:
                logger.info("connecting to 🐇MQ...")
                self.connection = BlockingConnection(ConnectionParameters(host=host,heartbeat=0))
                break
                
            except AMQPConnectionError:   
                logger.info("unable to connect to rabbitMQ")
                time.sleep(1) 
                continue
        self.channel = self.connection.channel()
        



    def send(self,Qname:str,task:str,body:dict,type:Literal["request","response"],status:Literal["success","error"] = None, declare:bool=True):

    
        if type == "request":
            msg_obj = {
                "sender":self.service,
                "reciver":Qname,
                "id":f"{self.service}-{uuid.uuid4()}",
                "response":{
                    "task":task,
                    "body":body
                }
            }

        if type == "response" and status != None:
            msg_obj = {
                "sender":self.service,
                "reciver":Qname,
                "id":f"{self.service}-{uuid.uuid4()}",
                "status":status,
                "response":{
                    "task":task,
                    "body":body
                }
            },


        msg = dumps(msg_obj).encode("utf-8")
        if declare:
            self.channel.queue_declare(queue=Qname)
        self.channel.basic_publish(exchange='', routing_key=Qname, body=msg)

    def send_and_await(self,Qname:str,task:str,body:dict):
        while True:
            try:
                return_q = self.channel.queue_declare(queue='',exclusive=True).method.queue
                break
            except ChannelWrongStateError:
                self.channel = self.connection.channel()
                continue

        msg_obj = {
            "sender":self.service,
            "reciver":Qname,
            "id":f"{self.service}-{uuid.uuid4()}",
            "request":{
                "task":task,
                "body":body
            }
        }

        msg = dumps(msg_obj).encode("utf-8")
        self.channel.queue_declare(queue=Qname)
        self.channel.basic_publish(exchange='', routing_key=Qname, body=msg, properties=BasicProperties(
            reply_to=return_q
        ))

        timeout = 5
        start_time = time.time()
        while time.time() - start_time < timeout:
            method_frame, properties, body = self.channel.basic_get(queue=return_q, auto_ack=True)
            if method_frame:
                
                return(json.loads(body))
                    
            time.sleep(0.1)  
        

    def terminate_session(self):
        self.connection.close()
