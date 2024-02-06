import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetOneCheckinQuery,

} from './app/apiSlice'




function DetailCheckin() {
    const params = useParams()
    const { data: checkin, isLoading: checkinIsLoading } = useGetOneCheckinQuery(params.checkin_id)




    if (checkinIsLoading) { return <div> Loading...</div>}
    const checkinDate = new Date(checkin.date)
    const score = (checkin) => {
        return (checkin.happy_level +
                checkin.survey.q1_ans +
                checkin.survey.q2_ans +
                checkin.survey.q3_ans +
                checkin.survey.q4_ans +
                checkin.survey.q5_ans)
    }
    console.log(checkin)
    return (
        <>
            <div>{checkinDate.toLocaleDateString(undefined, {weekday:"long", month: "long", year: "numeric", day: "numeric"})}</div>

            <div>Mood score: {score(checkin)}
                <p> Put image here </p>
            </div>
            <div>
                <h3>How you felt</h3>
                <p>{checkin.survey.q1.prompt}<span><meter id="Question 1" value={checkin.survey.q1_ans} min="0" max="4"></meter></span></p>
                <p>{checkin.survey.q2.prompt}<span><meter id="Question 2" value={checkin.survey.q2_ans} min="0" max="4"></meter></span></p>
                <p>{checkin.survey.q3.prompt}<span><meter id="Question 3" value={checkin.survey.q3_ans} min="0" max="4"></meter></span></p>
                <p>{checkin.survey.q4.prompt}<span><meter id="Question 4" value={checkin.survey.q4_ans} min="0" max="4"></meter></span></p>
                <p>{checkin.survey.q5.prompt}<span><meter id="Question 5" value={checkin.survey.q5_ans} min="0" max="4"></meter></span></p>
            </div>
            <div>
                <h3>What you wrote</h3>
                <p>
                   {checkin.journal_entry}
                </p>
            </div>

            <div>
                <h3>What you saw</h3>
                <img src={checkin.rorschach_test.image.path}/>
                <p>{checkin.rorschach_test.response}</p>
            </div>
        </>
    )
}

export default DetailCheckin
