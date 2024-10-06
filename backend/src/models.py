from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import time

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(150), unique=True, index=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    picture_url = Column(String)
    tasks = relationship("Task", back_populates="user", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String(150))
    category = Column(String(100))
    isCompleted = Column(Boolean, default = False)
    creation_date = Column(String(350))
    deadline = Column(String(350))
    priority = Column(String(10))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="tasks")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.set_creation_date()
        
    def set_creation_date(self):
        self.creation_date = str(time.time())
