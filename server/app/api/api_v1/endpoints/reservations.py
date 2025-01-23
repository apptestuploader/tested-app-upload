import datetime
from typing import Any, List

import fastapi
from fastapi import APIRouter, Depends, HTTPException
from pydantic import UUID4
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.session import get_db

router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.get("/", response_model=List[schemas.Reservation])
def read_reservations(
    db: Session = fastapi.Depends(get_db),
    skip: int = 0,
    limit: int = 1000,
    from_date: datetime.datetime = None,
) -> Any:
    """
    Retrieve reservations.
    """
    if from_date is None:
        from_date = datetime.datetime.now() - datetime.timedelta(minutes=20)

    reservations = crud.reservation.get_multi(
        db,
        skip=skip,
        limit=limit,
        from_date=from_date,
    )
    return reservations


@router.post("/", response_model=schemas.Reservation)
def create_reservation(
    *,
    db: Session = fastapi.Depends(get_db),
    item_in: schemas.reservation.ReservationCreate,
) -> Any:
    reservation = crud.reservation.create(db, obj_in=item_in)

    return reservation


@router.get("/{id}", response_model=schemas.Reservation)
def read_reservation(
    *,
    db: Session = fastapi.Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Get reservation by ID.
    """
    reservation = crud.reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Item not found")
    return reservation


@router.put("/{id}", response_model=schemas.Reservation)
def update_reservation(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
    item_in: schemas.ReservationUpdate,
) -> Any:
    """
    Update an reservation.
    """
    reservation = crud.reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Item not found")
    reservation = crud.reservation.update(db=db, db_obj=reservation, obj_in=item_in)
    return reservation


@router.delete("/{id}", response_model=schemas.Reservation)
def delete_reservation(
    *,
    db: Session = Depends(get_db),
    id: UUID4,
) -> Any:
    """
    Delete an reservation.
    """

    reservation = crud.reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(status_code=404, detail="Item not found")
    reservation = crud.reservation.remove(db=db, id=id)
    return reservation
