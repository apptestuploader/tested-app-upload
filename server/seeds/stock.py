import datetime
from typing import Hashable

import pandas

from app.crud import inventory
from app.db.session import get_session
from app.schemas.inventory import InventoryCreate


class InventorySeed(InventoryCreate):

    old_id: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    @classmethod
    def from_row(
        cls,
        index: Hashable,
        row: pandas.Series,
    ) -> "InventorySeed":
        return cls(
            old_id=index,
            name=row["name"],
            register_code=row.registerCode,
            price_default=row.price_default,
            price_gaiwan=row.price_gaiwan,
            price_package=row.price_package,
            price_gongfu=0,
            price_bulk=row.price_bulk,
            created_at=row.createdAt,
            updated_at=row.updatedAt,
        )

    @classmethod
    def parse_frame(
        cls,
        frame: pandas.DataFrame,
    ) -> list["InventorySeed"]:
        return [
            cls.from_row(
                index=index,
                row=row,
            )
            for index, row in frame.iterrows()
        ]


def main():
    from experiments import load_data
    from experiments.menu import preprocessing

    inventorys = preprocessing.main(
        load_data.to_pandas(
            load_data.load(
                load_data.Files.menuitems,
            )
        )
    )
    inventory_objects = InventorySeed.parse_frame(frame=inventorys)

    session = get_session()()

    with session as s:
        for obj in inventory_objects:
            try:
                inventory.create(
                    db=s,
                    obj_in=obj,
                )
            except Exception as e:
                print(e)
                print(obj)
                s.rollback()


if __name__ == "__main__":
    from dotenv import load_dotenv
    import os

    load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

    main()
