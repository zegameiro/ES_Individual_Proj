from dotenv import load_dotenv

import hashlib
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

def generate_access_token(first_name: str, last_name: str, user_id) -> str:
    """Generate a unique access token for a user based on their full name."""
    
    full_name = f"{first_name},{last_name},{user_id}"
    access_token = hashlib.sha256(full_name.encode()).hexdigest()
    return access_token
