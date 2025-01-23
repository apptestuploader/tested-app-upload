from app.crud.base import CRUDBase
from app.models.models import Inventory
from app.schemas.inventory import InventoryCreate, InventoryUpdate


class CRUDInventory(CRUDBase[Inventory, InventoryCreate, InventoryUpdate]):
    pass


inventory = CRUDInventory(Inventory)
