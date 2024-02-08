from queries.pool import pool
from models import SurveyIn, SurveyOut, QuestionOut, Error
from typing import Union


class QuestionQueries:
    def get_one(self, question_id: int) -> Union[QuestionOut, Error]:
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
                        [question_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return Error(message="question does not exist")
                    return QuestionOut(id=record[0], prompt=record[1])
        except Exception:
            return Error(message="question does not exist")


class SurveyQueries:
    def create(self, info: SurveyIn) -> Union[SurveyOut, Error]:
        question = QuestionQueries()
        qs = [question.get_one(info.q1), question.get_one(info.q2), question.get_one(
            info.q3), question.get_one(info.q4), question.get_one(info.q5)]
        for q in qs:
            if isinstance(q, Error):
                return q

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
                            info.q5_ans,
                        ],
                    )
                    survey_id = data.fetchone()[0]

                    return SurveyOut(
                        survey_id=survey_id,
                        q1=qs[0],
                        q1_ans=info.q1_ans,
                        q2=qs[1],
                        q2_ans=info.q2_ans,
                        q3=qs[2],
                        q3_ans=info.q3_ans,
                        q4=qs[3],
                        q4_ans=info.q4_ans,
                        q5=qs[4],
                        q5_ans=info.q5_ans,
                    )

        except Exception:
            Error(message="Could not create survey")

    def update(
        self, survey_id: int, info: SurveyIn
    ) -> Union[SurveyOut, Error]:
        try:
            question = QuestionQueries()
            qs = [question.get_one(info.q1), question.get_one(info.q2), question.get_one(
                info.q3), question.get_one(info.q4), question.get_one(info.q5)]
            for q in qs:
                if isinstance(q, Error):
                    return q

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
                            survey_id,
                        ],
                    )

                    return SurveyOut(
                        survey_id=survey_id,
                        q1=qs[0],
                        q1_ans=info.q1_ans,
                        q2=qs[1],
                        q2_ans=info.q2_ans,
                        q3=qs[2],
                        q3_ans=info.q3_ans,
                        q4=qs[3],
                        q4_ans=info.q4_ans,
                        q5=qs[4],
                        q5_ans=info.q5_ans,
                    )

        except Exception:
            return Error(message="could not update the survey")
