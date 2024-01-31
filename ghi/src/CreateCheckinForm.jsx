import React, { useState, useEffect } from 'react'
import {
    useCreateCheckinMutation,
    useCreateRorschachTestMutation,
    useCreateSurveyMutation,
    useGetImagesQuery,
    useGetQuestionQuery
} from './app/apiSlice'

function CreateCheckinForm() {
    const [date, setDate] = useState('')
    const [updatedDate, setUpdatedDate] = useState('')
    const [happyLevel, setHappyLevel] = useState('')
    const [journalEntry, setJournalEntry] = useState('')
    const [survey, setSurvey] = useState('')
    const [rorscachTest, setRorscachTest] = useState('')

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

    const [createCheckin] = useCreateCheckinMutation()
    const [createSurvey] = useCreateSurveyMutation()
    const [createRorschachTest] = useCreateRorschachTestMutation()

    const [rorschachImg, setRorschachImage] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit button clicked')
        createRorschachTest({image, response})

    }
    const handleHappyLevel = (event) => {
        setHappyLevel(event.target.value)
    }

    const {data: rorschach_imgs} = useGetImagesQuery()
    function getRandomRorschachImg() {
        const randomIndex = Math.random() * rorschach_imgs.length
        setRorschachImage(rorschach_imgs[randomIndex])

    }
    console.log(rorschach_imgs)


    return (
        <>
        <div>
            {!rorschachImg.id ? <p> Image does not exist </p>:
            <p>Image does exist! {rorschachImg.path} </p>}

        </div>
            <div className="row">
                <form id="user-signup-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Create a Checkin
                    </div>
                    <div>

                        <div className="form-group col-md-6">
                            <label htmlFor="happyLevel"></label>
                            <input
                                type="number"
                                className="form-control"
                                id="happyLevel"
                                placeholder="0"
                                onChange={handleHappyLevel}
                                value={happyLevel}
                            />
                        </div>

                    </div>

                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button type="submit" className="btn btn-primary">Submit Check-in</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCheckinForm
