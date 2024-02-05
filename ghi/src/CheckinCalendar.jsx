import React, { useState, useEffect } from 'react'
import { useGetAllCheckinsQuery } from './app/apiSlice'

function CheckinsList() {
    const { data: checkins, isLoading } = useGetAllCheckinsQuery()
    console.log(checkins)
    const [startDate, setStartDate] = useState(new Date('02-01-2024'))
    const [endDate, setEndDate] = useState(new Date('02-29-2024'))

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-1" scope="col">
                            date
                        </th>
                        <th className="col-1" scope="col">
                            happy_level
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
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </>
    )
}

export default CheckinsList
