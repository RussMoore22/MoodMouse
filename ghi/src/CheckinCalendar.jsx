import { useGetAllCheckinsQuery } from './app/apiSlice'

function CheckinsList() {
    const { data: checkins, isLoading } = useGetAllCheckinsQuery()
    console.log(checkins)
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-1" scope="col">
                            id
                        </th>
                        <th className="col-1" scope="col">
                            User id
                        </th>
                        <th className="col-1" scope="col">
                            date
                        </th>
                        <th className="col-1" scope="col">
                            updated date
                        </th>
                        <th className="col-1" scope="col">
                            happy_level
                        </th>
                        <th className="col-1" scope="col">
                            journal
                        </th>
                        <th className="col-1" scope="col">
                            question
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {checkins
                        .filter(function (i) {
                            return i.bin.location.room.room_id == room
                        })
                        .map((checkin) => {
                            return (
                                <tr
                                    className="table-secondary"
                                    key={checkin.check_in_id}
                                >
                                    <td> {checkin.account} </td>
                                    <td> {checkin.date}</td>
                                    <td>
                                        {checkin.updated_date}
                                        {/* <button
                                        onClick={() =>
                                            handleDelete(checkin.check_in_id)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button> */}
                                    </td>
                                    <td> {checkin.happy_level}</td>
                                    <td> {checkin.journal_entry}</td>
                                    <td> {checkin.survey.q1.prompt}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </>
    )
}

export default CheckinsList
