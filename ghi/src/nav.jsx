import { Link, NavLink } from 'react-router-dom'
import {
    useGetTokenQuery,
    useLogoutMutation,
    useSignupMutation,
} from './app/apiSlice'

function Nav() {
    const { data: account } = useGetTokenQuery()

    const [logout] = useLogoutMutation()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    MoodMouse!
                </NavLink>
                <NavLink className="navbar-brand" to="/login">
                    Log In
                </NavLink>
                <NavLink className="navbar-brand" to="/signup">
                    Sign up
                </NavLink>
                <NavLink className="navbar-brand" to="/create">
                    Create a Check In
                </NavLink>

                <NavLink className="navbar-brand" to="/calendar">
                    Check In Calendar
                </NavLink>

                <button
                    onClick={logout}
                    type="button"
                >
                    Logout
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                ></div>
            </div>
        </nav>
    )
}

export default Nav
