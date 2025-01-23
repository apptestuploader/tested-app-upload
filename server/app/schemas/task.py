from enum import Enum
from typing import Optional

from pydantic import validator, UUID4

from .base import BaseSchema


class Weekday(Enum):
    sunday = 0
    monday = 1
    tuesday = 2
    wednesday = 3
    thursday = 4
    friday = 5
    saturday = 6


valid_weekdays = [weekday.value for weekday in list(Weekday)]


class TaskBase(BaseSchema):
    day: Optional[int]
    description: Optional[str]

    @validator("day")
    def day_must_be_in_range(cls, v: int) -> int:
        if v not in valid_weekdays:
            raise ValueError(f"Day has to be in range <0, 6>, was {v}")
        return v


class TaskCreate(TaskBase):
    day: int
    description: str


class TaskUpdate(TaskBase):
    pass


class TaskInDBBase(TaskBase):
    id: UUID4
    day: int
    description: str

    class Config:
        orm_mode = True


class Task(TaskInDBBase):
    pass


class TaskInDB(TaskInDBBase):
    pass
