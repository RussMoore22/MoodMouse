import { Link, NavLink } from 'react-router-dom'
import { useGetTokenQuery } from './app/apiSlice'

function Nav() {
    const { data: account } = useGetTokenQuery()
    console.log({ account })

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    CarCar
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                role="button"
                                aria-expanded="false"
                            >
                                Inventory
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <NavLink
                                        className="dropdown-item"
                                        to="/"
                                        end
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Home Page
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
