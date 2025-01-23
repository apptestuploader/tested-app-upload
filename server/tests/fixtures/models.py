import pytest
from app.schemas.inventory import InventoryCreate
from sqlalchemy.orm import Session

from app import crud
from app import models
from app.schemas.order import OrderCreate
from app.schemas.task import TaskCreate
from app.schemas.todo import TodoCreate


@pytest.fixture()
def inventory(
    db: Session,
    inventory_in: InventoryCreate,
) -> models.Inventory:
    return crud.inventory.create(
        db=db,
        obj_in=inventory_in,
    )


@pytest.fixture()
def item(
    db: Session,
    item_in,
) -> models.Item:
    return crud.item.create(db=db, obj_in=item_in)


@pytest.fixture()
def order(
    db: Session,
    order_in: OrderCreate,
) -> models.Order:
    return crud.order.create(
        db=db,
        obj_in=order_in,
    )


@pytest.fixture()
def todo(
    db: Session,
    todo_in: TodoCreate,
    task: models.Task,
) -> models.Todo:
    return crud.todo.create_with_task(
        db=db,
        obj_in=todo_in,
        task_id=task.id,
    )


@pytest.fixture()
def task(
    db: Session,
    task_in: TaskCreate,
) -> models.Task:
    return crud.task.create(
        db=db,
        obj_in=task_in,
    )


@pytest.fixture()
def reservation(
    db: Session,
    reservation_in,
) -> models.Reservation:
    return crud.reservation.create(
        db=db,
        obj_in=reservation_in,
    )
