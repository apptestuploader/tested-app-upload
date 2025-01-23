import datetime

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Reservation
from app.schemas.reservation import ReservationCreate, ReservationUpdate


class CRUDReservation(CRUDBase[Reservation, ReservationCreate, ReservationUpdate]):
    def get_multi(
        self,
        db: Session,
        *,
        from_date: datetime.datetime,
        skip: int = 0,
        limit: int = 100,
    ) -> list[Reservation]:
        filters = []
        filters.append(self.model.date > from_date)

        query = db.query(self.model).filter(*filters).offset(skip).limit(limit)

        return query.all()


reservation = CRUDReservation(Reservation)
