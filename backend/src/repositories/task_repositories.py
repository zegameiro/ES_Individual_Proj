from sqlalchemy.orm import Session

from ..models import Task
from ..schemas import TaskCreate

def create_task(task: TaskCreate, user_id: int, db:Session) -> Task:
    
    new_task = Task(
        title=task.title,
        description=task.description,
        user_id = user_id,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

def get_tasks_from_user(user_id: int, db: Session) -> list[Task]:
    return db.query(Task).filter(Task.user_id == user_id).all()