import datetime

import pytest

from app.models import models
from app.schemas.inventory import InventoryCreate
from app.schemas.item import ItemCreate
from app.schemas.order import OrderCreate
from app.schemas.reservation import ReservationCreate
from app.schemas.task import TaskCreate, Weekday
from app.schemas.todo import TodoCreate
from tests.utils.utils import random_integer, random_lower_string


@pytest.fixture()
def inventory_in() -> InventoryCreate:

    return InventoryCreate(
        name=random_lower_string(),
        register_code="7",
        price_default=2480,
        price_gaiwan=2180,
        price_package=0,
        price_bulk=150,
        price_gongfu=10000,
    )


@pytest.fixture()
def item_in(
    order: models.Order,
) -> ItemCreate:
    quantity = random_integer()
    type = random_lower_string()
    name = random_lower_string()
    price = random_integer()
    discounted_price = random_integer()
    return ItemCreate(
        name=name,
        price=price,
        discounted_price=discounted_price,
        type=type,
        quantity=quantity,
        order_id=order.id,
    )


@pytest.fixture()
def order_in() -> OrderCreate:
    discount = 7
    is_discount_to_go = False
    closed = False
    table = "k1"
    created_at = datetime.datetime.now()

    return OrderCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
    )


@pytest.fixture()
def todo_in() -> TodoCreate:
    date = datetime.datetime.now()
    done = False
    return TodoCreate(date=date, done=done)


@pytest.fixture()
def task_in() -> TaskCreate:
    day = Weekday.friday.value
    description = "Vaccum cleaning."
    return TaskCreate(
        day=day,
        description=description,
    )


@pytest.fixture()
def reservation_in() -> ReservationCreate:
    date = datetime.datetime.now()
    name = "Alex"
    table = "m7"
    people = 2
    is_water_pipe = False
    hints = None
    is_reservation_done = False

    return ReservationCreate(
        date=date,
        name=name,
        table=table,
        people=people,
        is_water_pipe=is_water_pipe,
        hints=hints,
        is_reservation_done=is_reservation_done,
    )
