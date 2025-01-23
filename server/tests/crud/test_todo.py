from sqlalchemy.orm import Session

from app import crud
from app.models import models
from app.schemas.todo import TodoCreate, TodoUpdate
from tests.utils.utils import (
    random_date,
)


def test_create_todo(
    db: Session,
    task: models.Task,
) -> None:
    date = random_date()
    done = False
    item_in = TodoCreate(
        date=date,
        done=done,
    )
    todo = crud.todo.create_with_task(db=db, obj_in=item_in, task_id=task.id)
    assert todo.date == date
    assert todo.done == done
    assert todo.task_id == task.id


def test_get_todo(
    db: Session,
    task: models.Task,
) -> None:
    date = random_date()
    done = False
    item_in = TodoCreate(
        date=date,
        done=done,
    )
    todo = crud.todo.create_with_task(db=db, obj_in=item_in, task_id=task.id)
    stored_todo = crud.todo.get(db=db, id=todo.id)
    assert stored_todo
    assert todo == stored_todo


def test_update_todo(
    db: Session,
    task: models.Task,
) -> None:
    date = random_date()
    done = False
    item_in = TodoCreate(
        date=date,
        done=done,
    )
    todo = crud.todo.create_with_task(db=db, obj_in=item_in, task_id=task.id)
    done2 = True
    todo_update = TodoUpdate(done=done2)
    updated_todo = crud.todo.update(db=db, db_obj=todo, obj_in=todo_update)
    assert todo.id == updated_todo.id
    assert todo.date == updated_todo.date
    assert updated_todo.done == done2


def test_delete_reservation(
    db: Session,
    task: models.Task,
) -> None:
    date = random_date()
    done = False
    item_in = TodoCreate(
        date=date,
        done=done,
    )
    todo = crud.todo.create_with_task(db=db, obj_in=item_in, task_id=task.id)

    removed_todo = crud.todo.remove(db=db, id=todo.id)
    found_todo = crud.todo.get(db=db, id=todo.id)
    assert found_todo is None
    assert removed_todo == todo
