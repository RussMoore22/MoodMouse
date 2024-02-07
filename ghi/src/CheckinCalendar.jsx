import React, { useState, useEffect } from 'react'
import { useGetAllCheckinsQuery } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

function CheckinsList() {
    const { data: checkins, isLoading } = useGetAllCheckinsQuery()
    const [startDate, setStartDate] = useState(new Date('02-01-2024'))
    const [endDate, setEndDate] = useState(new Date('02-29-2024'))
    const [selectDate, setSelectDate] = useState(new Date(Date.now()))
    const [calendarCards, setCalendarCards] = useState([])
    const navigate = useNavigate()

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
    }, [isLoading, startDate])

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
        if (card.type === 'checkin') {
            navigate(`/checkins/${card.data.check_in_id}`)
        }
    }
    if (isLoading) return <div>Loading...</div>
    // console.log(checkins)

    return (
        <>
            <div>
                <h1> Calendar </h1>
                <button onClick={handleDecrement}>Decrement</button>
                <span>{getMonthYearName(selectDate)}</span>
                <button onClick={handleIncrement}>Increment</button>
                <div className="d-flex flex-wrap bd-highlight card-group">
                    <div className="d-flex bd-highlight card-group">Sunday</div>
                    <div className="d-flex bd-highlight card-group">Monday</div>
                    <div className="d-flex bd-highlight card-group">
                        Tuesday
                    </div>
                    <div className="d-flex bd-highlight card-group">
                        Wednesday
                    </div>
                    <div className="d-flex bd-highlight card-group">
                        Thursday
                    </div>
                    <div className="d-flex bd-highlight card-group">Friday</div>
                    <div className="d-flex bd-highlight card-group">
                        Saturday
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
