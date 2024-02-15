import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOneCheckinQuery } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'
import cTime from './cTime'

function DetailCheckin() {
    const params = useParams()
    const {
        data: checkin,
        isLoading: checkinIsLoading,
        isError: checkinError,
    } = useGetOneCheckinQuery(params.checkin_id)
    let navigate = useNavigate()

    useEffect(() => {
        if (checkinError) {
            navigate('/error')
        }

    }, [checkinError])

    if (checkinIsLoading) return <div>Loading....</div>

    const score = (checkin) => {
        return (
            checkin.happy_level +
            checkin.survey.q1_ans +
            checkin.survey.q2_ans +
            checkin.survey.q3_ans +
            checkin.survey.q4_ans +
            checkin.survey.q5_ans
        )
    }

    const handleEdit = () => {
        navigate(`/checkins/${checkin.check_in_id}/edit`)
    }

    return (
        <>
            {checkin && (
                <div>
                    <div>
                        {cTime(new Date(checkin.date)).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'long',
                            year: 'numeric',
                            day: 'numeric',
                        })}
                    </div>
                    <div>
                        Mood score: {score(checkin)}
                        <p> Put image here </p>
                    </div>
                    <span>
                        <div className="col-md-10">
                            <button
                                className="btn btn-primary"
                                onClick={handleEdit}
                            >
                                Edit Mode
                            </button>
                        </div>
                    </span>
                    <div>
                        <h3>How you felt</h3>
                        <p>
                            {checkin.survey.q1.prompt}
                            <span>
                                <meter
                                    id="Question 1"
                                    value={checkin.survey.q1_ans}
                                    min="0"
                                    max="4"
                                ></meter>
                            </span>
                        </p>
                        <p>
                            {checkin.survey.q2.prompt}
                            <span>
                                <meter
                                    id="Question 2"
                                    value={checkin.survey.q2_ans}
                                    min="0"
                                    max="4"
                                ></meter>
                            </span>
                        </p>
                        <p>
                            {checkin.survey.q3.prompt}
                            <span>
                                <meter
                                    id="Question 3"
                                    value={checkin.survey.q3_ans}
                                    min="0"
                                    max="4"
                                ></meter>
                            </span>
                        </p>
                        <p>
                            {checkin.survey.q4.prompt}
                            <span>
                                <meter
                                    id="Question 4"
                                    value={checkin.survey.q4_ans}
                                    min="0"
                                    max="4"
                                ></meter>
                            </span>
                        </p>
                        <p>
                            {checkin.survey.q5.prompt}
                            <span>
                                <meter
                                    id="Question 5"
                                    value={checkin.survey.q5_ans}
                                    min="0"
                                    max="4"
                                ></meter>
                            </span>
                        </p>
                    </div>
                    <div>
                        <h3>What you wrote</h3>
                        <p>{checkin.journal_entry}</p>
                    </div>

                    <div>
                        <h3>What you saw</h3>
                        <img src={checkin.rorschach_test.image.path} />
                        <p>{checkin.rorschach_test.response}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default DetailCheckin
