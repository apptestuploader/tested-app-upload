from sqlalchemy.orm import Session

from app import crud
from app.schemas.inventory import InventoryCreate, InventoryUpdate
from tests.utils.utils import (
    random_lower_string,
    random_integer,
)


def test_create_inventory(db: Session) -> None:
    name = random_lower_string()
    register_code = random_lower_string()
    price_default = random_integer()
    price_gaiwan = random_integer()
    price_package = random_integer()
    price_bulk = random_integer()
    price_gongfu = random_integer()

    item_in = InventoryCreate(
        name=name,
        register_code=register_code,
        price_default=price_default,
        price_gaiwan=price_gaiwan,
        price_package=price_package,
        price_bulk=price_bulk,
        price_gongfu=price_gongfu,
    )
    inventory = crud.inventory.create(db=db, obj_in=item_in)
    assert inventory.name == name
    assert inventory.register_code == register_code
    assert inventory.price_default == price_default
    assert inventory.price_gaiwan == price_gaiwan
    assert inventory.price_package == price_package
    assert inventory.price_bulk == price_bulk


def test_get_inventory(db: Session) -> None:
    name = random_lower_string()
    register_code = random_lower_string()
    price_default = random_integer()
    price_gaiwan = random_integer()
    price_package = random_integer()
    price_bulk = random_integer()
    price_gongfu = random_integer()

    item_in = InventoryCreate(
        name=name,
        register_code=register_code,
        price_default=price_default,
        price_gaiwan=price_gaiwan,
        price_package=price_package,
        price_bulk=price_bulk,
        price_gongfu=price_gongfu,
    )
    inventory = crud.inventory.create(db=db, obj_in=item_in)
    stored_inventory = crud.inventory.get(db=db, id=inventory.id)
    assert stored_inventory
    assert inventory == stored_inventory


def test_update_inventory(db: Session) -> None:
    name = random_lower_string()
    register_code = random_lower_string()
    price_default = random_integer()
    price_gaiwan = random_integer()
    price_package = random_integer()
    price_bulk = random_integer()
    price_gongfu = random_integer()

    item_in = InventoryCreate(
        name=name,
        register_code=register_code,
        price_default=price_default,
        price_gaiwan=price_gaiwan,
        price_package=price_package,
        price_bulk=price_bulk,
        price_gongfu=price_gongfu,
    )
    inventory = crud.inventory.create(db=db, obj_in=item_in)
    name2 = random_lower_string()
    price_default2 = random_integer()
    inventory_update = InventoryUpdate(name=name2, price_default=price_default2)
    updated_inventory = crud.inventory.update(
        db=db, db_obj=inventory, obj_in=inventory_update
    )
    assert updated_inventory.id == inventory.id
    assert updated_inventory.name == name2
    assert updated_inventory.price_default == price_default2
    assert updated_inventory.register_code == inventory.register_code
    assert updated_inventory.price_gaiwan == inventory.price_gaiwan
    assert updated_inventory.price_package == inventory.price_package
    assert updated_inventory.price_bulk == inventory.price_bulk


def test_delete_inventory(db: Session) -> None:
    name = random_lower_string()
    register_code = random_lower_string()
    price_default = random_integer()
    price_gaiwan = random_integer()
    price_package = random_integer()
    price_bulk = random_integer()
    price_gongfu = random_integer()

    item_in = InventoryCreate(
        name=name,
        register_code=register_code,
        price_default=price_default,
        price_gaiwan=price_gaiwan,
        price_package=price_package,
        price_bulk=price_bulk,
        price_gongfu=price_gongfu,
    )
    inventory = crud.inventory.create(db=db, obj_in=item_in)

    removed_inventory = crud.inventory.remove(db=db, id=inventory.id)
    found_inventory = crud.inventory.get(db=db, id=inventory.id)
    assert found_inventory is None
    assert removed_inventory == inventory
