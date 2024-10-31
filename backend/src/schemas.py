from pydantic import BaseModel
from typing import List, Optional

# ----------------------- TASK SCHEMAS -----------------------

class TaskBase(BaseModel):
    title: str
    description: str

class TaskCreate(TaskBase):
    pass

class TaskSchema(TaskBase):
    id: int
    category: Optional[str] = None
    deadline: Optional[str] = None
    priority: Optional[str] = None
    is_completed: bool = False
    creation_date: str
    user_id: int

    class Config:
        from_attributes = True

