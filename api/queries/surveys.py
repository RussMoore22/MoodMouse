from queries.pool import pool
from models import SurveyIn, SurveyOut, QuestionOut, Error
from typing import Union


class QuestionQueries:
    # get_one() here is not for endpoint but for creating foreign key object
    def get_one(self, question_id: int) -> QuestionOut:
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    db.execute(
                        """
                        SELECT id, prompt
                        FROM questions
                        WHERE id = %s;
                        """,
                        [question_id]
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return QuestionOut(id=record[0], prompt=record[1])
        except Exception:
            return None


class SurveyQueries:
    def create(self, info: SurveyIn) -> SurveyOut:

        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    data = db.execute(
                        """
                        INSERT INTO surveys (
                            q1,
                            q1_ans,
                            q2,
                            q2_ans,
                            q3,
                            q3_ans,
                            q4,
                            q4_ans,
                            q5,
                            q5_ans
                        ) VALUES (
                        %s, %s, %s, %s,%s, %s,%s, %s,%s, %s
                        ) RETURNING survey_id;
                        """,
                        [
                            info.q1,
                            info.q1_ans,
                            info.q2,
                            info.q2_ans,
                            info.q3,
                            info.q3_ans,
                            info.q4,
                            info.q4_ans,
                            info.q5,
                            info.q5_ans
                        ]
                    )
                    survey_id = data.fetchone()[0]
                    question = QuestionQueries()
                    if question:
                        return SurveyOut(
                            survey_id=survey_id,
                            q1=question.get_one(info.q1),
                            q1_ans=info.q1_ans,
                            q2=question.get_one(info.q2),
                            q2_ans=info.q2_ans,
                            q3=question.get_one(info.q3),
                            q3_ans=info.q3_ans,
                            q4=question.get_one(info.q4),
                            q4_ans=info.q4_ans,
                            q5=question.get_one(info.q5),
                            q5_ans=info.q5_ans
                        )
                    else:
                        return Error(message="could not create the")
        except Exception as e:
            print("Some error here ********:", id=e)

    def update(
            self,
            survey_id: int,
            info: SurveyIn
    ) -> Union[SurveyOut, Error]:
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    db.execute(
                        """
                        UPDATE surveys
                        SET q1 = %s
                        , q1_ans = %s
                        , q2 = %s
                        , q2_ans = %s
                        , q3 = %s
                        , q3_ans = %s
                        , q4 = %s
                        , q4_ans = %s
                        , q5 = %s
                        , q5_ans = %s
                        WHERE survey_id = %s;
                        """,
                        [
                         info.q1,
                         info.q1_ans,
                         info.q2,
                         info.q2_ans,
                         info.q3,
                         info.q3_ans,
                         info.q4,
                         info.q4_ans,
                         info.q5,
                         info.q5_ans,
                         survey_id
                        ]
                    )

                    question = QuestionQueries()
                    if question:
                        return SurveyOut(
                            survey_id=survey_id,
                            q1=question.get_one(info.q1),
                            q1_ans=info.q1_ans,
                            q2=question.get_one(info.q2),
                            q2_ans=info.q2_ans,
                            q3=question.get_one(info.q3),
                            q3_ans=info.q3_ans,
                            q4=question.get_one(info.q4),
                            q4_ans=info.q4_ans,
                            q5=question.get_one(info.q5),
                            q5_ans=info.q5_ans
                        )

        except Exception:
            return Error(message="could not update the data")

# get_one() here is not for endpoint but for creating foreign key object
# this is for checkin

    def get_one(self, survey_id: int):
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    db.execute(
                        """
                        SELECT survey_id
                        , q1
                        , q1_ans
                        , q2
                        , q2_ans
                        , q3
                        , q3_ans
                        , q4
                        , q4_ans
                        , q5
                        , q5_ans
                        FROM surveys
                        WHERE survey_id = %s;
                        """,
                        [survey_id]
                    )
                    record = db.fetchone()
                    question = QuestionQueries()
                    if record is None:
                        return None
                    else:
                        if (
                            question.get_one(record[1])
                            and question.get_one(record[3])
                            and question.get_one(record[5])
                            and question.get_one(record[7])
                            and question.get_one(record[9])
                        ):
                            return SurveyOut(
                                survey_id=survey_id,
                                q1=question.get_one(record[1]),
                                q1_ans=record[2],
                                q2=question.get_one(record[3]),
                                q2_ans=record[4],
                                q3=question.get_one(record[5]),
                                q3_ans=record[6],
                                q4=question.get_one(record[7]),
                                q4_ans=record[8],
                                q5=question.get_one(record[9]),
                                q5_ans=record[10]
                            )
                        else:
                            return None

        except Exception:
            return None
