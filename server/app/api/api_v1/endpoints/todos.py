from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=List[schemas.Todo])
def read_todos(
    db: Session = fastapi.Depends(get_db),
    skip: int = 0,
    limit: int = 1000,
) -> Any:
    """
    Retrieve todos.
    """
    todos = crud.todo.get_multi(db, skip=skip, limit=limit)
    return todos


@router.post("/{task_id}", response_model=schemas.Todo)
def create_todo(
    *,
    db: Session = fastapi.Depends(get_db),
    task_id: UUID4,
    item_in: schemas.todo.TodoCreate,
) -> Any:
    todo = crud.todo.create_with_task(db, obj_in=item_in, task_id=task_id)

    return todo


@router.get("/{id}", response_model=schemas.Todo)
def read_todo(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get todo by ID.
    """
    todo = crud.todo.get(db=db, id=id)
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")
    return todo


@router.put("/{id}", response_model=schemas.Todo)
def update_todo(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.TodoUpdate,
) -> Any:
    """
    Update an todo.
    """
    todo = crud.todo.get(db=db, id=id)
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")
    todo = crud.todo.update(db=db, db_obj=todo, obj_in=item_in)
    return todo


@router.delete("/{id}", response_model=schemas.Todo)
def delete_todo(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an todo.
    """

    todo = crud.todo.get(db=db, id=id)
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")
    todo = crud.todo.remove(db=db, id=id)
    return todo
