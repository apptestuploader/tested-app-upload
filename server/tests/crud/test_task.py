from sqlalchemy.orm import Session

from app import crud
from app.schemas.task import TaskCreate, TaskUpdate
from tests.utils.utils import (
    random_lower_string,
    random_weekday_number,
)


def test_create_task(db: Session) -> None:
    day = random_weekday_number()
    description = random_lower_string()

    item_in = TaskCreate(day=day, description=description)
    task = crud.task.create(db=db, obj_in=item_in)
    assert task.day == day
    assert task.description == description


def test_get_task(db: Session) -> None:
    day = random_weekday_number()
    description = random_lower_string()
    item_in = TaskCreate(
        day=day,
        description=description,
    )
    task = crud.task.create(db=db, obj_in=item_in)
    stored_task = crud.task.get(db=db, id=task.id)
    assert stored_task
    assert task == stored_task


def test_update_task(db: Session) -> None:
    day = random_weekday_number()
    description = random_lower_string()
    item_in = TaskCreate(
        day=day,
        description=description,
    )

    task = crud.task.create(db=db, obj_in=item_in)
    description2 = random_lower_string()
    task_update = TaskUpdate(description=description2)
    updated_task = crud.task.update(db=db, db_obj=task, obj_in=task_update)
    assert task.id == updated_task.id
    assert task.day == updated_task.day
    assert updated_task.description == description2


def test_delete_task(db: Session) -> None:
    day = random_weekday_number()
    description = random_lower_string()
    item_in = TaskCreate(
        day=day,
        description=description,
    )

    task = crud.task.create(db=db, obj_in=item_in)

    removed_task = crud.task.remove(db=db, id=task.id)
    found_task = crud.task.get(db=db, id=task.id)
    assert found_task is None
    assert removed_task == task
