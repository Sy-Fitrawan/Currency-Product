import React, { Fragment, useRef, useState, useEffect } from 'react'
import './LoginSignUp.css'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction'
import { useAlert } from 'react-alert'

const LoginSignUp = ({ history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loading, isAuthenticated  } = useSelector((state) => state.user)

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginNik, setLoginNik] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        nik: "",
        password: "",
    })

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginNik, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        dispatch(register(user))
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

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isAuthenticated){
            history.push('/product')
        }
    }, [dispatch, error, alert, history, isAuthenticated])

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
                                        type="number"
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
                                <div className="name">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={user.name}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                    />
                                </div>
                                <div className="email">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                    />
                                </div>
                                <div className="nik">
                                    <input
                                        type="number"
                                        placeholder="Nik"
                                        required
                                        value={user.nik}
                                        onChange={(e) => setUser({...user, nik: e.target.value})}
                                    />
                                </div>
                                <div className="password">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={user.password}
                                        onChange={(e) => setUser({...user, password: e.target.value})}
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