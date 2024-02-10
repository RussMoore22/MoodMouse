import React, { useState, useEffect } from 'react'
import {
    useGetAllCheckinsQuery,
    useDeleteCheckinMutation,
} from './app/apiSlice'
import { useNavigate } from 'react-router-dom'
import cTime from './cTime'

function CheckinsList() {
    const today = new Date(Date.now())
    const startDateIntialVal = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    )
    const endDateIntialVal = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
        23,
        59,
        59
    )
    const { data: checkins, isLoading, isError } = useGetAllCheckinsQuery()
    const [startDate, setStartDate] = useState(startDateIntialVal)
    const [endDate, setEndDate] = useState(endDateIntialVal)
    const [selectDate, setSelectDate] = useState(new Date(Date.now()))
    const [calendarCards, setCalendarCards] = useState([])
    const navigate = useNavigate()
    const [deleteMode, setDeleteMode] = useState(false)
    const [deleteCheckin, deleteCheckinStatus] = useDeleteCheckinMutation()

    const toggleDeleteMode = () => {
        setDeleteMode(!deleteMode)
    }
    const deleteCard = (event) => {
        deleteCheckin({ checkin_id: event.target.value })
    }

    const handleIncrement = (event) => {
        if (selectDate.getMonth() === 11) {
            setSelectDate(
                new Date(
                    new Date(
                        selectDate.setFullYear(selectDate.getFullYear() + 1)
                    ).setMonth(0)
                )
            )
        } else {
            setSelectDate(
                new Date(selectDate.setMonth(selectDate.getMonth() + 1))
            )
        }
    }
    const handleDecrement = (event) => {
        if (selectDate.getMonth() === 0) {
            setSelectDate(
                new Date(
                    new Date(
                        selectDate.setFullYear(selectDate.getFullYear() - 1)
                    ).setMonth(11)
                )
            )
        } else {
            setSelectDate(
                new Date(selectDate.setMonth(selectDate.getMonth() - 1))
            )
        }
    }
    const getMonthYearName = (selectDate) => {
        const month = selectDate.toLocaleString('default', { month: 'long' })
        const year = selectDate.getFullYear()
        return `${month} ${year}`
    }

    useEffect(() => {
        //first + last day of the selectDate month
        const currentMonth = selectDate.getMonth()
        const currentYear = selectDate.getFullYear()
        setStartDate(new Date(currentYear, currentMonth, 1))
        setEndDate(new Date(currentYear, currentMonth + 1, 0))
    }, [selectDate])

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

    const MakeCardList = () => {
        const start = startDate.getDate()
        const end = endDate.getDate()
        let checkinsMonth = []

        if (checkins.length > 0) {
            checkinsMonth = checkins.filter(
                (checkin) =>
                    new Date(cTime(checkin.date)) >= startDate &&
                    new Date(cTime(checkin.date)) <= endDate
            )
        }

        let cards = []
        const weekDay = startDate.getDay()
        for (let i = weekDay; i > 0; i--) {
            cards.push({
                date: new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() - i
                ).getDate(),
                type: 'muted',
                data: false,
            })
        }

        for (let i = start; i <= end; i++) {
            if (
                !(checkinsMonth[0] === undefined) &&
                i == new Date(cTime(checkinsMonth[0].date)).getDate()
            ) {
                cards.push({
                    date: i,
                    type: 'checkin',
                    data: checkinsMonth.shift(),
                })
            } else {
                cards.push({ date: i, type: 'blank', data: false })
            }
        }
        const filledCards = cards.length
        for (let i = 1; i <= 48 - filledCards; i++) {
            cards.push({ date: i, type: 'muted', data: false })
        }
        let cardMatrix = [[], [], [], [], [], []]
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                cardMatrix[i].push(cards.shift())
            }
        }

        setCalendarCards(cardMatrix)
    }
    useEffect(() => {
        if (
            !(checkins === undefined) &&
            startDate.getMonth() == endDate.getMonth()
        ) {
            MakeCardList()
        }
    }, [checkins, startDate, endDate])

    const dateColor = (card) => {
        if (card.type === 'blank') {
            return 'rgb(240, 240, 240)'
        }
        if (card.type === 'muted') {
            return 'rgb(120, 120, 120)'
        } else if (card.type === 'checkin') {
            let total =
                card.data.happy_level +
                card.data.survey.q1_ans +
                card.data.survey.q2_ans +
                card.data.survey.q3_ans +
                card.data.survey.q4_ans +
                card.data.survey.q5_ans
            const opac = .1 + (.6*total / 24)
            return `rgba(17, 62, 201, ${opac})`
        }
    }
    const handleNavigation = (card) => {
        if (card.type === 'checkin' && !deleteMode) {
            navigate(`/checkins/${card.data.check_in_id}`)
        }
    }

    useEffect(() => {
        if (isError && checkins === undefined) {
            navigate('/error')
        }
    }, [isError])

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            {checkins !== undefined && checkins.length >= 0 && (
<div>
                <h2> My Mood Calendar </h2>
                <div className="d-flex bd-highlight justify-content-center mb-3 mt-5">
                    <div className="flex-fill bd-highlight">
                        <button onClick={handleDecrement}>Prev</button>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h3>{getMonthYearName(selectDate)}</h3>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <button onClick={handleIncrement}>Next</button>
                    </div>
                </div>

                <div className="d-flex bd-highlight justify-content-around">
                    <div className="flex-fill bd-highlight">
                        <h6>Sunday </h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Monday</h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Tuesday</h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Wednesday</h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Thursday</h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Friday</h6>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h6>Saturday</h6>
                    </div>
                </div>
                {calendarCards.map((cardRow) => {
                    return (
                        <div
                            key={`${cardRow[0].date}-${cardRow[0].type}`}
                            className="d-flex bd-highlight card-group"
                        >
                            {cardRow.map((card) => {
                                return (
                                    <div
                                        key={`${card.date}-${card.type}`}
                                        onClick={() => handleNavigation(card)}
                                        className="card p-2 bd-highlight"
                                        style={{
                                            backgroundColor: `${dateColor(
                                                card
                                            )}`,
                                        }}
                                    >
                                        <div className="card-body">
                                            <div className="card-header">
                                                {card.date}
                                            </div>
                                            <h6 className="card-title">
                                            </h6>
                                            {card.type === 'checkin' &&
                                                deleteMode && (
                                                    <button
                                                        value={
                                                            card.data
                                                                .check_in_id
                                                        }
                                                        onClick={deleteCard}
                                                        className="delete-button"
                                                    >
                                                        delete
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <div>
                    <button
                        className="btn btn-outline-danger"
                        onClick={toggleDeleteMode}
                    >
                        delete mode
                    </button>
                </div>
            </div>
            )}
            </>
    )
}

export default CheckinsList;
