import datetime
from typing import Optional

from pydantic import UUID4

from .base import BaseSchema


class ItemBase(BaseSchema):
    name: Optional[str] = None
    price: Optional[int] = None
    discounted_price: Optional[int] = None
    type: Optional[str] = None
    quantity: Optional[int] = None


class ItemInOrderCreate(ItemBase):
    name: str
    price: int
    discounted_price: int
    type: str
    quantity: int


class ItemCreate(ItemBase):
    name: str
    price: int
    discounted_price: int
    type: str
    quantity: int
    order_id: UUID4


# Properties to receive on item update
class ItemUpdate(ItemBase):
    pass


class ItemInDBBase(ItemBase):
    id: UUID4
    name: str
    price: int
    discounted_price: int

    type: str
    quantity: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    order_id: UUID4

    class Config:
        orm_mode = True


class Item(ItemInDBBase):
    pass


# Properties properties stored in DB
class ItemInDB(ItemInDBBase):
    pass
