from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
)
from models import AccountToken, AccountIn, AccountForm, AccountOut, Error
from queries.accounts import AccountsQueries
from authenticator import authenticator
from typing import Union

router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=Union[AccountToken, Error])
async def create__account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountsQueries = Depends(),
) -> AccountToken | Error:
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info=info, hashed_password=hashed_password)
    if isinstance(account, Error):
        response.status_code = 409
        return account
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())
