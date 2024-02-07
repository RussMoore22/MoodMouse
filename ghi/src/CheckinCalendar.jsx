import React, { useState, useEffect } from 'react'
import { useGetAllCheckinsQuery } from './app/apiSlice'

function CheckinsList() {
    const { data: checkins, isLoading } = useGetAllCheckinsQuery()
    const [startDate, setStartDate] = useState(new Date('02-01-2024'))
    const [endDate, setEndDate] = useState(new Date('02-29-2024'))
    const [selectDate, setSelectDate] = useState(new Date(Date.now()))
    const [calendarCards, setCalendarCards] = useState([])

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
        const end = new Date(endDate.setDate(endDate.getDate()-1)).getDate()
        console.log(start, end, "*****")
        let checkinsMonth = []
        if (checkins.length > 0){
            checkinsMonth = checkins.filter(
                (checkin) =>
            new Date(checkin.date) >= startDate &&
            new Date(checkin.date) < endDate
            )
        }

        console.log("our checkins after filter: ", checkinsMonth)

        let cards = []
        const weekDay = startDate.getDay()
        for (let i = weekDay; i > 0; i--) {
            cards.push({ date: (new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate()-i)
            ).getDate()
            })
        }
        console.log("cards: ",cards)

        for (let i = start; i <= end; i++) {
            console.log("enddate .date(): ", endDate.getDate())
            if (i == (new Date(checkinsMonth[0]?.date)).getDate()) {
                cards.push(checkinsMonth.shift())

            } else {
                cards.push({ date: i })
            }
        }
        const filledCards = cards.length
        for (let i = 1; i <= 48-filledCards; i++){
            cards.push({date: i})
        }
        console.log("cards after going through checkins: ",cards)

    }
    useEffect(() => {
        if (!(checkins === undefined)) {

            MakeCardList()
        }
    }, [isLoading, startDate])

    if (isLoading) return <div>Loading...</div>
    // console.log(checkins)

    return (
        <>
            <button onClick={handleDecrement}>Decrement</button>
            <span>{getMonthYearName(selectDate)}</span>
            <button onClick={handleIncrement}>Increment</button>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-1" scope="col">
                            date
                        </th>
                        <th className="col-1" scope="col">
                            happy_level
                        </th>
                        <th className="col-1" scope="col">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {checkins
                        .filter(function (checkin) {
                            {
                                return (
                                    new Date(checkin.date) >= startDate &&
                                    new Date(checkin.date) < endDate
                                )
                            }
                        })
                        .map((checkin) => {
                            return (
                                <tr
                                    className="table-secondary"
                                    key={checkin.check_in_id}
                                >
                                    <td> {checkin.date}</td>
                                    <td> {checkin.happy_level}</td>
                                    <td> {score(checkin)}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </>
    )
}

export default CheckinsList
