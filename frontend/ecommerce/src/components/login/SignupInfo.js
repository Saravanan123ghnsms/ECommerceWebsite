import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginProvider'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiBigcartel } from "react-icons/si";

const SignupInfo = () => {
    const { signupUserName, setSignupUserName, signupEmail, setSignupEmail, signupPassword, setSignupPassword, isLogin, setIsFaEyeOpen, isFaEyeOpen, registerUser } = useContext(LoginContext);
    return (
        <div className='signupInfo'>
            <div className={`signupSpace ${isLogin ? 'signupHide' : 'signupShow'}`}>
                <div><SiBigcartel style={{ fontSize: '2rem', transform: 'translateY(5px)', fontWeight: 'bolder' }} /> <p style={{ display: 'inline', fontSize: '1.2rem' }}>Ecommerce </p></div>
                <div style={{ fontFamily: '"Science Gothic", Roboto', fontSize: '3rem' }}>
                    Sign Up
                </div>
                <div style={{ color: 'grey' }}>Please signup your account</div>
                <form>
                    <div className='userNameDiv'>
                        <input type='text' name='username' style={{ display: 'block' }} value={signupUserName} onChange={(e) => { setSignupUserName(e.target.value) }} />
                        <label htmlFor='usesrname' hidden={signupUserName.length > 0 ? true : false}>User Name</label>
                    </div>

                    <div className='emailDiv'>
                        <input type='text' name='email' style={{ display: 'block' }} value={signupEmail} onChange={(e) => { setSignupEmail(e.target.value) }} />
                        <label htmlFor='email' hidden={signupEmail.length > 0 ? true : false}>Email Address</label>
                    </div>

                    <div className='passwordDiv'>
                        <input type={isFaEyeOpen ? 'text' : 'password'} name='password' style={{ display: 'block' }} value={signupPassword} onChange={(e) => {
                            setSignupPassword(e.target.value)
                        }} />
                        <label htmlFor='password' hidden={signupPassword.length > 0 ? true : false}>Password</label>
                        {isFaEyeOpen ? <FaEye className='FaEye' onClick={() => { setIsFaEyeOpen(!isFaEyeOpen) }} /> :
                            <FaEyeSlash className='FaEyeSlash' onClick={() => { setIsFaEyeOpen(!isFaEyeOpen) }} />
                        }
                    </div>

                    <button onClick={(e) => registerUser(e)} className='loginButton' type='submit'>Signup</button>
                </form>

                <div className='oAuthLogin'>
                    <p style={{ textAlign: 'center' }}>Or Login with</p>
                    <div className='oAuthButton'>
                        <button className='googleButton'>
                            <FcGoogle style={{ fontSize: '1.5rem' }} /> <span style={{ transform: 'translateY(2px' }}>Google</span>
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

export default SignupInfo