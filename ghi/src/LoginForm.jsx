import React, { useState, useEffect } from 'react'
import { useLoginMutation } from './app/apiSlice'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, loginStatus] = useLoginMutation()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        login({ username, password })
    };
    const handleUsername = (event) => {
        setUsername(event.target.value)
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (loginStatus.isSuccess) {
            navigate('/')
        }
        if (loginStatus.isError) {
            setErrorMessage(loginStatus.error.data.detail)
        }
    }, [loginStatus])

    useEffect(() => {
        if (loginStatus.isError) {
            setErrorMessage('')
        }
    }, [username, password])

    return (
        <>
            <div className="row">
                <form id="user-login-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        <h2>Welcome back!</h2>
                    </div>
                    {errorMessage.length > 0 && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="username"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                onChange={handleUsername}
                                value={username}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password"></label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                onChange={handlePassword}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button className="btn btn-info">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm;
