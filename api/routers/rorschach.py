from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from models import RorschachImageOut, RorschachTestIn, RorschachTestOut
from queries.rorschach import RorschachImageQueries, RorschachTestQueries
from typing import List
from authenticator import authenticator

router = APIRouter()


@router.get("/api/rorschach_imgs", response_model=List[RorschachImageOut])
async def get_rorschach_image(

    # Curtis didn't put any requests or responses
    # Response is not needed, and error code will still be handled by FastAPI
    # A list object doesn't need a response in this instances.

    # Response handles error handling and doc writing, which depends on
    # Response parameter

    # response: Response,
    repo: RorschachImageQueries = Depends()
):

    return repo.get_all()


@router.post("/api/rorschach_tests", response_model=RorschachTestOut)
# Include union of error handling. union: {some error model here}
async def create_rorschach_test(
    info: RorschachTestIn,
    # request: Request,
    # response: Response,
    repo:  RorschachTestQueries = Depends()
):
    return repo.create(info)