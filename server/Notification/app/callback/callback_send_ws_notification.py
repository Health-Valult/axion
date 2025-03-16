from app.routes.WS import connected_clients
from fastapi.websockets import WebSocket

async def _send_ws_notification(body:dict):
    c_uuid = body.get("uuid")
    data_packet = body.get("data")

    socket_instance:WebSocket = connected_clients.get(c_uuid)

    await socket_instance.send_json(data=data_packet)