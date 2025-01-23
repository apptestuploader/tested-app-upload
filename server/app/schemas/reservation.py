import datetime
from typing import Optional

from pydantic import UUID4

from .base import BaseSchema


class ReservationBase(BaseSchema):
    date: Optional[datetime.datetime] = None
    name: Optional[str] = None
    table: Optional[str] = None
    people: Optional[int] = None
    is_water_pipe: Optional[bool] = None
    hints: Optional[str] = None
    is_reservation_done: Optional[bool] = None


class ReservationCreate(ReservationBase):
    date: datetime.datetime
    name: str
    table: str
    is_water_pipe: Optional[bool] = False
    is_reservation_done: Optional[bool] = False


# Properties to receive on item update
class ReservationUpdate(ReservationBase):
    pass


class ReservationInDBBase(ReservationBase):
    id: UUID4
    date: datetime.datetime
    name: str
    table: str
    is_water_pipe: Optional[bool] = False
    is_reservation_done: Optional[bool] = False

    class Config:
        orm_mode = True


class Reservation(ReservationInDBBase):
    pass


# Properties properties stored in DB
class ReservationInDB(ReservationInDBBase):
    pass
