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

# ----------------------- USER SCHEMAS -----------------------

class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    picture_url: Optional[str] = None

class UserCreate(BaseModel):
    credential: str

class UserSchema(UserBase):
    id: int
    tasks: List["TaskSchema"] = []
    access_token: str

    class Config:
        from_attributes = True
