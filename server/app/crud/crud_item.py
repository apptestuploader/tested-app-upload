from app.crud.base import CRUDBase
from app.models.models import Item
from app.schemas.item import ItemCreate, ItemUpdate


class CRUDItem(CRUDBase[Item, ItemCreate, ItemUpdate]):
    pass


item = CRUDItem(Item)
