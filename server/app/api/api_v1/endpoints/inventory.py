from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4, BaseModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/inventory", tags=["inventory"])


@router.get("/", response_model=List[schemas.Inventory])
def read_inventorys(
    db: Session = fastapi.Depends(get_db),
    skip: int = 0,
    limit: int = 1000,
) -> Any:
    """
    Retrieve inventorys.
    """
    inventorys = crud.inventory.get_multi(db, skip=skip, limit=limit)
    return inventorys


class Message(BaseModel):
    detail: str


@router.post(
    "/",
    response_model=schemas.Inventory,
    responses={
        400: {"model": Message},
    },
)
def create_inventory(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.inventory.InventoryCreate,
) -> Any:
    try:
        inventory = crud.inventory.create(db, obj_in=item_in)
    except IntegrityError as e:
        if "already exists." in str(e):
            return JSONResponse(
                status_code=400,
                content={"detail": "Entry with this name already exists."},
            )
        raise e

    return inventory


@router.get("/{id}", response_model=schemas.Inventory)
def read_inventory(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get inventory by ID.
    """
    inventory = crud.inventory.get(db=db, id=id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Item not found")
    return inventory


@router.put(
    "/{id}",
    response_model=schemas.Inventory,
    responses={
        400: {"model": Message},
    },
)
def update_inventory(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.InventoryUpdate,
) -> Any:
    """
    Update an inventory.
    """
    inventory = crud.inventory.get(db=db, id=id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Item not found")
    try:
        inventory = crud.inventory.update(db=db, db_obj=inventory, obj_in=item_in)
    except IntegrityError as e:
        if "already exists." in str(e):
            return JSONResponse(
                status_code=400,
                content={"detail": "Entry with this name already exists."},
            )
        raise e

    return inventory


@router.delete("/{id}", response_model=schemas.Inventory)
def delete_inventory(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an inventory.
    """

    inventory = crud.inventory.get(db=db, id=id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Item not found")
    inventory = crud.inventory.remove(db=db, id=id)
    return inventory
