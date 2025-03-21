import json
import logging
import time
from pika import BlockingConnection,ConnectionParameters
from pika.exceptions import AMQPConnectionError,ChannelWrongStateError
from pika import BasicProperties
from json import dumps
import uuid
from typing import Literal
import redis
import aio_pika


logger = logging.getLogger("uvicorn")

class sendMQ:

    def __init__(self,host:str,service:str):
        self.service = service
        retries = 5
        for attempt in range(retries):
            try:
                logger.info("connecting to 🐇MQ...")
                self.connection = BlockingConnection(ConnectionParameters(host=host,heartbeat=60))
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
        retries = 3
        for _ in range(retries):
            try:
                return_q = self.channel.queue_declare(queue='',exclusive=True).method.queue
                break
            except ChannelWrongStateError:
                self.channel = self.connection.channel()
                continue
        else:
            raise Exception("unable to declae return queue")

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

        response = None

        def callback(ch, method, properties, body):
            nonlocal response
            response = json.loads(body)
            ch.basic_ack(delivery_tag=method.delivery_tag)

        self.channel.basic_consume(queue=return_q, on_message_callback=callback, auto_ack=False)


        timeout = 5
        start_time = time.time()
        while time.time() - start_time < timeout:
            self.connection.process_data_events(time_limit=1)
            if response:
                return response
        

    def terminate_session(self):
        self.connection.close()




