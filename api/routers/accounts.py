from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status
)
from models import AccountToken, AccountIn, AccountForm
from queries.accounts import AccountsQueries, DuplicateAccountError
from authenticator import authenticator

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken)
async def create__account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountsQueries = Depends()
):
    # info.password - plain text
    hashed_password = authenticator.hash_password(info.password) 
    try:
        account = repo.create(info=info, hashed_password=hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with the same name"
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    # replace with new method!!!
    return AccountToken(account=account, **token.dict())
