from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import Order
from app.schemas.item import ItemInOrderCreate
from app.schemas.order import OrderWithItemsCreate
from tests.conftest import TestSettings
from tests.utils.utils import random_date, jsonize, random_integer, random_lower_string

API_V1_STR = TestSettings().prefix


def test_create_order(client: TestClient, db: Session) -> None:
    data = {
        "discount": 20,
        "is_discount_to_go": True,
        "closed": False,
        "table": "K5",
        "created_at": random_date().__str__(),
    }
    response = client.post(
        f"{API_V1_STR}/orders/",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["discount"] == data["discount"]
    assert content["isDiscountToGo"] == data["is_discount_to_go"]
    assert content["closed"] == data["closed"]
    assert content["table"] == data["table"]
    assert "id" in content


def test_read_order(
    client: TestClient,
    db: Session,
    order: models.Order,
) -> None:
    response = client.get(
        f"{API_V1_STR}/orders/{order.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Order, order) == content


def test_read_multi_order(client: TestClient, db: Session) -> None:
    response = client.get(f"{API_V1_STR}/orders/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()

    assert len(content) > 0


def test_delete_order(
    client: TestClient,
    db: Session,
    order: models.Order,
) -> None:
    response = client.delete(
        f"{API_V1_STR}/orders/{order.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Order, order) == content

    item_found = client.get(f"{API_V1_STR}/orders/{order.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_order(
    client: TestClient,
    db: Session,
    order: models.Order,
) -> None:
    order.closed = True
    order.table = "k5"
    response = client.put(
        f"{API_V1_STR}/orders/{order.id}", json=jsonable_encoder(order)
    )
    assert response.status_code == 200
    content = response.json()

    parsed_input = jsonize(Order, order)
    del parsed_input["updatedAt"]
    del content["updatedAt"]
    assert parsed_input == content


def test_order_with_items_create(
    client: TestClient,
    db: Session,
) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()
    created_at = random_date()

    order_in = OrderWithItemsCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
        items=[
            ItemInOrderCreate(
                name=random_lower_string(),
                price=random_integer(),
                discounted_price=random_integer(),
                quantity=random_integer(),
                type=random_lower_string(),
            )
            for _ in range(5)
        ],
    )

    response = client.post(
        f"{API_V1_STR}/orders/submit",
        data=order_in.json(),
    )

    assert response.status_code == 200
    content = response.json()

    assert len(content["items"]) == 5
    assert "id" in content
    for item in content["items"]:
        assert "id" in item
