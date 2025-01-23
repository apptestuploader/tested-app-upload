from typing import Callable

import pydantic
from fastapi import FastAPI
from fastapi.routing import APIRoute

from app.api.api_v1.api import api_router
from app.api.api_v1.endpoints.auth import require_cookie
from app.db.session import get_session


class AppSettings(pydantic.BaseSettings):
    auth: bool = True
    env: str = "dev"
    prefix: str = "/api"

    class Config:
        env_file = ".env"


def app_factory(settings: AppSettings = None) -> FastAPI:
    PROJECT_NAME = "tea-shop"

    get_session()

    def generate_unique_id(route: APIRoute):
        return f"{route.tags[0]}-{route.name}"

    app = FastAPI(
        title=PROJECT_NAME,
        openapi_url=f"/openapi.json",
        generate_unique_id_function=generate_unique_id,
    )

    if settings.auth:
        app.middleware(
            "http",
        )(require_cookie)

    app.include_router(api_router, prefix=settings.prefix)

    def update_openapi(openapi_content: dict) -> Callable[[], dict]:
        for path_data in openapi_content["paths"].values():
            for operation in path_data.values():
                tag = operation["tags"][0]
                operation_id = operation["operationId"]
                to_remove = f"{tag}-"
                new_operation_id = operation_id[len(to_remove) :]
                operation["operationId"] = new_operation_id

        def wrapper() -> dict:
            return openapi_content

        return wrapper

    app.openapi = update_openapi(openapi_content=app.openapi())

    return app
