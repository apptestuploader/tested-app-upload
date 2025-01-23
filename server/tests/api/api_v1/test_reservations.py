import datetime

from fastapi.encoders import jsonable_encoder
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import Reservation
from tests.conftest import TestSettings
from tests.utils.utils import random_date, compare_dates, jsonize

API_V1_STR = TestSettings().prefix


def test_create_reservation(client: TestClient, db: Session) -> None:
    data = {
        "date": random_date().__str__(),
        "name": "Thomas",
        "table": "K3",
        "people": 75,
        "is_water_pipe": True,
        "hints": "be nice :)",
        "is_reservation_done": False,
    }
    response = client.post(
        f"{API_V1_STR}/reservations/",
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert compare_dates(content["date"], data["date"])

    assert content["name"] == data["name"]
    assert content["table"] == data["table"]
    assert content["people"] == data["people"]
    assert content["isWaterPipe"] == data["is_water_pipe"]
    assert content["hints"] == data["hints"]
    assert content["isReservationDone"] == data["is_reservation_done"]
    assert "id" in content


def test_read_reservation(
    client: TestClient,
    db: Session,
    reservation: models.Reservation,
) -> None:
    response = client.get(
        f"{API_V1_STR}/reservations/{reservation.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Reservation, reservation) == content


def test_read_multi_reservation(client: TestClient, db: Session) -> None:
    response = client.get(f"{API_V1_STR}/reservations/", params={"skip": 0})
    assert response.status_code == 200
    content = response.json()
    assert len(content) > 0


def test_delete_reservation(
    client: TestClient,
    db: Session,
    reservation: models.Reservation,
) -> None:
    response = client.delete(
        f"{API_V1_STR}/reservations/{reservation.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert (
        datetime.datetime.strptime(
            content["date"],
            "%Y-%m-%dT%H:%M:%S.%f",
        )
        == reservation.date
    )
    assert jsonize(Reservation, reservation) == content

    item_found = client.get(f"{API_V1_STR}/reservations/{reservation.id}")
    assert item_found.json() == {"detail": "Item not found"}


def test_update_reservation(
    client: TestClient,
    db: Session,
    reservation: models.Reservation,
) -> None:
    reservation.is_reservation_done = True
    reservation.name = "Thomas"
    response = client.put(
        f"{API_V1_STR}/reservations/{reservation.id}",
        json=jsonable_encoder(reservation),
    )
    assert response.status_code == 200
    content = response.json()
    assert jsonize(Reservation, reservation) == content
