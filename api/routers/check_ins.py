from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends
)
from models import Check_inIn, Check_inOutList, Check_inOutDetail, Error
from queries.check_ins import Check_InQueries
from typing import List, Union
from authenticator import authenticator

router = APIRouter()


@router.post("/api/checkins", response_model=Check_inOutDetail)
def create_check_in(
    info: Check_inIn,
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: Check_InQueries = Depends()
):
    return repo.create(info, account_data)


@router.get("/api/checkins/mine", response_model=List[Check_inOutList])
def get_mine(
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: Check_InQueries = Depends()
):
    # return repo.get_all_mine(account_data["id"])
    return repo.get_all_mine(account_data)


@router.put("/api/checkins/{check_in_id}", response_model=Union[
    Check_inOutDetail,
    Error
])
def update_checkin(
    check_in_id: int,
    check_in: Check_inIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: Check_InQueries = Depends(),
) -> Union[Error, Check_inOutDetail]:
    return repo.update_checkin(check_in_id, check_in, account_data)


@router.delete("/api/checkins/{check_in_id}", response_model=bool)
def delete_checkin(
    check_in_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: Check_InQueries = Depends()
) -> Union[bool, Error]:
    return repo.delete(check_in_id)

@router.get("/api/checkins/{check_in_id}", response_model=Union[Check_inOutDetail, Error])
def get_one_check_in(
    check_in_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: Check_InQueries = Depends()
) -> Union[Check_inOutDetail, Error]:

    return repo.get_one_check_in(check_in_id, account_data)
