import json
from typing import Literal

import fastapi
from starlette.websockets import WebSocket

router = fastapi.APIRouter(
    prefix="/sidecar",
    tags=["sidecar"],
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {
            "sidecar": [],
            "mom": [],
        }

    async def connect(
        self,
        websocket: WebSocket,
        role: Literal["mom", "sidecar"],
    ):
        await websocket.accept()

        try:
            self.active_connections[role].append(websocket)
        except KeyError:
            raise ValueError(f"Invalid role: {role}")

        if role == "mom":
            await self.update_on_sidecars(
                websocket,
                bool(self.active_connections["sidecar"]),
            )

        if role == "sidecar" and len(self.active_connections["sidecar"]) == 1:
            for mom in self.active_connections["mom"]:
                await self.update_on_sidecars(mom, True)

    @staticmethod
    async def update_on_sidecars(websocket: WebSocket, content: bool):
        await websocket.send_text(
            json.dumps({"category": "any sidecars", "content": content})
        )

    async def disconnect(
        self,
        websocket: WebSocket,
        role: Literal["mom", "sidecar"],
    ):
        try:
            self.active_connections[role].remove(websocket)
        except KeyError:
            raise ValueError(f"Invalid role: {role}")
        except ValueError:
            pass

        if role == "sidecar" and not self.active_connections["sidecar"]:
            for mom in self.active_connections["mom"]:
                await self.update_on_sidecars(mom, False)

    async def report(
        self,
        message: str,
    ):
        for connection in self.active_connections["mom"]:
            await connection.send_text(message)

    async def broadcast(
        self,
        message: str,
    ):
        for connection in self.active_connections["sidecar"]:
            await connection.send_text(message)


manager = ConnectionManager()


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: fastapi.WebSocket,
    role: Literal["mom", "sidecar"],
):

    await manager.connect(websocket=websocket, role=role)
    try:
        while True:
            data = await websocket.receive_text()
            if role == "mom":
                await manager.broadcast(data)
            elif role == "sidecar":
                await manager.report(data)
            else:
                raise ValueError(f"Invalid role: {role}")

    except fastapi.WebSocketDisconnect:
        await manager.disconnect(websocket=websocket, role=role)
