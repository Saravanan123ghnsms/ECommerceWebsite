import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginProvider'

const SignLoginDesc = () => {
    const { isLogin, setIsLogin } = useContext(LoginContext);
    return (
        <div className={`signDesc ${isLogin ? "loginDesc" : "signupDesc"}`}>
            {isLogin ?
                <div key={isLogin} className={`signupModule`}>
                    <h2 style={{ fontSize: '2rem' }}>Welcome Aboard!</h2>
                    <p style={{ textAlign: 'center' }}>Create your account to unlock all features and enjoy a smooth, personalized experience.</p>
                    <button onClick={() => { setIsLogin(!isLogin) }}>Signup</button>
                </div>
                :
                <div key={isLogin} className='signinModule'>
                    <h2 style={{ fontSize: '2rem' }}>Welcome Back!</h2>
                    <p style={{ textAlign: 'center' }}>Sign in to dive back in and make the most of your personalized experience.</p>
                    <button onClick={() => { setIsLogin(!isLogin) }}>Sign In</button>
                </div>
            }

        </div>
    )
}

export default SignLoginDesc