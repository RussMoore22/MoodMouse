from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from models import QuestionOut, SurveyIn, SurveyOut, Error
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

@router.put('/api/surveys/{survey_id}', response_model=SurveyOut)
def update_survey(
    survey_id: int,
    info: SurveyIn,
    response: Response,
    repo: SurveyQueries = Depends()
):
    survey = repo.update(survey_id, info)
    if isinstance(survey, Error):
        response.status_code = 400
    else:
        response.status_code = 200
    return survey
