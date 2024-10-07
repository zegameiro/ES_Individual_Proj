
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .crud_operations import get_user, get_user_by_email, create_user, get_user_by_access_token
from .models import User, Base
from .schemas import UserSchema, UserCreate
from .database import SessionLocal, engine
from .utils import check_email, check_name, generate_access_token

import hashlib

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

origins = ["http://localhost:3000", "https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dependency Injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post(
    "/login",
    description="Check if a user that logged in using google OAuth2 has already logged in more than once, if yes returns it's ID else it will create a new user and add it to the database",
    name="Login",
)
def login(user: UserCreate, db: Session = Depends(get_db)):

    print(user)

    # Check if the provided email has a correct format
    if not check_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Check if the provided first and last names are valid
    if not check_name(user.first_name) or not check_name(user.last_name):
        raise HTTPException(status_code=400, detail="Invalid first or last name")

    # Get a possible user with the same email to check if he/she have already logged in 
    existing_user = get_user_by_email(db=db, email=user.email)

    # If user exists, update isLoggedIn to True and generate new access token
    if existing_user:
        access_token = generate_access_token(existing_user.first_name, existing_user.last_name, existing_user.id)
        existing_user.access_token = access_token

        # Save the updated user data to the database
        db.commit()
        db.refresh(existing_user)

        return JSONResponse(
            status_code=200,
            content={
                "message": "User logged in with success",
                "access_token": access_token
            }
        )

    # If user does not exist, create a new one and generate access token
    new_user = create_user(db=db, user=user)

    return JSONResponse(
        status_code=201,
        content={
            "message": "User created with success",
            "access_token": new_user.accessToken
        }
    )

@app.post(
    "/logout",
    description="Operation to log out a user by deleting his/her access token",
    name="Logout",
)
def logout(access_token: str, db: Session = Depends(get_db)):

    possible_user = get_user_by_access_token(db=db, access_token=access_token)

    if possible_user:

        possible_user.access_token = None
        db.commit()
        db.refresh(possible_user)

        return JSONResponse(
            status_code=200,
            content={"message": "User logged out with success"}
        )
    
    raise HTTPException(status_code=404, detail="User not found")