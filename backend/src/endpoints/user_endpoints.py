from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport.requests import Request

from ..crud_operations import get_user_by_email, create_user, get_user_by_access_token, update_user_access_token
from ..schemas import UserCreate
from ..utils import generate_access_token, CLIENT_ID
from ..database import get_db

router = APIRouter()

@router.post(
    "/login",
    description="Check if a user that logged in using google OAuth2 has already logged in more than once, if yes returns it's ID else it will create a new user and add it to the database",
    name="Login",
)
def login(user: UserCreate, db: Session = Depends(get_db)):

    try:    
        idinfo = id_token.verify_oauth2_token(user.credential, Request(), CLIENT_ID)

        print(f"ID Token payload: {idinfo}")

        # Get a possible user with the same email to check if they have already logged in 
        existing_user = get_user_by_email(email=idinfo.get('email'), db=db)

        # If user exists, generate a new access token for them
        if existing_user:

            access_token = generate_access_token(existing_user.first_name, existing_user.last_name, idinfo.get('jti'))
            update_user_access_token(existing_user=existing_user, access_token=access_token, db=db)

            return JSONResponse(
                status_code=200,
                content={
                    "message": "User logged in successfully",
                    "access_token": access_token
                }
            )

        # If user does not exist, create a new one and generate a new access token
        new_user = create_user(idinfo=idinfo)

        return JSONResponse(
            status_code=201,
            content={
                "message": "User created with success",
                "access_token": new_user.accessToken
            }
        )

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user data")
    
@router.post(
    "/logout",
    description="Operation to log out a user by deleting their access token",
    name="Logout",
)
def logout(access_token: str, db: Session = Depends(get_db)):

    possible_user = get_user_by_access_token(access_token=access_token, db=db)

    if possible_user:

        update_user_access_token(existing_user=possible_user, db=db)

        return JSONResponse(
            status_code=200,
            content={"message": "User logged out with success"}
        )
    
    raise HTTPException(status_code=404, detail="User not found")
