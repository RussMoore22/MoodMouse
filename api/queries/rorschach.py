from queries.pool import pool
from typing import List, Union
from models import RorschachImageOut, RorschachTestIn, RorschachTestOut, Error


class RorschachImageQueries:
    def get_all(self) -> Union[List[RorschachImageOut], Error]:
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    db.execute(
                        """
                        SELECT id,
                        path
                        FROM rorschach_imgs;
                        """
                    )
                    return [
                        RorschachImageOut(id=record[0], path=record[1])
                        for record in db
                    ]
        except Exception:
            return Error(message="Could not get list of images")

    # get_one() here is not for endpoint but for creating foreign key object
    def get_one(self, id: int) -> Union[RorschachImageOut, None]:
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    db.execute(
                        """
                        SELECT id,
                        path
                        FROM rorschach_imgs
                        Where id = %s;
                        """,
                        [id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return RorschachImageOut(id=record[0], path=record[1])
        except Exception:
            return None


class RorschachTestQueries:

    def create(self, info: RorschachTestIn) -> Union[RorschachTestOut, Error]:
        rorschachimg = RorschachImageQueries()
        if rorschachimg.get_one(info.image) is None:
            return Error(message="rorschach image does not exist")
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    data = db.execute(
                        """
                        INSERT INTO rorschach_tests (
                        image,
                        response
                        ) VALUES (
                        %s, %s
                        ) RETURNING rorschach_id;
                        """,
                        [info.image, info.response],
                    )
                    rorschach_id = data.fetchone()[0]
                    return RorschachTestOut(
                        id=rorschach_id,
                        image=rorschachimg.get_one(info.image),
                        response=info.response,
                    )
        except Exception:
            return Error(message="could not create the rorschach test")

    def update(
        self, rorschach_id: int, info: RorschachTestIn, account_data: dict
    ) -> Union[RorschachTestOut, Error]:
        try:
            rorschachimg = RorschachImageQueries()
            if rorschachimg.get_one(info.image) is None:
                return Error(message="rorschach image does not exist")

            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE rorschach_tests AS r
                        SET image = %s ,response = %s
                        FROM check_ins as c
                        WHERE c.rorschach_test = r.rorschach_id
                        AND c.account = %s
                        AND r.rorschach_id = %s
                        RETURNING r.rorschach_id;
                        """,
                        [
                            info.image,
                            info.response,
                            account_data["id"],
                            rorschach_id,
                        ],
                    )
                    id = db.fetchone()
                    if id is None:
                        return Error(message="no rorschach id exists")
                    rorschach_image = RorschachImageQueries()
                    return RorschachTestOut(
                        id=rorschach_id,
                        image=rorschach_image.get_one(info.image),
                        response=info.response,
                    )
        except Exception:
            return Error(
                message=f"""could not update
                  Rorschach Test with id {rorschach_id}"""
            )
