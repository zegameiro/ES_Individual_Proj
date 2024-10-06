import re

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