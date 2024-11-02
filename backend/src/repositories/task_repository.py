from sqlalchemy.orm import Session
from fastapi import HTTPException

from ..models import Task
from ..schemas import TaskCreate, TaskSchema

def create_task(task: TaskCreate, user_email: str, db_session: Session) -> Task:
    
    new_task = Task(
        title=task.title,
        description=task.description,
        user_email=user_email
    )

    db_session.add(new_task)
    db_session.commit()
    db_session.refresh(new_task)

    return new_task

def update_task(task: TaskSchema, task_id: int, db_session: Session) -> Task:

    # Retrieve the task that needs to be updated
    task_to_update = db_session.query(Task).filter(Task.id == task_id).first()

    if task_to_update is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update the task's attributes
    task_to_update.title = task.title
    task_to_update.description = task.description
    task_to_update.is_completed = task.is_completed

    db_session.commit()
    db_session.refresh(task_to_update)
    

def get_tasks_from_user(user_email: str, db_session: Session) -> list[Task]:
    return db_session.query(Task).filter(Task.user_email == user_email).all()

def delete_task(task_id: int, db_session: Session) -> bool:
    task_to_delete = db_session.query(Task).filter(Task.id == task_id).first()

    if task_to_delete is None:
        return False

    db_session.delete(task_to_delete)
    db_session.commit()

    return True