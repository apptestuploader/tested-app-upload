import datetime
from typing import Optional

from pydantic import UUID4

from .base import BaseSchema


class TodoBase(BaseSchema):
    date: Optional[datetime.datetime]
    done: Optional[bool]


class TodoCreate(TodoBase):
    date: datetime.datetime
    done: bool


class TodoUpdate(TodoBase):
    pass


class TodoInDBBase(TodoBase):
    id: UUID4
    date: datetime.datetime
    done: bool
    task_id: UUID4

    class Config:
        orm_mode = True


class Todo(TodoInDBBase):
    pass


class TodoInDB(TodoInDBBase):
    pass
