from dotenv import load_dotenv
from fastapi import HTTPException
from functools import wraps
from google.oauth2 import id_token
from google.auth.transport.requests import Request as GoogleRequest

import os

load_dotenv()

HOST = os.getenv('POSTGRES_HOST', 'localhost')
PORT = os.getenv('POSTGRES_PORT', '5432')
USER = os.getenv('POSTGRES_USER', 'taskflow_admin')
PASSWORD = os.getenv('POSTGRES_PASSWORD', 'taskflow_admin_password')
DATABASE = os.getenv('POSTGRES_DATABASE', 'taskflow_db')
CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

def get_postgres_info():
    return {
        "host": HOST,
        "port": PORT,
        "user": USER,
        "password": PASSWORD,
        "database": DATABASE
    }

def validate_credential(credential):
    try:
        idinfo = id_token.verify_oauth2_token(credential, GoogleRequest(), CLIENT_ID)
        return idinfo
    except ValueError:
        raise HTTPException(
            status_code=401,
            detail={
                "message": "Invalid credential"
            }
        )


def authenticated():
    """Decorator to check if a user is authenticated"""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):

            request = kwargs.get("request", None)

            access_token = request.cookies.get("credential")

            if not access_token:
                raise HTTPException(
                    status_code=401,
                    detail={
                        "message": "Unauthorized, you must be logged in to access this resource"
                    }
                )
            
            return func(*args, **kwargs)
    
        return wrapper

    return decorator
