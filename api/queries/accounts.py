from queries.pool import pool
# from bson.objectid import ObjectId # - for No SQL
# from bson.errors import InvalidId # - for No SQL
from pydantic import BaseModel
from models import AccountIn, AccountOutWithHashedPassword, AccountOut


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountsQueries:
    def get(self, username: str=None, email:str=None):
        condition = "username"
        target = username
        if email:
            condition = "email"
            target = email
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    data = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        username,
                        hashed_password
                        FROM accounts
                        WHERE %s=%s;
                        """,
                        [condition, target]
                    )
                    user = data.fetchone()
                    if user is None:
                        return None
                    return AccountOutWithHashedPassword(
                        id=user[0],
                        first_name=user[1],
                        last_name=user[2],
                        email=user[3],
                        username=user[4],
                        hashed_password=user[5]
                    )
        except Exception:
            return Error(message="Could not get the user data.")

    def create(self, info: AccountIn, hashed_password: str):
        # check for duplicated account
        if self.get(username=info.username) is not None:
            print("***************username duplicated")
            raise DuplicateAccountError()
        if self.get(email=info.email) is not None:
            raise Error(messsage="Email already exists")

        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    data = db.execute(
                        """
                        INSERT INTO accounts
                        (first_name,
                        last_name,
                        email,
                        username,
                        hashed_password)
                        VALUES
                        (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            info.first_name,
                            info.last_name,
                            info.email,
                            info.username,
                            hashed_password
                        ]
                    )
                    new_user_id = data.fetchone()[0]
                    dict_info = info.dict()
                    return AccountOut(id=new_user_id, **dict_info)
        except Exception:
            print("***************username duplicated????")
            return Error(message="Could not create the user.")
