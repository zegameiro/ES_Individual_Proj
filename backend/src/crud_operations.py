from sqlalchemy.orm import Session

from .models import User, Task
from .schemas import UserCreate, UserSchema, TaskCreate, TaskSchema
from .utils import generate_access_token
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_access_token(db: Session, access_token: str):
    return db.query(User).filter(User.access_token == access_token).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(**user.dict())  # Convert pydantic model to dict for SQLAlchemy
    access_token = generate_access_token(db_user.first_name, db_user.last_name, db_user.id)
    db_user.access_token = access_token

    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # Update user_id with the generated value
    return db_user