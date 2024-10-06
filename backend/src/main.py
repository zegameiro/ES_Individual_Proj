from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from .crud_operations import get_user, get_user_by_email, create_user
from .models import User, Base
from .schemas import UserSchema, UserCreate
from .database import SessionLocal, engine
from .utils import check_email, check_name

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

origins = [
    "http://localhost:8000/",
    "http://localhost:5173/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency Injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login/", response_model=UserSchema)
def login(user: UserCreate, db: Session = Depends(get_db)):

    # Check if the provided email has a correct format
    if not check_email(user.email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Check if the provided first and last names are valid
    if not check_name(user.first_name) or not check_name(user.last_name):
        raise HTTPException(status_code=400, detail="Invalid first or last name")

    # Get a possible user with the same email to check if he/she have already logged in 
    new_user = get_user_by_email(db=db, email=user.email)

    if not new_user:    
        new_user = create_user(db=db, user=user)

    return JSONResponse(
        status_code=201,
        content={
            "message": "User created with success",
            "user_id": new_user.id
        }
    )