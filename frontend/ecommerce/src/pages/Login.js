import React, { useState } from 'react'
import { SiBigcartel } from "react-icons/si";
import '../styles/login.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFaEyeOpen, setIsFaEyeOpen] = useState(false);

    return (
        <div className='loginPage'>
            <div className='loginInfo'>
                <div className={`loginSpace ${!isLogin && 'loginPageHide'}`}>
                    <div><SiBigcartel style={{ fontSize: '2rem', transform: 'translateY(5px)', fontSize: '1.5rem', fontWeight: 'bolder' }} /> <p style={{ display: 'inline', fontSize: '1.2rem' }}>Ecommerce </p></div>
                    <div style={{ fontFamily: '"Science Gothic", Roboto', fontSize: '3rem' }}>
                        Sign In
                    </div>
                    <div style={{ color: 'grey' }}>Please login to your account</div>
                    <form>
                        <div className='emailDiv'>
                            <input type='text' name='email' style={{ display: 'block' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <label htmlFor='email' hidden={email.length > 0 ? true : false}>Email Address</label>
                        </div>

                        <div className='passwordDiv'>
                            <input type={isFaEyeOpen ? 'text' : 'password'} name='password' style={{ display: 'block' }} value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <label htmlFor='password' hidden={password.length > 0 ? true : false}>Password</label>
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
                                <FcGoogle style={{ fontSize: '1.5rem' }} /> <span style={{ transform: 'translateY(2px' }}>Google</span>
                            </button>
                            <button className='facebookButton'>
                                <FaSquareFacebook style={{ fontSize: '1.5rem', fill: 'blue' }} /> <span style={{ transform: 'translateY(2px' }}>Facebook</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='signupInfo'>
                <div>Sign Up</div>
            </div>
            <div className={`signDesc ${isLogin ? "loginDesc" : "signupDesc"}`}>
                {isLogin ?
                    <div className={`signupModule ${!isLogin && 'signupModuleHide'}`}>
                        <h2 style={{ fontSize: '2rem', fontFamily: "'Inter', sans-serif" }}>Welcome Aboard!</h2>
                        <p style={{ textAlign: 'center' }}>Create your account to unlock all features and enjoy a smooth, personalized experience.</p>
                        <button onClick={() => { setIsLogin(!isLogin) }}>Signup</button>
                    </div>
                    :
                    <div className='signupModule'>
                        <h2 style={{ fontSize: '2rem', fontFamily: "'Inter', sans-serif" }}>Welcome Back!</h2>
                        <p style={{ textAlign: 'center' }}>Sign in to dive back in and make the most of your personalized experience.</p>
                        <button onClick={() => { setIsLogin(!isLogin) }}>Sign In</button>
                    </div>

                }

            </div>


        </div>
    )
}

export default Login