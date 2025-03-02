from pika import BlockingConnection,ConnectionParameters
from json import dumps
import uuid
class sendMQ:

    def __init__(self,host:str,service:str):
        self.service = service
        self.connection = BlockingConnection(
            ConnectionParameters(host=host,heartbeat=0))
        self.channel = self.connection.channel()

    def send(self,Qname:str,msg:dict):
        msg_obj = {
            "service":self.service,
            "id":f"{self.service}-{uuid.uuid4()}",
            "data":msg
        }
        msg = dumps(msg_obj).encode("utf-8")
        self.channel.queue_declare(queue=Qname)
        self.channel.basic_publish(exchange='', routing_key=Qname, body=msg)
    
    def terminate_session(self):
        self.connection.close()
