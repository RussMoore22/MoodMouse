from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from models import Check_inIn, Check_inOut
from queries.check_ins import Check_InQueries
from typing import List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/checkins", response_model=Check_inOut)
def create_check_in(
    info: Check_inIn,
    request: Request,
    response: Response,
    repo: Check_InQueries = Depends()
):
    return repo.create(info)


@router.get("/api/checkins/mine", response_model=List[Check_inOut])
def get_mine(
    request: Request,
    response: Response,
    repo: Check_InQueries = Depends()
):
    return repo.get_mine(1)
