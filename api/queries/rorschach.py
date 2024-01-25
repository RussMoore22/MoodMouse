from queries.pool import pool
from pydantic import BaseModel
from typing import List, Union
from models import RorschachImageOut, RorschachTestIn, RorschachTestOut, Error


class RorschachImageQueries:
    def get_all(self) -> List[RorschachImageOut]:
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
                    # fetchall()
                    return [ RorschachImageOut(id=record[0], path=record[1]) for record in db ]
        except Exception:
            return Error(message="Could not get list of images")

    # get_one() here is not for endpoint but for creating foreign key object
    def get_one(self, id: int) -> RorschachImageOut:
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
                        [id]
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return RorschachImageOut(id=record[0], path=record[1])
        except Exception:
            return None


class RorschachTestQueries:
    def create(self, info: RorschachTestIn):
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
                        [info.image, info.response]
                    )
                    rorschach_id = data.fetchone()[0]
                    return RorschachTestOut(
                            id=rorschach_id,
                            image=rorschachimg.get_one(info.image),
                            response=info.response)
        except Exception:
            return Error(message="could not create the rorschach test")

    def update(self, rorschach_id: int, info:RorschachTestIn) -> Union[RorschachTestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE rorschach_tests
                        SET image=%s, response=%s
                        WHERE rorschach_id=%s;
                        """,
                        [info.image, info.response, rorschach_id]
                    )
                    rorschach_image = RorschachImageQueries()
                    return RorschachTestOut(
                        id=rorschach_id,
                        image=rorschach_image.get_one(info.image),
                        response=info.response
                        )
        except Exception:
            return Error(message="could not update Rorschach test")




# get_one() here is not for endpoint but for creating foreign key object
    def get_one(self, rorschach_test_id: int) -> RorschachTestOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT rorschach_id, image, response
                        FROM rorschach_tests
                        WHERE rorschach_id = %s;
                        """,
                        [rorschach_test_id]
                    )
                    record = db.fetchone()
                    rorschachimg = RorschachImageQueries()
                    if record is None:
                        return None
                    else:
                        if rorschachimg.get_one(record[1]):
                            return RorschachTestOut(id=record[0], image=rorschachimg.get_one(record[1]), response=record[2])
                        else:
                            return None
        except Exception:
            return None
