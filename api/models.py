from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import datetime


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str  # plaintext, not to be added to db: "password123"


class AccountOutWithHashedPassword(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str
    hashed_password: str  # hashed: "akefni23452l3rnf2p948fghsdjg"


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str


class AccountToken(Token):
    account: AccountOut


class AccountForm(BaseModel):
    username: str
    password: str


class RorschachImageOut(BaseModel):
    id: int
    path: str


class RorschachTestIn(BaseModel):
    image: int
    response: str


class RorschachTestOut(BaseModel):
    id: int
    image: RorschachImageOut
    response: str


class QuestionOut(BaseModel):
    id: int
    prompt: str


class SurveyIn(BaseModel):
    q1: int
    q1_ans: int
    q2: int
    q2_ans: int
    q3: int
    q3_ans: int
    q4: int
    q4_ans: int
    q5: int
    q5_ans: int


class SurveyOut(BaseModel):
    survey_id: int
    q1: QuestionOut
    q1_ans: int
    q2: QuestionOut
    q2_ans: int
    q3: QuestionOut
    q3_ans: int
    q4: QuestionOut
    q4_ans: int
    q5: QuestionOut
    q5_ans: int


class Check_inIn(BaseModel):
    date: datetime
    updated_date: datetime
    happy_level: int
    journal_entry: str
    survey: int
    rorschach_test: int


class Check_inOutList(BaseModel):
    check_in_id: int
    account: int
    date: datetime
    updated_date: datetime
    happy_level: int
    journal_entry: str
    survey: SurveyOut
    rorschach_test: RorschachTestOut


class Check_inOutDetail(BaseModel):
    check_in_id: int
    account: AccountOut
    date: datetime
    updated_date: datetime
    happy_level: int
    journal_entry: str
    survey: SurveyOut
    rorschach_test: RorschachTestOut


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass
