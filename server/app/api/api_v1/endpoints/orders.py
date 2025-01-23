import datetime
from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/", response_model=List[schemas.Order])
def read_orders(
    db: Session = fastapi.Depends(get_db),
    skip: int | None = None,
    limit: int | None = None,
    date_from: datetime.date | None = None,
    date_to: datetime.date | None = None,
) -> Any:
    """
    Retrieve orders.
    """
    orders = crud.order.get_multi(
        db,
        skip=skip,
        limit=limit,
        date_from=date_from,
        date_to=date_to,
    )
    return orders


@router.post("/", response_model=schemas.Order)
def create_order(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.order.OrderCreate,
) -> Any:
    order = crud.order.create(db, obj_in=item_in)

    return order


@router.post("/submit", response_model=schemas.Order)
def submit_order(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.order.OrderWithItemsCreate,
) -> Any:
    order = crud.order.create_with_items(db, obj_in=item_in)

    return order


@router.get("/{id}", response_model=schemas.Order)
def read_order(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get order by ID.
    """
    order = crud.order.get(db=db, id=id)
    if not order:
        raise HTTPException(status_code=404, detail="Item not found")
    return order


@router.put("/{id}", response_model=schemas.Order)
def update_order(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.OrderUpdate,
) -> Any:
    """
    Update an order.
    """
    order = crud.order.get(db=db, id=id)
    if not order:
        raise HTTPException(status_code=404, detail="Item not found")
    order = crud.order.update(db=db, db_obj=order, obj_in=item_in)
    return order


@router.delete("/{id}", response_model=schemas.Order)
def delete_order(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an order.
    """

    order = crud.order.get(db=db, id=id)
    if not order:
        raise HTTPException(status_code=404, detail="Item not found")
    order = crud.order.remove(db=db, id=id)
    return order
