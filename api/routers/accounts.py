from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
)
from models import AccountToken, AccountIn, AccountForm
from queries.accounts import AccountsQueries, Error
from authenticator import authenticator
from typing import Union

router = APIRouter()


@router.post("/api/accounts", response_model=Union[AccountToken, Error])
async def create__account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountsQueries = Depends()
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info=info, hashed_password=hashed_password)
    if isinstance(account, Error):
        response.status_code = 409
        return account
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
