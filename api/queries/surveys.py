from queries.pool import pool
from pydantic import BaseModel
from models import SurveyIn, SurveyOut, QuestionOut



class SurveyQueries:
    def create(self, info: SurveyIn):

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
                    # print(data)
                    survey_id = data.fetchone()[0]

                    return SurveyOut(
                        survey_id=survey_id,
                        q1=QuestionOut(id=info.q1, prompt=" "),
                        q1_ans=info.q1_ans,
                        q2=QuestionOut(id=info.q2, prompt=" "),
                        q2_ans=info.q2_ans,
                        q3=QuestionOut(id=info.q3, prompt=" "),
                        q3_ans=info.q3_ans,
                        q4=QuestionOut(id=info.q4, prompt=" "),
                        q4_ans=info.q4_ans,
                        q5=QuestionOut(id=info.q5, prompt=" "),
                        q5_ans=info.q5_ans

                        )
        except Exception as e:
                print("Some error here ********:",id= e)
