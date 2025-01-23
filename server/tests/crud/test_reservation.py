import datetime

from sqlalchemy.orm import Session

from app import crud
from app.schemas.reservation import ReservationCreate, ReservationUpdate
from tests.utils.utils import (
    random_lower_string,
    random_integer,
    random_bool,
    random_date,
)


def test_create_reservation(db: Session) -> None:
    date = datetime.datetime.now()
    name = "Thomas"
    table = "c%7"
    people = 3
    is_water_pipe = False
    hints = ""
    is_reservation_done = False

    item_in = ReservationCreate(
        date=date,
        name=name,
        table=table,
        people=people,
        is_water_pipe=is_water_pipe,
        hints=hints,
        is_reservation_done=is_reservation_done,
    )
    reservation = crud.reservation.create(db=db, obj_in=item_in)
    assert reservation.date == date
    assert reservation.name == name
    assert reservation.table == table
    assert reservation.people == people
    assert reservation.is_water_pipe == is_water_pipe
    assert reservation.hints == hints
    assert reservation.is_reservation_done == is_reservation_done


def test_get_reservation(db: Session) -> None:
    date = random_date()
    name = random_lower_string()
    table = random_lower_string()
    people = random_integer()
    is_water_pipe = random_bool()
    hints = random_lower_string()
    is_reservation_done = random_bool()

    item_in = ReservationCreate(
        date=date,
        name=name,
        table=table,
        people=people,
        is_water_pipe=is_water_pipe,
        hints=hints,
        is_reservation_done=is_reservation_done,
    )
    reservation = crud.reservation.create(db=db, obj_in=item_in)
    stored_reservation = crud.reservation.get(db=db, id=reservation.id)
    assert stored_reservation
    assert reservation.date == stored_reservation.date
    assert reservation.name == stored_reservation.name
    assert reservation.table == stored_reservation.table
    assert reservation.people == stored_reservation.people
    assert reservation.is_water_pipe == stored_reservation.is_water_pipe
    assert reservation.hints == stored_reservation.hints
    assert reservation.is_reservation_done == stored_reservation.is_reservation_done


def test_update_reservation(db: Session) -> None:
    date = random_date()
    name = random_lower_string()
    table = random_lower_string()
    people = random_integer()
    is_water_pipe = random_bool()
    hints = random_lower_string()
    is_reservation_done = random_bool()

    item_in = ReservationCreate(
        date=date,
        name=name,
        table=table,
        people=people,
        is_water_pipe=is_water_pipe,
        hints=hints,
        is_reservation_done=is_reservation_done,
    )
    reservation = crud.reservation.create(db=db, obj_in=item_in)
    name2 = random_lower_string()
    reservation_update = ReservationUpdate(name=name2)
    updated_reservation = crud.reservation.update(
        db=db, db_obj=reservation, obj_in=reservation_update
    )
    assert reservation.id == updated_reservation.id
    assert reservation.date == updated_reservation.date
    assert updated_reservation.name == name2
    assert reservation.table == updated_reservation.table
    assert reservation.people == updated_reservation.people
    assert reservation.is_water_pipe == updated_reservation.is_water_pipe
    assert reservation.hints == updated_reservation.hints
    assert reservation.is_reservation_done == updated_reservation.is_reservation_done


def test_delete_reservation(db: Session) -> None:
    date = random_date()
    name = random_lower_string()
    table = random_lower_string()
    people = random_integer()
    is_water_pipe = random_bool()
    hints = random_lower_string()
    is_reservation_done = random_bool()

    item_in = ReservationCreate(
        date=date,
        name=name,
        table=table,
        people=people,
        is_water_pipe=is_water_pipe,
        hints=hints,
        is_reservation_done=is_reservation_done,
    )
    reservation = crud.reservation.create(db=db, obj_in=item_in)
    removed_reservation = crud.reservation.remove(db=db, id=reservation.id)
    found_reservation = crud.reservation.get(db=db, id=reservation.id)

    assert found_reservation is None
    assert removed_reservation.id == reservation.id
    assert removed_reservation.date == date
    assert removed_reservation.name == name
    assert removed_reservation.table == table
    assert removed_reservation.people == people
    assert removed_reservation.is_water_pipe == is_water_pipe
    assert removed_reservation.hints == hints
    assert removed_reservation.is_reservation_done == is_reservation_done
