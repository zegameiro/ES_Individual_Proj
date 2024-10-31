from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..repositories.task_repository import create_task
from ..schemas import TaskCreate, TaskSchema
from ..utils import authenticated, validate_credential

router = APIRouter()

@router.post(
    '/', 
    description="Add a new task and associate it with a user. Its required to send the access token in the request",
    name="Add a new Task"
)
@authenticated()
def add_new_task(request: Request, task: TaskCreate, db: Session = Depends(get_db)):

    # Get the access token from the cookie in the request
    credential = request.cookies.get('credential')

    # Validate the access token
    idinfo = validate_credential(credential)


    print(idinfo.get("email"))  

    # Create a new task associated with the user
    create_task(task=task, user_email=idinfo.get("email"), db=db)

    return JSONResponse(
        status_code=201,
        content={
            "message": "Task created successfully",
        }
    )

    