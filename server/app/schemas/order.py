import datetime
from typing import Optional

import pydantic
from pydantic import UUID4

from .base import BaseSchema
from .item import Item, ItemInOrderCreate


class OrderBase(BaseSchema):
    discount: Optional[int]
    is_discount_to_go: Optional[bool]
    closed: Optional[bool]
    table: Optional[str]


class OrderCreate(OrderBase):
    discount: int
    is_discount_to_go: bool
    closed: bool
    table: str


class OrderWithItemsCreate(OrderCreate):
    items: list[ItemInOrderCreate]
    created_at: datetime.datetime = pydantic.Field(alias="createdAt")


class OrderUpdate(OrderBase):
    pass


class OrderInDBBase(OrderBase):
    id: UUID4
    discount: int
    is_discount_to_go: bool
    closed: bool
    table: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    items: list[Item]

    class Config:
        orm_mode = True


class Order(OrderInDBBase):
    pass


class OrderInDB(OrderInDBBase):
    pass
