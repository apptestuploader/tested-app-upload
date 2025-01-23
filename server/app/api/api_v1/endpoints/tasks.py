from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[schemas.Task])
def read_tasks(
    db: Session = fastapi.Depends(get_db),
    skip: int = 0,
    limit: int = 1000,
) -> Any:
    """
    Retrieve tasks.
    """
    tasks = crud.task.get_multi(db, skip=skip, limit=limit)
    return tasks


@router.post("/", response_model=schemas.Task)
def create_task(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.task.TaskCreate,
) -> Any:
    task = crud.task.create(db, obj_in=item_in)

    return task


@router.get("/{id}", response_model=schemas.Task)
def read_task(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get task by ID.
    """
    task = crud.task.get(db=db, id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Item not found")
    return task


@router.put("/{id}", response_model=schemas.Task)
def update_task(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.TaskUpdate,
) -> Any:
    """
    Update an task.
    """
    task = crud.task.get(db=db, id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Item not found")
    task = crud.task.update(db=db, db_obj=task, obj_in=item_in)
    return task


@router.delete("/{id}", response_model=schemas.Task)
def delete_task(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an task.
    """

    task = crud.task.get(db=db, id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Item not found")
    task = crud.task.remove(db=db, id=id)
    return task
