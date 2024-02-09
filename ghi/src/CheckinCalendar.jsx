import React, { useState, useEffect } from 'react'
import { useGetAllCheckinsQuery, useDeleteCheckinMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

function CheckinsList() {
    const { data: checkins, isLoading } = useGetAllCheckinsQuery()
    const [startDate, setStartDate] = useState(new Date('02-01-2024'))
    const [endDate, setEndDate] = useState(new Date('02-29-2024'))
    const [selectDate, setSelectDate] = useState(new Date(Date.now()))
    const [calendarCards, setCalendarCards] = useState([])
    const navigate = useNavigate()
    const [deleteMode, setDeleteMode] = useState(false)
    const [deleteCheckin, deleteCheckinStatus] = useDeleteCheckinMutation()

    const toggleDeleteMode = () => {
        setDeleteMode(!deleteMode)
    }
    const deleteCard = (event) => {
        deleteCheckin({checkin_id: event.target.value})
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
        setEndDate(new Date(currentYear, currentMonth + 1, 1))
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
        const end = new Date(endDate.setDate(endDate.getDate() - 1)).getDate()

        let checkinsMonth = []
        if (checkins.length > 0) {
            checkinsMonth = checkins.filter(
                (checkin) =>
                    new Date(checkin.date) >= startDate &&
                    new Date(checkin.date) < endDate
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
            if (i == new Date(checkinsMonth[0]?.date).getDate()) {
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
        if (!(checkins === undefined)) {
            MakeCardList()
        }
    }, [checkins, startDate])

    const dateColor = (card) => {
        if (card.type === 'blank') {
            return 'rgb(240, 240, 240)'
        }
        if (card.type === 'muted') {
            return 'rgb(120, 120, 120)'
        } else {
            let total =
                card.data.happy_level +
                card.data.survey.q1_ans +
                card.data.survey.q2_ans +
                card.data.survey.q3_ans +
                card.data.survey.q4_ans +
                card.data.survey.q5_ans
            const red = 255 - Math.floor(255 * (total / 24))
            return `rgb(${red}, 255, 255)`
        }
    }
    const handleNavigation = (card) => {
        if (card.type === 'checkin' && !deleteMode) {
            navigate(`/checkins/${card.data.check_in_id}`)
        }
    }
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <div>
                <div>
                    <button onClick={toggleDeleteMode}>delete mode</button>
                </div>
                <h2> My Mood Calendar </h2>
                <div className="d-flex bd-highlight justify-content-center mb-3 mt-5">
                    <div className="flex-fill bd-highlight">
                        <button onClick={handleDecrement}>Decrement</button>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <h3>{getMonthYearName(selectDate)}</h3>
                    </div>
                    <div className="flex-fill bd-highlight">
                        <button onClick={handleIncrement}>Increment</button>
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
                        <div className="d-flex bd-highlight card-group">
                            {cardRow.map((card) => {
                                return (
                                    <div
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
                                                {/* {card.data?.happy_level} */}
                                            </h6>
                                            { (card.type === 'checkin') && (deleteMode) && <button value={card.data.check_in_id} onClick={deleteCard}>delete</button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CheckinsList
