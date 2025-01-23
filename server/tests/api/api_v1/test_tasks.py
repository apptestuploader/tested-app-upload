from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from tests.conftest import TestSettings

API_V1_STR = TestSettings().prefix


def test_create_task(client: TestClient, db: Session) -> None:
    data = {
        "day": 2,
        "description": "Wash the dishes",
    }
    response = client.post(
        f"{API_V1_STR}/tasks/",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["day"] == data["day"]
    assert content["description"] == data["description"]
    assert "id" in content


def test_read_task(
    client: TestClient,
    db: Session,
    task: models.Task,
) -> None:
    response = client.get(
        f"{API_V1_STR}/tasks/{task.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonable_encoder(task) == content


def test_read_multi_task(client: TestClient, db: Session) -> None:
    response = client.get(f"{API_V1_STR}/tasks/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()

    assert len(content) > 0


def test_delete_task(
    client: TestClient,
    db: Session,
    task: models.Task,
) -> None:
    response = client.delete(
        f"{API_V1_STR}/tasks/{task.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content == jsonable_encoder(task)

    item_found = client.get(f"{API_V1_STR}/tasks/{task.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_task(
    client: TestClient,
    db: Session,
    task: models.Task,
) -> None:
    task.day = 1 if task.day == 0 else 0
    task.description = "Some gibberish"
    response = client.put(f"{API_V1_STR}/tasks/{task.id}", json=jsonable_encoder(task))
    assert response.status_code == 200
    content = response.json()
    assert content == jsonable_encoder(task)
