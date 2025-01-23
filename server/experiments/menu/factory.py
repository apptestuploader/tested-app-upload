import pandas

from app.schemas.inventory import InventoryCreate


def from_frame(frame: pandas.DataFrame) -> list[InventoryCreate]:
    return [
        InventoryCreate(
            name=row["name"],
            register_code=row.registerCode,
            price_default=row.price_default,
            price_gaiwan=row.price_gaiwan,
            price_package=row.price_package,
            price_bulk=row.price_bulk,
        )
        for index, row in frame.iterrows()
    ]
