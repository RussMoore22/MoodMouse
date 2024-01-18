from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str # plaintext, not to be added to db: "password123"


class AccoutOutWithHashedPassword(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str
    hashed_password: str # hashed: "akefni23452l3rnf2p948fghsdjg"


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
