from sqlalchemy.orm import Session

from ..models import User
from ..utils import generate_access_token

def get_user(user_id: int, db: Session):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()

def get_user_by_access_token(access_token: str, db: Session):
    return db.query(User).filter(User.access_token == access_token).first()

def create_user(idinfo: dict, db: Session):

    access_token = generate_access_token(idinfo.get('given_name'), idinfo.get('family_name'), idinfo.get('jti'))
    db_user = User(
        email=idinfo.get('email'),
        first_name=idinfo.get('given_name'),
        last_name=idinfo.get('family_name'),
        picture_url=idinfo.get('picture'),
        access_token=access_token
    )  # Convert pydantic model to dict for SQLAlchemy

    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # Update user_id with the generated value
    return db_user

def update_user_access_token(existing_user: User, db: Session, access_token: str = None):

    existing_user.access_token = access_token

    # Save the updated user data to the database
    db.commit()
    db.refresh(existing_user)

    return access_token