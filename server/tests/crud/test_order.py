from sqlalchemy.orm import Session

from app import crud
from app.schemas.item import ItemInOrderCreate
from app.schemas.order import OrderCreate, OrderUpdate, OrderWithItemsCreate
from tests.utils.utils import (
    random_lower_string,
    random_integer,
    random_date,
)


def test_create_order(db: Session) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()

    item_in = OrderCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
    )
    order = crud.order.create(db=db, obj_in=item_in)
    assert order.discount == discount
    assert order.is_discount_to_go == is_discount_to_go
    assert order.closed == closed
    assert order.table == table


def test_get_order(db: Session) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()
    created_at = random_date()

    item_in = OrderCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
    )

    order = crud.order.create(db=db, obj_in=item_in)
    stored_order = crud.order.get(db=db, id=order.id)

    assert stored_order
    assert order == stored_order


def test_update_order(db: Session) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()
    created_at = random_date()

    item_in = OrderCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
    )
    order = crud.order.create(db=db, obj_in=item_in)

    table2 = random_lower_string()
    closed2 = True
    order_update = OrderUpdate(table=table2, closed=closed2)

    updated_order = crud.order.update(db=db, db_obj=order, obj_in=order_update)
    assert order.id == updated_order.id
    assert order.discount == updated_order.discount
    assert updated_order.table == table2
    assert updated_order.closed == closed2
    assert order.is_discount_to_go == updated_order.is_discount_to_go
    assert order.created_at == updated_order.created_at


def test_delete_order(db: Session) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()
    created_at = random_date()

    item_in = OrderCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
    )
    order = crud.order.create(db=db, obj_in=item_in)

    removed_order = crud.order.remove(db=db, id=order.id)
    found_order = crud.order.get(db=db, id=order.id)
    assert found_order is None
    assert removed_order == order


def test_order_with_items_create(db: Session) -> None:
    discount = random_integer()
    is_discount_to_go = False
    closed = False
    table = random_lower_string()
    created_at = random_date()

    order_in = OrderWithItemsCreate(
        discount=discount,
        is_discount_to_go=is_discount_to_go,
        closed=closed,
        table=table,
        created_at=created_at,
        items=[
            ItemInOrderCreate(
                name=random_lower_string(),
                price=random_integer(),
                discounted_price=random_integer(),
                quantity=random_integer(),
                type=random_lower_string(),
            )
            for _ in range(5)
        ],
    )

    order = crud.order.create_with_items(db=db, obj_in=order_in)

    assert len(order.items) == 5
    assert order.id
    for item in order.items:
        assert item.id
