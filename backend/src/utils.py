import re
import hashlib

def get_postgres_info():
    return {
        "host": "localhost",
        "port": "5432",
        "user": "taskflow_admin_user",
        "password": "taskflow_admin_password",
        "database": "taskflow_db"
    }

def check_email(email: str) -> bool:
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(email_regex, email))

def check_name(name: str) -> bool:

    if len(name) < 3 or len(name) > 50:
        return False

    # Check if any number exists in the name
    if any(char.isdigit() for char in name):
        return False
    
    return True

def generate_access_token(first_name: str, last_name: str, user_id) -> str:
    """Generate a unique access token for a user based on their full name."""
    
    full_name = f"{first_name},{last_name},{user_id}"
    access_token = hashlib.sha256(full_name.encode()).hexdigest()
    return access_token
