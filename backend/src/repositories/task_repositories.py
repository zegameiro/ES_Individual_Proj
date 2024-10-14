from sqlalchemy.orm import Session

from ..models import Task
from ..schemas import TaskCreate

def create_task(task: TaskCreate, db:Session) -> Task:
    
    new_task = Task(
        title=task.title,
        description=task.description,
        category=task.category,
        deadline=task.deadline,
        priority=task.priority
    )

    return new_task