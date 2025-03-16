import pika
import json
import requests
import threading
import time

FASTAPI_NOTIFICATION_URL = "http://127.0.0.1:8000/process-notification/"

# Retry Config
MAX_RETRIES = 3
RETRY_DELAY = 5 

def rabbitmq_callback(ch, method, properties, body):
    """Handle incoming RabbitMQ messages and forward to FastAPI"""
    notification = json.loads(body)
    print(f"Received from RabbitMQ: {notification}")

    success = False
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(FASTAPI_NOTIFICATION_URL, json=notification)
            if response.status_code == 200:
                print("Notification sent to WebSockets")
                success = True
                ch.basic_ack(delivery_tag=method.delivery_tag) 
                break
            else:
                print(f"Failed to send: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Retry {attempt + 1}/{MAX_RETRIES} - Error: {e}")
            time.sleep(RETRY_DELAY) 

    if not success:
        print("Sending to Dead Letter Queue (DLQ)")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def start_rabbitmq_listener():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # Declare Normal Queue
    channel.queue_declare(
        queue="notifications",
        arguments={"x-dead-letter-exchange": "", "x-dead-letter-routing-key": "notifications_dlq"}
    )

    # Declare Dead Letter Queue (DLQ)
    channel.queue_declare(queue="notifications_dlq")

    channel.basic_consume(queue="notifications", on_message_callback=rabbitmq_callback)

    print("Waiting for notifications...")
    channel.start_consuming()

rabbitmq_thread = threading.Thread(target=start_rabbitmq_listener, daemon=True)
rabbitmq_thread.start()

rabbitmq_thread.join()
