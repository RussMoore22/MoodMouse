import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    useEditOneCheckinMutation,
    useEditOneSurveyMutation,
    useEditOneRorschachTestMutation,
    useGetOneCheckinQuery,
} from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

function EditCheckinForm() {
    const params = useParams()
    const {
        data: checkinData,
        isLoading: checkinLoading,
        isError: checkinError,
    } = useGetOneCheckinQuery(params.checkin_id)
    const navigate = useNavigate()

    const [happyLevel, setHappyLevel] = useState(0)
    const [journalEntry, setJournalEntry] = useState('')
    const [q1Ans, setQ1Ans] = useState(0)
    const [q2Ans, setQ2Ans] = useState(0)
    const [q3Ans, setQ3Ans] = useState(0)
    const [q4Ans, setQ4Ans] = useState(0)
    const [q5Ans, setQ5Ans] = useState(0)
    const [response, setResponse] = useState('')
    const [surveyDeploy, setSurveyDeploy] = useState(false)
    const [rorschachDeploy, setRorschachDeploy] = useState(false)
    const [checkinDeploy, setCheckinDeploy] = useState(false)
    const [edit, setEdit] = useState(false)

    const [editCheckin, checkinStatus] = useEditOneCheckinMutation()
    const [editSurvey, surveyStatus] = useEditOneSurveyMutation()
    const [editRorschachTest, rorschachStatus] =
        useEditOneRorschachTestMutation()

    useEffect(() => {
        if (!checkinLoading && !checkinError) {
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
        if (rorschachDeploy) {
            editRorschachTest({
                image: checkinData.rorschach_test.image.id,
                response: response,
                rorschach_id: checkinData.rorschach_test.id,
            })
        }

        if (surveyDeploy) {
            editSurvey({
                q1: checkinData.survey.q1.id,
                q1Ans,
                q2: checkinData.survey.q2.id,
                q2Ans,
                q3: checkinData.survey.q3.id,
                q3Ans,
                q4: checkinData.survey.q4.id,
                q4Ans,
                q5: checkinData.survey.q5.id,
                q5Ans,
                survey_id: checkinData.survey.survey_id,
            })
        }

        if (checkinDeploy) {
            editCheckin({
                happyLevel,
                journalEntry,
                survey: checkinData.survey.survey_id,
                rorschachTest: checkinData.rorschach_test.id,
                checkin_id: checkinData.check_in_id,
            })
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        navigate('/calendar')
    }

    useEffect(() => {
        if (checkinDeploy || surveyDeploy || rorschachDeploy) {
            let navReady = true
            if (checkinDeploy && !checkinStatus.isSuccess) {
                navReady = false
            }
            if (surveyDeploy && !surveyStatus.isSuccess) {
                navReady = false
            }
            if (rorschachDeploy && !rorschachStatus.isSuccess) {
                navReady = false
            }
            if (navReady) {
                navigate('/calendar')
            }
        }
    }, [checkinStatus, surveyStatus, rorschachStatus])

    useEffect(() => {
        if (checkinDeploy || surveyDeploy || rorschachDeploy) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    }, [checkinDeploy, surveyDeploy, rorschachDeploy])

    useEffect(() => {
        if (checkinError) {
            navigate('/error')
        }

    }, [checkinError])

    if (checkinLoading) return <div>Loading....</div>

    return (
        <>
            {checkinData && (
            <div className="row">
                <form id="user-checkin-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Edit a Check In
                    </div>
                    <div></div>
                    <div className="form-group col-md-6">
                        <label htmlFor="happyLevel">How you felt...</label>
                        <input
                            type="range"
                            className="form-range"
                            name="happylevel"
                            id="happyLevel"
                            placeholder="0"
                            onChange={handleHappyLevel}
                            value={happyLevel}
                            min="0"
                            max="4"
                        />
                    </div>

                    <div>
                        <label htmlFor="question1" className="form-label">
                            {checkinData.survey.q1.prompt}{' '}
                        </label>
                        <input
                            type="range"
                            className="form-range"
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
                            {checkinData.survey.q2.prompt}{' '}
                        </label>
                        <input
                            type="range"
                            className="form-range"
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
                            {checkinData.survey.q3.prompt}{' '}
                        </label>
                        <input
                            type="range"
                            className="form-range"
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
                            {checkinData.survey.q4.prompt}{' '}
                        </label>
                        <input
                            type="range"
                            className="form-range"
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
                            {checkinData.survey.q5.prompt}{' '}
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            name="question1"
                            id="question5"
                            min="0"
                            max="4"
                            onChange={handleQ5}
                            value={q5Ans}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <img src={checkinData.rorschach_test.image.path} />
                        <label htmlFor="response">What you saw...</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="response"
                            placeholder="Response"
                            onChange={handleRorschachResponse}
                            value={response}
                        />

                        <div className="form-group col-md-6">
                            <label htmlFor="journalEntry">
                                What you wrote...
                            </label>
                            <textarea
                                type="text"
                                className="form-control form-control-lg"
                                id="journalEntry"
                                placeholder="Write your journal entry"
                                onChange={handleJournalEntry}
                                value={journalEntry}
                                rows="10"
                                cols="200"
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            {edit ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="submit-button"
                                    >
                                        Edit
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleCancel}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default EditCheckinForm
