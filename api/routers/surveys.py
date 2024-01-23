from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from models import QuestionOut, SurveyIn, SurveyOut
from queries.surveys import SurveyQueries
from typing import List
from authenticator import authenticator

router = APIRouter()

@router.post('/api/surveys', response_model=SurveyOut)
def create_survey(
    info: SurveyIn,
    request: Request,
    response: Response,
    repo: SurveyQueries = Depends()
):

    return repo.create(info)
