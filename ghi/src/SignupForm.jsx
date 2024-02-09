import React, { useState, useEffect } from 'react'
import { useSignupMutation } from './app/apiSlice'

function SignupForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signup] = useSignupMutation()

    const handleSubmit = async (event) => {
        event.preventDefault()
        signup({
            firstName,
            lastName,
            email,
            username,
            password,
        });
    };
        const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };
    const handleUsername = (event) => {
        setUsername(event.target.value)
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    };

    return (
        <>
            <div className="row">
                <form id="user-signup-form" onSubmit={handleSubmit}>
                    <div className="form-group col-md-12 mt-3">
                        Sign up here
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="first_name"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="First Name"
                                onChange={handleFirstName}
                                value={firstName}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="last_name"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Last Name"
                                onChange={handleLastName}
                                value={lastName}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Your email"
                                onChange={handleEmail}
                                value={email}
                            />
                        </div>
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
                        <div className="form-group col-md-6">
                            <label htmlFor="confirm_password"></label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                placeholder="Confirm your password"
                                onChange={handleConfirmPassword}
                                value={confirmPassword}
                            />
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <div className="col-md-10">
                            <button type="submit" className="btn btn-info">
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignupForm;
