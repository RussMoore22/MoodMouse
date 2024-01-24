from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends
)
from models import Check_inIn, Check_inOut, Error
from queries.check_ins import Check_InQueries
from typing import List, Union

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
    return repo.get_all_mine(1)


@router.put("/api/checkins/{check_in_id}", response_model=Union[
    Check_inOut,
    Error
])
def update_checkin(
    check_in_id: int,
    check_in: Check_inIn,
    response: Response,
    repo: Check_InQueries = Depends(),
) -> Union[Error, Check_inOut]:
    return repo.update_checkin(check_in_id, check_in)
