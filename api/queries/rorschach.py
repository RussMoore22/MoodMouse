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


# Some_image = RorschachImageQueries()

# Some_image.get_all()
