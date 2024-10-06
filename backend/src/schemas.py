from pydantic import BaseModel
from typing import List, Optional

# ----------------------- TASK SCHEMAS -----------------------

class TaskBase(BaseModel):
    title: str
    description: str
    category: str
    is_completed: bool = False
    dealine: str
    priority: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskSchema(TaskBase):
    id: int
    creation_date: str
    user_id: int

    class Config:
        orm_mode = True


# ----------------------- USER SCHEMAS -----------------------

class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    picture_url: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class UserSchema(UserBase):
    id: int
    tasks: List["TaskSchema"] = []

    class Config:
        orm_mode = True
