from typing import Optional

from pydantic import UUID4, validator

from .base import BaseSchema


class InventoryBase(BaseSchema):
    name: Optional[str] = None
    register_code: Optional[str] = None
    price_default: Optional[int] = None
    price_gaiwan: Optional[int] = None
    price_package: Optional[int] = None
    price_bulk: Optional[int] = None
    price_gongfu: Optional[int] = None


class InventoryCreate(InventoryBase):
    name: str
    register_code: str
    price_default: int
    price_gaiwan: int
    price_package: int
    price_bulk: int
    price_gongfu: int


class InventoryUpdate(InventoryBase):
    pass


class InventoryInDBBase(InventoryBase):
    id: UUID4
    name: str
    register_code: str
    price_default: int
    price_gaiwan: int
    price_package: int
    price_bulk: int
    price_gongfu: int

    @validator("price_gongfu", pre=True)
    def handle_none_value(cls, value):
        if value is None:
            return 0
        return value

    class Config:
        orm_mode = True


class Inventory(InventoryInDBBase):
    pass


# Properties properties stored in DB
class InventoryInDB(InventoryInDBBase):
    pass
