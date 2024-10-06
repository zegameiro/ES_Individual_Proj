from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .crud_operations import get_user, get_user_by_email, create_user
from .models import User, Base
from .schemas import UserSchema, UserCreate
from .database import SessionLocal, engine

Base.metadata.create_all(bind=engine)

description = """
<strong>
The TaskFlow API is a simple and lightweight task management system.
It allows users to:
  - Create a new task
</strong>
"""

app = FastAPI(
    title = "Task Flow API",
    version = "1.0.0",
    description = description,
    license_info = {"name": "MIT License", "url": "https://opensource.org/licenses/MIT"}
)

# Dependency Injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/user/", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    possible_db_user = get_user_by_email(db=db, email=user.email)

    if possible_db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)