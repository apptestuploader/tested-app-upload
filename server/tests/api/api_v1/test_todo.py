from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import Todo
from tests.conftest import TestSettings
from tests.utils.utils import random_date, compare_dates, jsonize

API_V1_STR = TestSettings().prefix


def test_create_todo(
    client: TestClient,
    db: Session,
    task: models.Task,
) -> None:
    data = {
        "date": random_date().__str__(),
        "done": False,
    }
    response = client.post(
        f"{API_V1_STR}/todos/{task.id}",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert compare_dates(content["date"], data["date"])
    assert content["done"] == data["done"]
    assert content["taskId"] == str(task.id)
    assert "id" in content


def test_read_todo(
    client: TestClient,
    db: Session,
    todo: models.Todo,
) -> None:
    response = client.get(
        f"{API_V1_STR}/todos/{todo.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Todo, todo) == content


def test_read_multi_todo(client: TestClient, db: Session) -> None:
    response = client.get(f"{API_V1_STR}/todos/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()

    assert len(content) > 0


def test_delete_todo(
    client: TestClient,
    db: Session,
    todo: models.Todo,
) -> None:
    response = client.delete(
        f"{API_V1_STR}/todos/{todo.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Todo, todo) == content

    item_found = client.get(f"{API_V1_STR}/todos/{todo.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_todo(
    client: TestClient,
    db: Session,
    todo: models.Todo,
) -> None:
    todo.done = True
    response = client.put(f"{API_V1_STR}/todos/{todo.id}", json=jsonable_encoder(todo))
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Todo, todo) == content
