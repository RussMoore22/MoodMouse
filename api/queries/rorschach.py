from queries.pool import pool
from pydantic import BaseModel
from models import RorschachImageOut, RorschachTestIn, RorschachTestOut


class RorschachImageQueries:
    def get_all(self):
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
        except Exception as e:
            print("Some error here ********:", e)


class RorschachTestQueries:
    def create(self, info: RorschachTestIn):

        print("control print statement ****************")
        #try:
            # connection to database
        with pool.connection() as conn:
            # runs sql query
            with conn.cursor() as db:
                # execute sql code and storing it data var
                data1 = db.execute(
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
                # print(data)
                id = data1.fetchone()[0]

                print("This should print id***:", id)

                Rorscharch_dict = {
                    "id": 1,
                    "path": 'test here'
                }
                return RorschachTestOut(
                    id=1,
                    image=RorschachImageOut(**Rorscharch_dict),
                    #image=RorschachImageOut(id=1, path='test'),
                    response='test string')
       #except Exception as e:
            print("Some error here ********:", e)
