import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetOneCheckinQuery,

} from './app/apiSlice'

function DetailCheckin() {
    const params = useParams()
    const { data: checkin, isLoading: checkinIsLoading } = useGetOneCheckinQuery(params.checkin_id)

    if (checkinIsLoading) { return <div> Loading...</div>}
    console.log(checkin)
    return (
        <>
            <p>Test</p>
        </>
    )
}

export default DetailCheckin
