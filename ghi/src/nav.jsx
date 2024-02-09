import { NavLink, Navigate } from 'react-router-dom'
import { useGetTokenQuery, useLogoutMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Nav() {
    const { data: account } = useGetTokenQuery()

    const [logout, logoutStatus] = useLogoutMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (logoutStatus.isSuccess) {
            navigate('/')
        }
    }, [logoutStatus])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    MoodMouse
                </NavLink>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!account && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Log In
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">
                                        Sign up
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {account && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/create">
                                        Create a Check In
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/calendar"
                                    >
                                        Check In Calendar
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={logout}
                                        className="btn btn-outline-danger"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
