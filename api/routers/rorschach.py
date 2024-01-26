from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
)
from models import RorschachImageOut, RorschachTestIn, RorschachTestOut, Error
from queries.rorschach import RorschachImageQueries, RorschachTestQueries
from typing import List, Union
from authenticator import authenticator

router = APIRouter()


@router.get("/api/rorschach_imgs", response_model=List[RorschachImageOut])
async def get_rorschach_image(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RorschachImageQueries = Depends()
) -> Union[List[RorschachImageOut], Error]:

    return repo.get_all()


@router.post(
        "/api/rorschach_tests",
        response_model=Union[RorschachTestOut, Error]
)
# Include union of error handling. union: {some error model here}
async def create_rorschach_test(
    info: RorschachTestIn,
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo:  RorschachTestQueries = Depends()
) -> Union[RorschachTestOut, Error]:
    rorschach_test = repo.create(info)
    if isinstance(rorschach_test, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return rorschach_test


@router.put(
        "/api/rorschach_tests/{rorschach_id}",
        response_model=Union[RorschachTestOut, Error]
)
async def update_rorschach_test(
    rorschach_id: int,
    info: RorschachTestIn,
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RorschachTestQueries = Depends()
) -> Union[RorschachTestOut, Error]:
    rorschach_test = repo.update(rorschach_id, info)
    if isinstance(rorschach_test, Error):
        response.status_code = 400
    else:
        response.status_code = 200
    return rorschach_test
