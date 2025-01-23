import uuid
from typing import Any

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey,
    func,
    ARRAY,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import relationship


@as_declarative()
class Base:
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


class Reservation(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    date = Column(DateTime, index=True)
    name = Column(String)
    table = Column(String)
    people = Column(Integer)
    is_water_pipe = Column(Boolean)
    hints = Column(String, nullable=True)
    is_reservation_done = Column(Boolean)


class Task(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    day = Column(Integer, index=True)
    description = Column(String)

    todos = relationship("Todo", back_populates="task")


class Todo(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    date = Column(DateTime, index=True)
    done = Column(Boolean)

    task_id = Column(UUID(as_uuid=True), ForeignKey("task.id"))
    task = relationship("Task", back_populates="todos")


class Inventory(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name = Column(String, index=True, unique=True)
    aliases = Column(ARRAY(String), nullable=True)
    # disabled = Column(Boolean, default=False)
    register_code = Column(String)

    price_default = Column(Integer, nullable=True)
    price_gaiwan = Column(Integer, nullable=True)
    price_package = Column(Integer, nullable=True)
    price_bulk = Column(Integer, nullable=True)
    price_gongfu = Column(Integer, nullable=True)

    old_id = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), onupdate=func.now(), server_default=func.now()
    )


class Item(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    type = Column(String)
    quantity = Column(Integer)

    order_id = Column(UUID(as_uuid=True), ForeignKey("order.id"))
    order = relationship("Order", back_populates="items")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), onupdate=func.now(), server_default=func.now()
    )

    # Legacy fields
    old_id = Column(String, nullable=True)
    price = Column(Integer, nullable=True)
    discounted_price = Column(Integer, nullable=True)
    name = Column(String, nullable=True)


class Order(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    discount = Column(Integer)
    is_discount_to_go = Column(Boolean)
    closed = Column(Boolean)
    table = Column(String)

    items = relationship(
        "Item",
        back_populates="order",
        lazy="joined",
        cascade="all, delete-orphan",
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), onupdate=func.now(), server_default=func.now()
    )

    # Legacy fields
    old_id = Column(String, nullable=True)
    sum = Column(Integer, nullable=True)
    discounted_sum = Column(Integer, nullable=True)


class User(Base):
    name = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    language = Column(String, nullable=False)
