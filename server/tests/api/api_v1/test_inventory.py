from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import Inventory
from tests.conftest import TestSettings
from tests.utils.utils import jsonize, random_lower_string

API_V1_STR = TestSettings().prefix


def test_create_inventory(client: TestClient, db: Session) -> None:
    data = {
        "name": random_lower_string(),
        "register_code": "F4",
        "price_default": 1200,
        "price_gaiwan": 900,
        "price_package": 10000,
        "price_bulk": 100,
        "price_gongfu": 1500,
    }
    response = client.post(
        f"{API_V1_STR}/inventory/",
        json=data,
    )

    assert response.status_code == 200
    content = response.json()
    assert content["name"] == data["name"]
    assert content["registerCode"] == data["register_code"]
    assert content["priceDefault"] == data["price_default"]
    assert content["priceGaiwan"] == data["price_gaiwan"]
    assert content["pricePackage"] == data["price_package"]
    assert content["priceBulk"] == data["price_bulk"]
    assert "id" in content


def test_read_inventory(
    client: TestClient, db: Session, inventory: models.Inventory
) -> None:
    response = client.get(
        f"{API_V1_STR}/inventory/{inventory.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Inventory, inventory) == content


def test_read_multi_inventory(
    client: TestClient,
    db: Session,
) -> None:
    response = client.get(f"{API_V1_STR}/inventory/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()

    assert len(content) > 0


def test_delete_inventory(
    client: TestClient,
    db: Session,
    inventory: models.Inventory,
) -> None:
    response = client.delete(
        f"{API_V1_STR}/inventory/{inventory.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Inventory, inventory) == content

    item_found = client.get(f"{API_V1_STR}/inventory/{inventory.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_inventory(
    client: TestClient,
    db: Session,
    inventory: models.Inventory,
) -> None:
    inventory.name = random_lower_string()
    inventory.price_default = 10000
    response = client.put(
        f"{API_V1_STR}/inventory/{inventory.id}", json=jsonable_encoder(inventory)
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Inventory, inventory) == content
