import React, { createContext, useState } from 'react'
import { axiosConnection } from '../axios/axiosConnection';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const USER_REGISTER = '/api/user/register';

    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isFaEyeOpen, setIsFaEyeOpen] = useState(false);

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupUserName, setSignupUserName] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        const registerRequest = {
            "name": signupUserName,
            "email": signupEmail,
            "password": signupPassword
        }
        const response = await axiosConnection.post(USER_REGISTER, registerRequest);
        try {
            console.log("User Registered successfully !!");
            const result = response.data;
            console.log(result);
            setIsLogin(!isLogin);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <LoginContext.Provider value={{
            USER_REGISTER,
            isLogin,
            setIsLogin,
            loginEmail,
            setLoginEmail,
            loginPassword,
            setLoginPassword,
            isFaEyeOpen,
            setIsFaEyeOpen,
            signupEmail,
            setSignupEmail,
            signupPassword,
            setSignupPassword,
            signupUserName,
            setSignupUserName,
            registerUser
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider