from pika import BlockingConnection,ConnectionParameters
from json import dumps
class sendMQ:

    def __init__(self,host:str):
        self.connection = BlockingConnection(
            ConnectionParameters(host=host))
        self.channel = self.connection.channel()

    def send(self,Qname:str,msg:dict):
        msg = dumps(msg).encode("utf-8")
        self.channel.queue_declare(queue=Qname)
        self.channel.basic_publish(exchange='', routing_key=Qname, body=msg)
    
    def terminate_session(self):
        self.connection.close()
