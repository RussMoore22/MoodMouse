import React, { useState, useEffect } from 'react'
import {
    useCreateCheckinMutation,
    useCreateRorschachTestMutation,
    useCreateSurveyMutation,
    useGetImagesQuery,
    useGetQuestionQuery,
} from './app/apiSlice'

function CreateCheckinForm() {
    const [date, setDate] = useState('')
    const [updatedDate, setUpdatedDate] = useState('')
    const [happyLevel, setHappyLevel] = useState('')
    const [survey, setSurvey] = useState(0)
    const [journalEntry, setJournalEntry] = useState('')
    const [rorschachTest, setRorschachTest] = useState(0)

    const [q1, setQ1] = useState('')
    const [q1Ans, setQ1Ans] = useState('')

    const [q2, setQ2] = useState('')
    const [q2Ans, setQ2Ans] = useState('')

    const [q3, setQ3] = useState('')
    const [q3Ans, setQ3Ans] = useState('')

    const [q4, setQ4] = useState('')
    const [q4Ans, setQ4Ans] = useState('')

    const [q5, setQ5] = useState('')
    const [q5Ans, setQ5Ans] = useState('')

    const [image, setImage] = useState('')
    const [response, setResponse] = useState('')
    const [rorschachImg, setRorschachImage] = useState({})
    const [questions, setQuestions] = useState([])

    const [createCheckin, checkinStatus] = useCreateCheckinMutation()
    const [createSurvey, surveyStatus] = useCreateSurveyMutation()
    const [createRorschachTest, rorschachStatus] = useCreateRorschachTestMutation()
    const { data: rorschach_imgs, isLoading: r_isLoading } = useGetImagesQuery()
    let nowJSON = new Date(Date.now()).toJSON()


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

    function getRandomRorschachImg() {
        if (!r_isLoading) {
            const randomIndex = Math.floor(
                Math.random() * rorschach_imgs.length
            )
            console.log(rorschach_imgs[randomIndex])
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
    const image_id = 1
    createRorschachTest({ image_id, response })
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

    if (!surveyStatus.isLoading && !rorschachStatus.isLoading && checkinStatus.isUninitialized){
        if (surveyStatus.isSuccess && rorschachStatus.isSuccess){
            // const now = ((new Date(Date.now())).toJSON()
            const e = (new Date(Date.now())).toISOString()
            setDate("1975-08-19T23:15:30.000Z")
            setUpdatedDate("1975-08-19T23:15:30.000Z")
            console.log("testing the survey:", surveyStatus)
            console.log("testing the rorschach:", rorschachStatus)
            setRorschachTest(+rorschachStatus.data.id)
            setSurvey(+surveyStatus.data.survey_id)
            createCheckin({
                    date,
                    updatedDate,
                    happyLevel,
                    journalEntry,
                    survey,
                    rorschachTest
            })

    if (checkinStatus.isError){
        console.log(checkinStatus)
        }
        }
    }

    function getQuestions() {
        // if (
        //     !(
        //         q1_isLoading &&
        //         q2_isLoading &&
        //         q3_isLoading &&
        //         q4_isLoading &&
        //         q5_isLoading
        //     )
        // ) {
        //     const arr = [question1, question2, question3, question4, question5]
        //     setQuestions(arr)
        // }
        const arr = []
        if (!q1_isLoading) {
            arr.push({question: question1, ans: q1Ans})
            if (!q2_isLoading) {
                arr.push(question2)
                if (!q3_isLoading) {
                    arr.push(question3)
                    if (!q4_isLoading) {
                        arr.push(question4)
                        if (!q5_isLoading) {
                            arr.push(question5)
                        }
                    }
                }
            }
        }
        setQuestions(arr)

    }

    // questions state contains 5 question objects
    // const { data: question, isLoading: q_isLoading } = useGetQuestionQuery()
    // function getQuestions() {
    //     const question_ids = [1, 2, 3, 4, 5]
    //     const arr = []
    //     for (const question_id of question_ids) {
    //         const { data: question, isLoading: q_isLoading } =
    //             useGetQuestionQuery(question_id)
    //         // console.log(question)
    //         if (!q_isLoading) {
    //             arr.push(question)
    //         }
    //         setQuestions(arr)
    //     }
    // }
    useEffect(() => {
        getRandomRorschachImg()
        getQuestions()
    }, [rorschach_imgs, question1, question2, question3, question4, question5])

    console.log(rorschach_imgs)
    console.log(questions)

    return (
        <>
            <div>
                {rorschachImg.id ? (
                    <div>
                        <p> Image does exist </p>
                        <img src={rorschachImg.path} width="500" height="600" />
                        <button onClick={getRandomRorschachImg}>
                            {' '}
                            generate{' '}
                        </button>
                    </div>
                ) : (
                    <p>
                        Image does not exist! {rorschachImg.path}
                        <button onClick={getRandomRorschachImg}>
                            {' '}
                            generate{' '}
                        </button>
                    </p>
                )}
            </div>
            {/* <div>
                {questions.map((question) => <p>{question.prompt}</p>)}
            </div> */}

            <div className="row">
                <form id="user-checkin-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Create a Check In
                    </div>
                    <div>
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
                            <label for="question1">{ q1_isLoading ? 'loading...' : question1.prompt } </label>
                            <input type="number" name="question1" id="question1" min="0" max="4" onChange={handleQ1} value={q1Ans} />
                        </div>
                        <div>
                            <label for="question2">{ q2_isLoading ? 'loading...' : question2.prompt } </label>
                            <input type="number" name="question1" id="question2" min="0" max="4" onChange={handleQ2} value={q2Ans} />
                        </div>
                        <div>
                            <label for="question3">{ q2_isLoading ? 'loading...' : question3.prompt } </label>
                            <input type="number" name="question1" id="question3" min="0" max="4" onChange={handleQ3} value={q3Ans} />
                        </div>
                        <div>
                            <label for="question4">{ q2_isLoading ? 'loading...' : question4.prompt } </label>
                            <input type="number" name="question1" id="question4" min="0" max="4" onChange={handleQ4} value={q4Ans} />
                        </div>
                        <div>
                            <label for="question5">{ q2_isLoading ? 'loading...' : question5.prompt } </label>
                            <input type="number" name="question1" id="question5" min="0" max="4" onChange={handleQ5} value={q5Ans} />
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

export default CreateCheckinForm
