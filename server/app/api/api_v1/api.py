from fastapi import APIRouter

from app.api.api_v1.endpoints import (
    auth,
    items,
    reservations,
    tasks,
    todos,
    inventory,
    orders,
    sidecar,
)

api_router = APIRouter()

api_router.include_router(items.router)
api_router.include_router(reservations.router)
api_router.include_router(tasks.router)
api_router.include_router(todos.router)
api_router.include_router(inventory.router)
api_router.include_router(orders.router)
api_router.include_router(auth.router)
api_router.include_router(sidecar.router)
