import { Link, NavLink } from 'react-router-dom'
import { useGetTokenQuery, useLogoutMutation, useSignupMutation  } from './app/apiSlice'


function Nav() {
    const { data: account } = useGetTokenQuery()
    console.log({ account })

    const [logout] = useLogoutMutation()

    const [signup] = useSignupMutation()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    MoodMouse!
                </NavLink>
                <NavLink className="navbar-brand" to="/login">
                    Log In
                </NavLink>
                <button
                    onClick={logout}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                > Logout
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button
                    onClick={signup}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                > Sign up
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent">
                </div>
            </div>
        </nav>
    )
}

export default Nav;
