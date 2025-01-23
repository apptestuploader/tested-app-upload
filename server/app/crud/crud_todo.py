from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.models import Todo
from app.schemas.todo import TodoCreate, TodoUpdate


class CRUDTodo(CRUDBase[Todo, TodoCreate, TodoUpdate]):
    def create_with_task(
        self,
        db: Session,
        *,
        obj_in: TodoCreate,
        task_id: int,
    ) -> Todo:
        obj_in_data = obj_in.dict()
        db_obj = self.model(**obj_in_data, task_id=task_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


todo = CRUDTodo(Todo)
