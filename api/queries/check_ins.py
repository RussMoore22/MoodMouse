from queries.pool import pool
from models import (
    Check_inIn,
    Check_inOut,
    SurveyOut,
    QuestionOut,
    RorschachTestOut,
    RorschachImageOut
)


class Check_InQueries:

    def get_all(self, info:Check_inOut):
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    result = db.execute(
                        """
                        SELECT account, date, updated_date, happy_level,
                        journal_entry, survey, rorschach_test
                        FROM check_ins
                        ORDER BY date
                        VALUES
                        ( %s )
                        RETURNING check_in_id;
                        """,
                        [
                            info.account,
                            info.date,
                            info.updated_date,
                            info.happy_level,
                            info.journal_entry,
                            info.survey,
                            info.rorschach_test
                        ]
                    )
                    check_in_id = result.fetchone()[0]
                    return Check_inOut(
                        check_in_id=check_in_id,
                        account=info.account,
                        date=info.date,
                        updated_date=info.updated_date,
                        happy_level=info.happy_level,
                        journal_entry=info.journal_entry,
                        survey=self.get_one_survey(survey_id=info.survey),
                        rorschach_test=RorschachTestOut(
                            id=1,
                            image=RorschachImageOut(id=1, path="test"),
                            response="I see my mother"
                        )
                    )
        except Exception as e:
            print("you got an error******:", e)
    
    def create(self, info: Check_inIn):
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    result = db.execute(
                        """
                            SELECT *
                            FROM check_ins
                            JOIN surveys as s ON
                            (check_ins.survey=s.survey_id)
                            JOIN questions as qt1 ON
                            (s.q1=qt1.id)
                            JOIN questions as qt2 ON
                            (s.q2=qt2.id)
                            JOIN questions as qt3 ON
                            (s.q3=qt3.id)
                            JOIN questions as qt4 ON
                            (s.q4=qt4.id)
                            JOIN questions as qt5 ON
                            (s.q5=qt5.id)
                            JOIN rorschach_tests as rt ON
                            (check_ins.rorschach_test=rt.rorschach_id)
                            JOIN rorschach_imgs as ri ON
                            (rt.image=ri.id)
                            WHERE check_ins.check_in_id=1
                            ORDER BY date;
                        """,
                        [
                            info.account,
                            info.date,
                            info.updated_date,
                            info.happy_level,
                            info.journal_entry,
                            info.survey,
                            info.rorschach_test
                        ]
                    )
                    check_in_id = result.fetchone()[0]
                    return Check_inOut(
                        check_in_id=check_in_id,
                        account=info.account,
                        date=info.date,
                        updated_date=info.updated_date,
                        happy_level=info.happy_level,
                        journal_entry=info.journal_entry,
                        survey=self.get_one_survey(survey_id=info.survey),
                        rorschach_test=RorschachTestOut(
                            id=1,
                            image=RorschachImageOut(id=1, path="test"),
                            response="I see my mother"
                        )
                    )
        except Exception as e:
            print("you got an error******:", e)

    def get_one_survey(self, survey_id: int):
        try:
            # connection to database
            with pool.connection() as conn:
                # runs sql query
                with conn.cursor() as db:
                    # execute sql code and storing it data var
                    result = db.execute(
                        """
                            SELECT survey_id
                                , s.q1
                                , qt1.prompt
                                , s.q1_ans
                                , s.q2
                                , qt2.prompt
                                , s.q2_ans
                                , s.q3
                                , qt3.prompt
                                , s.q3_ans
                                , s.q4
                                , qt4.prompt
                                , s.q4_ans
                                , s.q5
                                , qt5.prompt
                                , s.q5_ans
                                FROM surveys as s
                                JOIN questions as qt1 ON
                                (s.q1=qt1.id)
                                JOIN questions as qt2 ON
                                (s.q2=qt2.id)
                                JOIN questions as qt3 ON
                                (s.q3=qt3.id)
                                JOIN questions as qt4 ON
                                (s.q4=qt4.id)
                                JOIN questions as qt5 ON
                                (s.q5=qt5.id)
                                WHERE survey_id=%s;
                        """,
                        [
                            survey_id
                        ]
                    )
                    rec = result.fetchone()
                    return SurveyOut(
                        survey_id=rec[0],
                        q1=QuestionOut(id=rec[1], prompt=rec[2]),
                        q1_ans=rec[3],
                        q2=QuestionOut(id=rec[4], prompt=rec[5]),
                        q2_ans=rec[6],
                        q3=QuestionOut(id=rec[7], prompt=rec[8]),
                        q3_ans=rec[9],
                        q4=QuestionOut(id=rec[10], prompt=rec[11]),
                        q4_ans=rec[12],
                        q5=QuestionOut(id=rec[13], prompt=rec[14]),
                        q5_ans=rec[15]
                    )

        except Exception as e:
            print("you got an error******:", e)
