from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import Item
from app.schemas.item import ItemCreate
from tests.conftest import TestSettings
from tests.utils.utils import (
    random_integer,
    random_lower_string,
    jsonize,
)

API_V1_STR = TestSettings().prefix


def test_create_item(
    client: TestClient,
    db: Session,
    inventory: models.Inventory,
    order,
    item_in: ItemCreate,
) -> None:
    response = client.post(
        f"{API_V1_STR}/items/",
        data=item_in.json(),
    )
    assert response.status_code == 200
    content = response.json()
    assert content["quantity"] == item_in.quantity
    assert content["type"] == item_in.type
    assert content["orderId"] == str(order.id)
    assert "id" in content


def test_read_item(
    client: TestClient,
    db: Session,
    item,
) -> None:
    response = client.get(
        f"{API_V1_STR}/items/{item.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Item, item) == content


def test_read_multi_item(
    client: TestClient,
    db: Session,
) -> None:
    response = client.get(f"{API_V1_STR}/items/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()

    assert len(content) > 0


def test_delete_item(client: TestClient, db: Session, item: models.Item) -> None:
    response = client.delete(
        f"{API_V1_STR}/items/{item.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Item, item) == content

    item_found = client.get(f"{API_V1_STR}/items/{item.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_item(
    client: TestClient,
    db: Session,
    item: models.Item,
) -> None:
    item.quantity = random_integer()
    item.type = random_lower_string()
    response = client.put(f"{API_V1_STR}/items/{item.id}", json=jsonable_encoder(item))
    assert response.status_code == 200
    content = response.json()

    parsed_input = jsonize(Item, item)
    del parsed_input["updatedAt"]
    del content["updatedAt"]
    assert parsed_input == content
