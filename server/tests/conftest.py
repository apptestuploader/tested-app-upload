from typing import Generator

import pydantic
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.app_factory import app_factory, AppSettings

pytest_plugins = (
    "tests.fixtures.schemas",
    "tests.fixtures.models",
)


class TestSettings(AppSettings):
    auth: bool = False
    env: str = "test"
    prefix: str = "/api"
    database_url: str = pydantic.Field(envirionment="TEST_DB")


@pytest.fixture(scope="session")
def db() -> Generator:
    session = test_session()()
    yield session
    session.close()


def test_session() -> sessionmaker:
    engine = create_engine(
        TestSettings().database_url,
    )

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return SessionLocal


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(
        app_factory(settings=TestSettings()),
    ) as c:
        yield c
