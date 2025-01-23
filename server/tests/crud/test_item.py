from sqlalchemy.orm import Session

from app import crud
from app.schemas.item import ItemCreate, ItemUpdate
from tests.utils.utils import random_lower_string, random_integer


def test_create_item(
    db: Session,
    item_in: ItemCreate,
) -> None:

    item = crud.item.create(db=db, obj_in=item_in)

    assert item.id
    assert item.quantity == item_in.quantity
    assert item.type == item_in.type
    assert item.order_id == item_in.order_id


def test_get_item(
    db: Session,
    item_in: ItemCreate,
) -> None:
    item = crud.item.create(
        db=db,
        obj_in=item_in,
    )

    stored_item = crud.item.get(db=db, id=item.id)

    assert stored_item
    assert stored_item == item


def test_update_item(
    db: Session,
    item_in: ItemCreate,
) -> None:
    item = crud.item.create(
        db=db,
        obj_in=item_in,
    )

    quantity2 = random_integer()
    type2 = random_lower_string()

    item_update = ItemUpdate(quantity=quantity2, type=type2)
    item2 = crud.item.update(db=db, db_obj=item, obj_in=item_update)

    assert item.id == item2.id
    assert item2.created_at == item.created_at
    assert item2.order_id == item.order_id
    assert item2.type == type2
    assert item2.quantity == quantity2


def test_delete_item(
    db: Session,
    item_in: ItemCreate,
) -> None:
    item = crud.item.create(
        db=db,
        obj_in=item_in,
    )

    item2 = crud.item.remove(db=db, id=item.id)
    item3 = crud.item.get(db=db, id=item.id)

    assert item3 is None
    assert item2.id == item.id
    assert item2.quantity == item_in.quantity
    assert item2.type == item_in.type
    assert item2.order_id == item.order_id
