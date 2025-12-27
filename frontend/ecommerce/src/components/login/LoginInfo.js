import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginProvider'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiBigcartel } from "react-icons/si";

const LoginInfo = () => {

    const { isLogin, loginEmail, setLoginEmail, loginPassword, setLoginPassword, setIsFaEyeOpen, isFaEyeOpen } = useContext(LoginContext)

    return (
        <div className='loginInfo'>
            <div className={`loginSpace ${!isLogin ? 'loginPageHide' : 'loginPageShow'}`}>
                <div><SiBigcartel style={{ fontSize: '2rem', transform: 'translateY(5px)', fontWeight: 'bolder' }} /> <p style={{ display: 'inline', fontSize: '1.2rem' }}>Ecommerce </p></div>
                <div style={{ fontFamily: '"Science Gothic", Roboto', fontSize: '3rem' }}>
                    Sign In
                </div>
                <div style={{ color: 'grey' }}>Please login to your account</div>
                <form>
                    <div className='emailDiv'>
                        <input type='text' name='email' style={{ display: 'block' }} value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} />
                        <label htmlFor='email' hidden={loginEmail.length > 0 ? true : false}>Email Address</label>
                    </div>

                    <div className='passwordDiv'>
                        <input type={isFaEyeOpen ? 'text' : 'password'} name='password' style={{ display: 'block' }} value={loginPassword} onChange={(e) => {
                            setLoginPassword(e.target.value)
                        }} />
                        <label htmlFor='password' hidden={loginPassword.length > 0 ? true : false}>Password</label>
                        {isFaEyeOpen ? <FaEye className='FaEye' onClick={() => { setIsFaEyeOpen(!isFaEyeOpen) }} /> :
                            <FaEyeSlash className='FaEyeSlash' onClick={() => { setIsFaEyeOpen(!isFaEyeOpen) }} />
                        }
                    </div>
                    <div className='forgetPassword'>forget password?</div>
                    <button className='loginButton' type='submit'>Login</button>
                </form>

                <div className='oAuthLogin'>
                    <p style={{ textAlign: 'center' }}>Or Login with</p>
                    <div className='oAuthButton'>
                        <button className='googleButton'>
                            <FcGoogle style={{ fontSize: '1.5rem' }} /> <span style={{ transform: 'translateY(2px)' }}>Google</span>
                        </button>
                        <button className='facebookButton'>
                            <FaSquareFacebook style={{ fontSize: '1.5rem', fill: 'blue' }} /> <span style={{ transform: 'translateY(2px' }}>Facebook</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginInfo