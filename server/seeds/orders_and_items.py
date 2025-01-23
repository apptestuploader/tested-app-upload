import datetime
from typing import Optional

from pydantic import Field
from sqlalchemy.orm import Session

from app.db.session import get_session
from app.models import models
from app.schemas.item import ItemInOrderCreate
from app.schemas.order import OrderCreate
from experiments import load_data
from experiments.items import preprocessing
from experiments.orders import preprocessing as order_preprocessing
from experiments.orders import schemas


class ItemSeed(ItemInOrderCreate):
    old_id: str = Field(alias="id")

    created_at: datetime.datetime
    updated_at: datetime.datetime


class OrderSeed(OrderCreate):
    old_id: str = Field(alias="id")
    discount: Optional[int]

    created_at: datetime.datetime
    updated_at: datetime.datetime

    items: list[ItemSeed]

    sum: int
    discounted_sum: int


def main():
    items = load_data.to_pandas(load_data.load(load_data.Files.items))
    items = preprocessing.main(items)

    orders = load_data.to_pandas(load_data.load(load_data.Files.orders))

    orders = order_preprocessing.main(orders)

    pydantic_orders = schemas.OrderBuilder(
        frame=orders, item_builder=schemas.ItemBuilder(frame=items)
    ).to_orders()

    return pydantic_orders


def save_order_with_items(
    db: Session,
    *,
    order: OrderSeed,
):
    obj = models.Order(**order.dict(exclude={"items"}))
    obj.items = [models.Item(**item.dict()) for item in order.items]

    db.add(obj)

    return obj


if __name__ == "__main__":
    from dotenv import load_dotenv
    import os

    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))
    orders = main()

    parsed_orders = [
        OrderSeed(
            **order.dict(exclude={"discount"}),
            discount=order.discount or 0,
        )
        for order in orders
    ]
    print("Orders parsed.")

    session = get_session()()
    with session as s:
        for ix, o in enumerate(parsed_orders):
            if (ix % 100) == 0:
                print(ix)
            saved = save_order_with_items(s, order=o)
        s.commit()