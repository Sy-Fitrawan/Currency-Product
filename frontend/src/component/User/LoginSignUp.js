import React, { Fragment, useRef, useState } from 'react'
import './LoginSignUp.css'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userAction'

const LoginSignUp = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector((state) => state.user)

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginNik, setLoginNik] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signUpName, setSignUpName] = useState("")
    const [signUpNik, setSignUpNik] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginNik, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", signUpName)
        myForm.set("nik", signUpNik)
        myForm.set("email", signUpEmail)
        myForm.set("password", signUpPassword)
        // dispatch(register(myForm))

        console.log("Register Form Submited");
    }

    const switchTabs = (e, tab) => {
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")
            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginNik">
                                    <input
                                        type="text"
                                        placeholder="Nik"
                                        required
                                        value={loginNik}
                                        onChange={(e) => setLoginNik(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forgot Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={signUpName}
                                        onChange={(e) => setSignUpName(e.target.value)}
                                    />
                                </div>
                                <div className="signUpNik">
                                    <input
                                        type="text"
                                        placeholder="Nik"
                                        required
                                        name="Nik"
                                        value={signUpNik}
                                        onChange={(e) => setSignUpNik(e.target.value)}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="Email"
                                        value={signUpEmail}
                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={signUpPassword}
                                        onChange={(e) => setSignUpPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="signUpBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default LoginSignUp