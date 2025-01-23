from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=List[schemas.Item])
def read_items(
    db: Session = fastapi.Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve items.
    """
    items = crud.item.get_multi(db, skip=skip, limit=limit)
    return items


@router.post("/", response_model=schemas.Item)
def create_item(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.item.ItemCreate,
) -> Any:
    item = crud.item.create(
        db,
        obj_in=item_in,
    )

    return item


@router.get("/{id}", response_model=schemas.Item)
def read_item(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get item by ID.
    """
    item = crud.item.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put("/{id}", response_model=schemas.Item)
def update_item(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.ItemUpdate,
) -> Any:
    """
    Update an item.
    """
    item = crud.item.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item = crud.item.update(db=db, db_obj=item, obj_in=item_in)
    return item


@router.delete("/{id}", response_model=schemas.Item)
def delete_item(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an item.
    """
    item = crud.item.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item = crud.item.remove(db=db, id=id)
    return item
