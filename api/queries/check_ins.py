from fastapi import HTTPException, status
from queries.pool import pool
from typing import Union, List
from models import (
    Check_inIn,
    Check_inOutList,
    Check_inOutDetail,
    SurveyOut,
    QuestionOut,
    RorschachTestOut,
    RorschachImageOut,
    Error,
    AccountOut
)


class Check_InQueries:

    def get_all_mine(
            self,
            account: dict
    ) -> Union[List[Check_inOutList], Error]:
        # changed get_mine to get_all_mine
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        ci.check_in_id,
                        ci.account,
                        ci.date,
                        ci.updated_date,
                        ci.happy_level,
                        ci.journal_entry,
                        ci.survey,
                        qt1.id,
                        qt1.prompt,
                        s.q1_ans,
                        qt2.id,
                        qt2.prompt,
                        s.q2_ans,
                        qt3.id,
                        qt3.prompt,
                        s.q3_ans,
                        qt4.id,
                        qt4.prompt,
                        s.q4_ans,
                        qt5.id,
                        qt5.prompt,
                        s.q5_ans,
                        ci.rorschach_test,
                        ri.id,
                        ri.path,
                        rt.response
                        FROM check_ins AS ci
                        JOIN surveys as s ON
                        (ci.survey=s.survey_id)
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
                        (ci.rorschach_test=rt.rorschach_id)
                        JOIN rorschach_imgs as ri ON
                        (rt.image=ri.id)
                        WHERE ci.account=%s
                        ORDER BY date;
                        """,
                        [account["id"]]
                    )
                    check_ins = []
                    for rec in db:
                        survey = SurveyOut(
                            survey_id=rec[6],
                            q1=QuestionOut(id=rec[7], prompt=rec[8]),
                            q1_ans=rec[9],
                            q2=QuestionOut(id=rec[10], prompt=rec[11]),
                            q2_ans=rec[12],
                            q3=QuestionOut(id=rec[13], prompt=rec[14]),
                            q3_ans=rec[15],
                            q4=QuestionOut(id=rec[16], prompt=rec[17]),
                            q4_ans=rec[18],
                            q5=QuestionOut(id=rec[19], prompt=rec[20]),
                            q5_ans=rec[21]
                        )
                        rorschach_test = RorschachTestOut(
                            id=rec[22],
                            image=RorschachImageOut(
                                id=rec[23],
                                path=rec[24]
                            ),
                            response=rec[25]
                        )
                        check_ins.append(Check_inOutList(
                            check_in_id=rec[0],
                            account=account["id"],
                            date=rec[2],
                            updated_date=rec[3],
                            happy_level=rec[4],
                            journal_entry=rec[5],
                            survey=survey,
                            rorschach_test=rorschach_test,
                        )
                        )
                    return check_ins
        except Exception as e:
            print("you got an error******:", e)

    def create(
            self,
            info: Check_inIn,
            account: dict
    ) -> Union[Check_inOutDetail, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO check_ins
                        (account
                        , date
                        , updated_date
                        , happy_level
                        , journal_entry
                        , survey
                        , rorschach_test
                        )
                        VALUES
                        ( %s, NOW(), NOW(), %s, %s, %s, %s )
                        RETURNING check_in_id, date, updated_date;
                        """,
                        [
                            account["id"],
                            info.happy_level,
                            info.journal_entry,
                            info.survey,
                            info.rorschach_test
                        ]
                    )
                    data = result.fetchall()[0]
                    return Check_inOutDetail(
                        check_in_id=data[0],
                        account=AccountOut(**account),
                        date=data[1],
                        updated_date=data[2],
                        happy_level=info.happy_level,
                        journal_entry=info.journal_entry,
                        survey=self.get_one_survey(survey_id=info.survey),
                        rorschach_test=self.get_one_rorschach(
                            info.rorschach_test)
                    )
        except Exception:
            return Error(
                message=f"Could not get account with id {account['id']}"
            )

    def get_one_survey(
            self,
            survey_id: int
    ) -> Union[SurveyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
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
        except Exception:
            return Error(message=f"Could not get survey with id {survey_id}")

    def get_one_rorschach(self, rorschach_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.rorschach_id,
                            ri.id,
                            ri.path,
                            r.response
                        FROM rorschach_tests as r
                        JOIN rorschach_imgs as ri ON
                        (r.image=ri.id)
                        WHERE rorschach_id=%s;
                        """,
                        [
                            rorschach_id
                        ]
                    )
                    rec = result.fetchone()
                    return RorschachTestOut(
                        id=rec[0],
                        image=RorschachImageOut(id=rec[1], path=rec[2]),
                        response=rec[3]
                    )
        except Exception:
            return Error(
                message=f"Could not get rorschach test with id {rorschach_id}"
            )

    def update_checkin(
            self,
            check_in_id: int,
            check_in: Check_inIn,
            account: dict
    ) -> Union[Check_inOutDetail, Error]:
        try:
            data = self.get_one_check_in(check_in_id=check_in_id, account_data=account)
            if isinstance(data, Error):
                return data
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE check_ins
                        SET updated_date  = NOW()
                            , happy_level = %s
                            , journal_entry = %s
                        WHERE check_in_id = %s
                        RETURNING account, date, updated_date
                        """,
                        [
                            check_in.happy_level,
                            check_in.journal_entry,
                            check_in_id
                        ]
                    )
                    data = db.fetchall()[0]
                    if account["id"] != data[0]:
                        return Error(message="Check in does not belong to user!")
                    return Check_inOutDetail(
                        check_in_id=check_in_id,
                        account=AccountOut(**account),
                        date=data[0],
                        updated_date=data[1],
                        happy_level=check_in.happy_level,
                        journal_entry=check_in.journal_entry,
                        survey=self.get_one_survey(check_in.survey),
                        # Need to work on accessing rorschach
                        rorschach_test=self.get_one_rorschach(
                            check_in.rorschach_test)
                    )
        except Exception:
            return Error(message="Could not update check-in!")

    def delete(self, check_in_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM check_ins
                        WHERE check_in_id = %s;
                        """,
                        [check_in_id]
                    )
                    return True
        except Exception:
            return False

    def get_one_check_in(self, check_in_id: int, account_data: dict) -> Union[Check_inOutDetail, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        ci.check_in_id,
                        ci.account,
                        ci.date,
                        ci.updated_date,
                        ci.happy_level,
                        ci.journal_entry,
                        ci.survey,
                        qt1.id,
                        qt1.prompt,
                        s.q1_ans,
                        qt2.id,
                        qt2.prompt,
                        s.q2_ans,
                        qt3.id,
                        qt3.prompt,
                        s.q3_ans,
                        qt4.id,
                        qt4.prompt,
                        s.q4_ans,
                        qt5.id,
                        qt5.prompt,
                        s.q5_ans,
                        ci.rorschach_test,
                        ri.id,
                        ri.path,
                        rt.response
                        FROM check_ins AS ci
                        JOIN surveys as s ON
                        (ci.survey=s.survey_id)
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
                        (ci.rorschach_test=rt.rorschach_id)
                        JOIN rorschach_imgs as ri ON
                        (rt.image=ri.id)
                        WHERE ci.check_in_id=%s
                        ORDER BY date;
                        """,
                        [check_in_id]
                    )
                    rec = result.fetchone()
                    if account_data["id"] != rec[1]:
                        return Error(message="check-in does not belong to currently logged in user.")
                    survey = SurveyOut(
                        survey_id=rec[6],
                        q1=QuestionOut(id=rec[7], prompt=rec[8]),
                        q1_ans=rec[9],
                        q2=QuestionOut(id=rec[10], prompt=rec[11]),
                        q2_ans=rec[12],
                        q3=QuestionOut(id=rec[13], prompt=rec[14]),
                        q3_ans=rec[15],
                        q4=QuestionOut(id=rec[16], prompt=rec[17]),
                        q4_ans=rec[18],
                        q5=QuestionOut(id=rec[19], prompt=rec[20]),
                        q5_ans=rec[21]
                    )
                    rorschach_test = RorschachTestOut(
                        id=rec[22],
                        image=RorschachImageOut(
                            id=rec[23],
                            path=rec[24]
                        ),
                        response=rec[25]
                    )
                    check_in = Check_inOutDetail(
                        check_in_id=rec[0],
                        account=AccountOut(**account_data),
                        date=rec[2],
                        updated_date=rec[3],
                        happy_level=rec[4],
                        journal_entry=rec[5],
                        survey=survey,
                        rorschach_test=rorschach_test
                    )
                return check_in
        except Exception:
            return Error(message="Could not get check-in!")
