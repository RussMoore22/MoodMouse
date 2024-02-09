import React, { useState, useEffect } from 'react'
import {
    useCreateCheckinMutation,
    useCreateRorschachTestMutation,
    useCreateSurveyMutation,
    useGetImagesQuery,
    useGetQuestionQuery,
    useGetAllCheckinsQuery,
} from './app/apiSlice'
import cTime from './cTime'

import { useNavigate } from 'react-router-dom'

function CreateCheckinForm() {
    const [happyLevel, setHappyLevel] = useState('')
    const [survey, setSurvey] = useState(0)
    const [journalEntry, setJournalEntry] = useState('')
    const [rorschachTest, setRorschachTest] = useState(0)

    const [q1Ans, setQ1Ans] = useState('')
    const [q2Ans, setQ2Ans] = useState('')
    const [q3Ans, setQ3Ans] = useState('')
    const [q4Ans, setQ4Ans] = useState('')
    const [q5Ans, setQ5Ans] = useState('')

    const [response, setResponse] = useState('')
    const [rorschachImg, setRorschachImage] = useState({})
    // checkinExist stores check_in_id if it exists
    const [checkinExist, setCheckinExist] = useState(0)

    const [createCheckin, checkinStatus] = useCreateCheckinMutation()
    const [createSurvey, surveyStatus] = useCreateSurveyMutation()
    const [createRorschachTest, rorschachStatus] =
        useCreateRorschachTestMutation()
    const { data: rorschach_imgs, isLoading: r_isLoading } = useGetImagesQuery()
    const { data: checkinList, isloading: checkinListIsLoading } =
        useGetAllCheckinsQuery()
    const navigate = useNavigate()

    const handleHappyLevel = (event) => {
        setHappyLevel(event.target.value)
    }
    const handleJournalEntry = (event) => {
        setJournalEntry(event.target.value)
    }
    const handleQ1 = (event) => {
        setQ1Ans(event.target.value)
    }
    const handleQ2 = (event) => {
        setQ2Ans(event.target.value)
    }
    const handleQ3 = (event) => {
        setQ3Ans(event.target.value)
    }
    const handleQ4 = (event) => {
        setQ4Ans(event.target.value)
    }
    const handleQ5 = (event) => {
        setQ5Ans(event.target.value)
    }
    const handleRorschachResponse = (event) => {
        setResponse(event.target.value)
    }

    function getRandomRorschachImg() {
        if (!r_isLoading) {
            const randomIndex = Math.floor(
                Math.random() * rorschach_imgs.length
            )
            setRorschachImage(rorschach_imgs[randomIndex])
        }
    }
    const { data: question1, isLoading: q1_isLoading } = useGetQuestionQuery(1)
    const { data: question2, isLoading: q2_isLoading } = useGetQuestionQuery(2)
    const { data: question3, isLoading: q3_isLoading } = useGetQuestionQuery(3)
    const { data: question4, isLoading: q4_isLoading } = useGetQuestionQuery(4)
    const { data: question5, isLoading: q5_isLoading } = useGetQuestionQuery(5)
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit button clicked')
        const image = rorschachImg.id
        createRorschachTest({ image, response })
        const q1q = +question1.id
        const q2q = +question2.id
        const q3q = +question3.id
        const q4q = +question4.id
        const q5q = +question5.id
        createSurvey({
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

    useEffect(() => {
        if (surveyStatus.isSuccess && rorschachStatus.isSuccess) {
            setRorschachTest(+rorschachStatus.data.id)
            setSurvey(+surveyStatus.data.survey_id)
        }
    }, [surveyStatus, rorschachStatus])
    useEffect(() => {
        if (survey > 0 && rorschachTest > 0) {
            createCheckin({
                happyLevel,
                journalEntry,
                survey,
                rorschachTest,
            })
        }
    }, [survey, rorschachTest])
    useEffect(() => {
        if (checkinStatus.isSuccess) {
            navigate('/calendar')
        }
    }, [checkinStatus])

    useEffect(() => {
        if (!(rorschach_imgs === undefined)) {
            getRandomRorschachImg()
        }
    }, [rorschach_imgs])

    // finds checkin for current day and if it exists, reoutes to the edit page
    useEffect(() => {
        const today = new Date()
        if (!(checkinList === undefined) && !checkinListIsLoading) {
            console.log(checkinList)
            const checkinToday = checkinList.find(
                (checkin) =>
                    new Date(cTime(checkin.date)).getFullYear() ===
                        today.getFullYear() &&
                    new Date(cTime(checkin.date)).getMonth() === today.getMonth() &&
                    new Date(cTime(checkin.date)).getDate() === today.getDate()
            )
            console.log(
                'here is the checkin for today if it exsists: checkinToday'
            )
            if (checkinToday === undefined) {
                // console.log('no checkin for day')
                setCheckinExist(0)
            } else if (happyLevel == 0) {
                setCheckinExist(checkinToday.check_in_id)
                // navigate(`/checkins/${checkinToday.check_in_id}/edit`)
            }
        }
    }, [checkinList])

    const handleEdit = (event) => {
        event.preventDefault()
        navigate(`/checkins/${checkinExist}/edit`)
    }

    if (checkinExist) {
        return (
            <div className="alert alert-danger" role="alert">
                {`You have already created a checkin for ${
                    new Date().getMonth() + 1
                } / ${new Date().getDate()} / ${new Date().getFullYear()} Do you want to edit it? `}
                <button onClick={handleEdit}>Edit Today's check-in</button>
            </div>
        )
    }

    return (
        <>
            <div>
                {rorschachImg.id ? (
                    <div>
                        <p> Image does exist </p>
                        <img src={rorschachImg.path} width="500" height="600" />
                        <button onClick={getRandomRorschachImg}>
                            {' '}
                            generate new image{' '}
                        </button>
                    </div>
                ) : (
                    <p>
                        Image does not exist! {rorschachImg.path}
                        <button onClick={getRandomRorschachImg}>
                            {' '}
                            Generate{' '}
                        </button>
                    </p>
                )}
            </div>
            <div className="row">
                <form id="user-checkin-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Create a Check In
                    </div>
                    <div>
                        <div className="form-group col-md-6">
                            <label htmlFor="response">What do you see?</label>
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
                            <label htmlFor="happyLevel">Happy Level </label>
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
                                {q1_isLoading ? 'loading...' : question1.prompt}{' '}
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
                                {q2_isLoading ? 'loading...' : question2.prompt}{' '}
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
                                {q3_isLoading ? 'loading...' : question3.prompt}{' '}
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
                                {q4_isLoading ? 'loading...' : question4.prompt}{' '}
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
                                {q5_isLoading ? 'loading...' : question5.prompt}{' '}
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
                            <label htmlFor="journalEntry"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="journalEntry"
                                placeholder="Write your journal entry"
                                onChange={handleJournalEntry}
                                value={journalEntry}
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button type="submit" className="btn btn-info">
                                Submit Check-in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCheckinForm
