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
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (loginStatus.isSuccess) {
            navigate('/')
        }
        if (loginStatus.isError) {
            console.log(loginStatus)
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
                        Welcome back!
                    </div>
                    {errorMessage.length > 0 && (
                        <div class="alert alert-danger" role="alert">
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
                                placeholder="Your username"
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
                                placeholder="Your password"
                                onChange={handlePassword}
                                value={password}
                            />
                        </div>
                    </div>

                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm
