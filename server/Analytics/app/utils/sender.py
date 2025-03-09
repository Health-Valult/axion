import json
import time
from pika import BlockingConnection,ConnectionParameters
from pika import BasicProperties
from json import dumps
import uuid
class sendMQ:

    def __init__(self,host:str,service:str):
        self.service = service
        self.connection = BlockingConnection(
            ConnectionParameters(host=host,heartbeat=0))
        self.channel = self.connection.channel()

    def send(self,Qname:str,task:str,msg:dict):
        
        msg_obj = {
            "service":self.service,
            "id":f"{self.service}-{uuid.uuid4()}",
            "task":task,
            "data":msg
        }
        msg = dumps(msg_obj).encode("utf-8")
        self.channel.queue_declare(queue=Qname)
        self.channel.basic_publish(exchange='', routing_key=Qname, body=msg)

    def send_and_await(self,Qname:str,task:str,msg:dict):
        print("it works ur the problem")
        return_q = self.channel.queue_declare(queue='',exclusive=True).method.queue
        print(return_q)
        msg_obj = {
            "service":self.service,
            "id":f"{self.service}-{uuid.uuid4()}",
            "task":task,
            "data":msg
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
                    return(json.loads(body.decode("utf-8")))
            time.sleep(0.1)  
        raise Exception("Internal Server Error")

    def terminate_session(self):
        self.connection.close()
