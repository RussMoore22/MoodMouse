from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
)
from models import SurveyIn, SurveyOut, QuestionOut, Error
from queries.surveys import SurveyQueries, QuestionQueries
from typing import Union
from authenticator import authenticator

router = APIRouter()


@router.get(
    "/api/questions/{question_id}", response_model=Union[QuestionOut, Error]
)
def get_questions(
    question_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: QuestionQueries = Depends(),
):
    question = repo.get_one(question_id)
    if isinstance(question, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return question


@router.post("/api/surveys", response_model=Union[SurveyOut, Error])
def create_survey(
    info: SurveyIn,
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: SurveyQueries = Depends(),
) -> Union[SurveyOut, Error]:
    survey = repo.create(info)
    if isinstance(survey, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return survey


@router.put("/api/surveys/{survey_id}", response_model=Union[SurveyOut, Error])
def update_survey(
    survey_id: int,
    info: SurveyIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: SurveyQueries = Depends(),
) -> Union[SurveyOut, Error]:
    survey = repo.update(survey_id, info)
    if isinstance(survey, Error):
        response.status_code = 404
    else:
        response.status_code = 200
    return survey
