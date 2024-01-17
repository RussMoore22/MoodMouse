from queries.pool import pool
# from bson.objectid import ObjectId # - for No SQL
# from bson.errors import InvalidId # - for No SQL
import os
from models import AccountIn


class DuplicateAccountError(ValueError):
    pass

#like VacationRepository?
class AccountsQueries:
    def get(self, username: str):
        pass


    def create(self, info: AccountIn, hashed_password: str):
        pass
