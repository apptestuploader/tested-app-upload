import datetime
import json
import random
import string
from typing import Type

from pydantic import BaseModel

from app.models.models import Base
from app.schemas.task import Weekday


def random_lower_string() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))


def random_email() -> str:
    return f"{random_lower_string()}@{random_lower_string()}.com"


def random_integer() -> int:
    return random.randint(0, 200)


def random_bool() -> bool:
    return bool(random.randint(0, 1))


def random_date() -> datetime.datetime:
    start_date = datetime.datetime(2020, 1, 1)
    end_date = datetime.datetime(2020, 2, 1)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + datetime.timedelta(days=random_number_of_days)


def random_weekday_number() -> int:
    return random.choice(list(Weekday)).value


def compare_dates(actual_date: str, expected_date: str) -> bool:
    return datetime.datetime.strptime(
        actual_date, "%Y-%m-%dT%H:%M:%S"
    ) == datetime.datetime.strptime(expected_date, "%Y-%m-%d %H:%M:%S")


def jsonize(schema: Type[BaseModel], obj: Base) -> dict:
    return json.loads(schema.from_orm(obj).json(by_alias=True))  # TODO nasty
