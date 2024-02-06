import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    useEditOneCheckinMutation,
    useEditOneSurveyMutation,
    useEditOneRorschachTestMutation,
    useGetOneCheckinQuery
} from './app/apiSlice'


function EditCheckinForm() {

    const params = useParams()
    const { data: checkinData, isLoading: checkinLoading } = useGetOneCheckinQuery(params.checkin_id);

    const [happyLevel, setHappyLevel] = useState('')
    const [journalEntry, setJournalEntry] = useState('')
    const [q1Ans, setQ1Ans] = useState('')
    const [q2Ans, setQ2Ans] = useState('')
    const [q3Ans, setQ3Ans] = useState('')
    const [q4Ans, setQ4Ans] = useState('')
    const [q5Ans, setQ5Ans] = useState('')
    const [response, setResponse] = useState('')
    const [surveyDeploy, setSurveyDeploy] = useState(false)
    const [rorschachDeploy, setRorschachDeploy] = useState(false)
    const [checkinDeploy, setCheckinDeploy] = useState(false)


    const [editCheckin, checkinStatus] = useEditOneCheckinMutation()
    const [editSurvey, surveyStatus] = useEditOneSurveyMutation()
    const [editRorschachTest, rorschachStatus] =
    useEditOneRorschachTestMutation()

    useEffect(() => {
        if (!checkinLoading){
            setHappyLevel(checkinData.happy_level)
            setJournalEntry(checkinData.journal_entry)
            setQ1Ans(checkinData.survey.q1_ans)
            setQ2Ans(checkinData.survey.q2_ans)
            setQ3Ans(checkinData.survey.q3_ans)
            setQ4Ans(checkinData.survey.q4_ans)
            setQ5Ans(checkinData.survey.q5_ans)
            setResponse(checkinData.rorschach_test.response)

        }
    }, [checkinLoading])


    const handleHappyLevel = (event) => {
        setCheckinDeploy(true)
        setHappyLevel(event.target.value)
    }
    const handleJournalEntry = (event) => {
        setCheckinDeploy(true)
        setJournalEntry(event.target.value)
    }
    const handleQ1 = (event) => {
        setSurveyDeploy(true)
        setQ1Ans(event.target.value)
    }
    const handleQ2 = (event) => {
        setSurveyDeploy(true)
        setQ2Ans(event.target.value)
    }
    const handleQ3 = (event) => {
        setSurveyDeploy(true)
        setQ3Ans(event.target.value)
    }
    const handleQ4 = (event) => {
        setSurveyDeploy(true)
        setQ4Ans(event.target.value)
    }
    const handleQ5 = (event) => {
        setSurveyDeploy(true)
        setQ5Ans(event.target.value)
    }
    const handleRorschachResponse = (event) => {
        setRorschachDeploy(true)
        setResponse(event.target.value)
    }


    const handleSubmit = (event) => {

        event.preventDefault()
        console.log('Submit button clicked')
        if (rorschachDeploy) {
            const image = 1
            editRorschachTest({image:checkinData.rorschach_test.image.id, response: response, rorschach_id: 2})
        }

        if (surveyDeploy) {
            const q1q = +question1.id
            const q2q = +question2.id
            const q3q = +question3.id
            const q4q = +question4.id
            const q5q = +question5.id
            editSurvey({
                q1q,
                q1Ans,
                q2q,
                q2Ans,
                q3q,
                q3Ans,
                q4q,
                q4Ans,
                q5q,
                q5Ans,
            })
        }

        if (checkinDeploy) {
            editCheckin({


            })
        }
    }

    if (checkinLoading) {return <div>Loading...</div>}

    return (
            <>
            <div>
            </div>

            <div className="row">
                <form id="user-checkin-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Edit a Check In
                    </div>
                    <div>
                        <div className="form-group col-md-6">
                            <img src={checkinData.rorschach_test.image.path}/>
                            <label htmlFor="response">What you saw...</label>
                            <input
                                type="text"
                                className="form-control"
                                id="response"
                                placeholder="Response"
                                onChange={handleRorschachResponse}
                                value={response}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="happyLevel">How you felt...</label>
                            <input
                                type="number"
                                className="form-control"
                                id="happyLevel"
                                placeholder="0"
                                onChange={handleHappyLevel}
                                value={happyLevel}
                                min="0"
                                max="4"
                            />
                        </div>

                        <div>
                            <label htmlFor="question1">
                                { checkinData.survey.q1.prompt}{' '}
                            </label>
                            <input
                                type="number"
                                name="question1"
                                id="question1"
                                min="0"
                                max="4"
                                onChange={handleQ1}
                                value={q1Ans}
                            />
                        </div>
                        <div>
                            <label htmlFor="question2">
                                { checkinData.survey.q2.prompt}{' '}
                            </label>
                            <input
                                type="number"
                                name="question1"
                                id="question2"
                                min="0"
                                max="4"
                                onChange={handleQ2}
                                value={q2Ans}
                            />
                        </div>
                        <div>
                            <label htmlFor="question3">
                                { checkinData.survey.q3.prompt}{' '}
                            </label>
                            <input
                                type="number"
                                name="question1"
                                id="question3"
                                min="0"
                                max="4"
                                onChange={handleQ3}
                                value={q3Ans}
                            />
                        </div>
                        <div>
                            <label htmlFor="question4">
                                { checkinData.survey.q4.prompt}{' '}
                            </label>
                            <input
                                type="number"
                                name="question1"
                                id="question4"
                                min="0"
                                max="4"
                                onChange={handleQ4}
                                value={q4Ans}
                            />
                        </div>
                        <div>
                            <label htmlFor="question5">
                                { checkinData.survey.q5.prompt}{' '}
                            </label>
                            <input
                                type="number"
                                name="question1"
                                id="question5"
                                min="0"
                                max="4"
                                onChange={handleQ5}
                                value={q5Ans}
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="journalEntry">What you wrote...</label>
                            <textarea
                                type="text"
                                className="form-control form-control-lg"
                                id="journalEntry"
                                placeholder="Write your journal entry"
                                onChange={handleJournalEntry}
                                value={journalEntry}
                                rows="15"
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button type="submit" className="btn btn-primary">
                                Submit Check-in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditCheckinForm;
