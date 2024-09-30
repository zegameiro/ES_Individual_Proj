from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
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
