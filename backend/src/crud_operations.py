from sqlalchemy.orm import Session
from .models import User, Task
from .schemas import UserCreate, UserSchema, TaskCreate, TaskSchema

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(**user.dict())  # Convert pydantic model to dict for SQLAlchemy
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # Update user_id with the generated value
    return db_user