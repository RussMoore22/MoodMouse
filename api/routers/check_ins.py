from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
)
from models import Check_inIn, Check_inOutList, Check_inOutDetail, Error
from queries.check_ins import CheckInQueries
from typing import List, Union
from authenticator import authenticator

router = APIRouter()


@router.post("/api/check-ins", response_model=Union[Check_inOutDetail, Error])
def create_check_in(
    info: Check_inIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckInQueries = Depends(),
) -> Union[Check_inOutDetail, Error]:
    checkin = repo.create(info, account_data)
    if isinstance(checkin, Error):
        response.status_code = 404
    return checkin


@router.get(
    "/api/check-ins/mine", response_model=Union[List[Check_inOutList], Error]
)
def get_mine(
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckInQueries = Depends(),
) -> Union[List[Check_inOutList], Error]:
    checkins = repo.get_all_mine(account_data)
    if isinstance(checkins, Error):
        response.status_code = 404
    return checkins


@router.put(
    "/api/check-ins/{check_in_id}",
    response_model=Union[Check_inOutDetail, Error],
)
def update_checkin(
    check_in_id: int,
    check_in: Check_inIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckInQueries = Depends(),
) -> Union[Error, Check_inOutDetail]:
    updated_checkin = repo.update_checkin(check_in_id, check_in, account_data)
    if isinstance(updated_checkin, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return updated_checkin


@router.delete("/api/check-ins/{check_in_id}", response_model=Union[bool, Error])
def delete_checkin(
    check_in_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckInQueries = Depends(),
) -> Union[bool, Error]:
    message = repo.delete(check_in_id, account_data)
    if isinstance(message, Error):
        response.status_code = 404
    return message


@router.get(
    "/api/check-ins/{check_in_id}",
    response_model=Union[Check_inOutDetail, Error],
)
def get_one_check_in(
    check_in_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CheckInQueries = Depends(),
) -> Union[Check_inOutDetail, Error]:
    check_in = repo.get_one_check_in(check_in_id, account_data)
    if isinstance(check_in, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return check_in
