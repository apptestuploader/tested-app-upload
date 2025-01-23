import datetime
from typing import Optional

from pydantic import UUID4
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Order, Item
from app.schemas.order import OrderCreate, OrderUpdate, OrderWithItemsCreate


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def get(self, db: Session, id: UUID4) -> Optional[Order]:
        statement = select(self.model).where(self.model.id == id)
        return db.execute(statement).scalar()

    def create_with_items(self, db: Session, obj_in: OrderWithItemsCreate):
        db_obj = self.model(**obj_in.dict(exclude={"items"}))
        db_obj.items = [Item(**item_in.dict()) for item_in in obj_in.items]
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi(
        self,
        db: Session,
        *,
        skip: int | None,
        limit: int | None,
        date_from: datetime.date | None = None,
        date_to: datetime.date | None = None,
        date_offset: int = 120,
    ) -> list[Order]:
        filters = []
        if date_from is not None:
            datetime_from = datetime.datetime.combine(
                date_from, datetime.datetime.min.time()
            ) - datetime.timedelta(minutes=date_offset)
            filters.append(self.model.created_at > datetime_from)
        if date_to is not None:
            datetime_to = datetime.datetime.combine(
                date_to,
                datetime.datetime.max.time(),
            ) - datetime.timedelta(minutes=date_offset)
            filters.append(self.model.created_at < datetime_to)

        query = db.query(self.model).filter(*filters).offset(skip).limit(limit)
        return query.all()


order = CRUDOrder(Order)
