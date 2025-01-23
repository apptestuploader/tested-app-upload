import datetime
from typing import Any, Hashable

import pandas
import pydantic


class Item(pydantic.BaseModel):
    id: str
    name: str
    quantity: float
    type: str
    price: int
    discounted_price: int
    register_code: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class Order(pydantic.BaseModel):
    id: str
    discount: int | None
    is_discount_to_go: bool
    closed: bool
    sum: float
    discounted_sum: float
    table: str = None
    items: list[Item]
    created_at: datetime.datetime
    updated_at: datetime.datetime


class ItemBuilder:
    def __init__(
        self,
        frame: pandas.DataFrame,
    ):
        self.frame: pandas.DataFrame = frame

    def from_ids(self, ids: list[Hashable]) -> list[Item]:
        return self.frame_to_items(items=self.find_ordered_items(ids=ids))

    def find_ordered_items(
        self,
        ids: list[Hashable],
    ) -> pandas.DataFrame:
        def not_found_callback(id_: Hashable, items_: pandas.Index) -> bool:
            if id_ in items_:
                return True
            print(f"Item not found: {id_}")
            return False

        real_ids = [
            id_
            for id_ in ids
            if not_found_callback(
                id_=id_,
                items_=self.frame.index,
            )
        ]
        return self.frame.loc[real_ids]

    @staticmethod
    def frame_to_items(
        items: pandas.DataFrame,
    ) -> list[Item]:
        return [
            Item(
                id=index,
                name=row["name"],
                quantity=row.quantity,
                type=row.type,
                price=row.price,
                discounted_price=row.discountedPrice,
                register_code=row.registerCode,
                created_at=row.createdAt,
                updated_at=row.updatedAt,
            )
            for index, row in items.iterrows()
        ]


class OrderBuilder:
    def __init__(
        self,
        frame: pandas.DataFrame,
        item_builder: ItemBuilder,
    ):
        self.frame: pandas.DataFrame = frame
        self.item_builder: ItemBuilder = item_builder

    def to_orders(
        self,
    ) -> list[Order]:
        return [
            self.order_from_row(
                index=index,
                row=row,
                items=self.item_builder.from_ids(ids=row["items"]),
            )
            for index, row in self.frame.iterrows()
        ]

    @staticmethod
    def order_from_row(
        index: Hashable,
        row: pandas.Series,
        items: list[Item],
    ) -> Order:
        def map_discount(discount: Any) -> int:
            if isinstance(discount, int):
                return discount
            if discount == "":
                return 0

        return Order(
            id=str(index),
            discount=map_discount(row.discount),
            is_discount_to_go=row.discountToGo,
            closed=row.closed,
            sum=row["sum"],
            discounted_sum=row.discountedSum,
            table=row.table,
            items=items,
            created_at=row.createdAt,
            updated_at=row.updatedAt,
        )
