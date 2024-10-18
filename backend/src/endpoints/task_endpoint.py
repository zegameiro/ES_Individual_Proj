from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..repositories.task_repositories import create_task
from ..repositories.user_repositories import get_user_by_access_token
from ..schemas import TaskCreate

router = APIRouter()

@router.post(
    '/', 
    description="Add a new task and associate it with a user. Its required to send the access token in the request",
    name="Add a new Task"
)
def add_new_task(request: Request, task: TaskCreate, db: Session = Depends(get_db)):

    # Get the access token from the cookie in the request
    access_token = request.cookies.get('access_token')

    # Get the user associated with the access token
    user = get_user_by_access_token(access_token=access_token, db=db)

    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized, you must be logged in to add a new task")
    
    # Create a new task associated with the user
    new_task = create_task(task=task, user_id=user.id, db=db)

    return JSONResponse(
        status_code=201,
        content={
            "message": "Task created successfully",
            "new_task": new_task
        }
    )

    