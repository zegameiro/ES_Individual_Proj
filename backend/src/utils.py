from dotenv import load_dotenv

import hashlib
import os

load_dotenv()

CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

def get_postgres_info():
    return {
        "host": "localhost",
        "port": "5432",
        "user": "taskflow_admin_user",
        "password": "taskflow_admin_password",
        "database": "taskflow_db"
    }

def generate_access_token(first_name: str, last_name: str, user_id) -> str:
    """Generate a unique access token for a user based on their full name."""
    
    full_name = f"{first_name},{last_name},{user_id}"
    access_token = hashlib.sha256(full_name.encode()).hexdigest()
    return access_token
