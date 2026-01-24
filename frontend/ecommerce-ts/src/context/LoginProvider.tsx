import React, { createContext, useState, type ReactNode } from 'react'
import { axiosConnection } from '../axios/axiosConnection';
import { useNavigate } from 'react-router';

export type initLoginContextType = {
    USER_REGISTER: string,
    isLogin: boolean,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
    loginEmail: string,
    setLoginEmail: React.Dispatch<React.SetStateAction<string>>,
    loginPassword: string,
    setLoginPassword: React.Dispatch<React.SetStateAction<string>>,
    isFaEyeOpen: boolean,
    setIsFaEyeOpen: React.Dispatch<React.SetStateAction<boolean>>,
    signupEmail: string,
    setSignupEmail: React.Dispatch<React.SetStateAction<string>>,
    signupPassword: string,
    setSignupPassword: React.Dispatch<React.SetStateAction<string>>,
    signupUserName: string,
    setSignupUserName: React.Dispatch<React.SetStateAction<string>>,
    registerUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    isRegisterSuccess: boolean
    setIsRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
    registerStatus: {
        status: string;
        desc: string;
    }
    loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    isLoginSuccess: boolean
}

export const LoginContext = createContext<initLoginContextType | null>(null);

type loginProviderType = {
    children: ReactNode
}

const LoginProvider = ({ children }: loginProviderType) => {
    const USER_REGISTER: string = '/api/user/register';
    const USER_LOGIN: string = '/api/user/login';

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isFaEyeOpen, setIsFaEyeOpen] = useState(false);

    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupUserName, setSignupUserName] = useState("");

    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const [registerStatus, setRegisterStatus] = useState({
        status: "",
        desc: ""
    });

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registerRequest = {
            name: signupUserName,
            email: signupEmail,
            password: signupPassword
        }

        try {
            const response = await axiosConnection.post(USER_REGISTER, registerRequest);
            console.log("User Registered successfully !!");
            const result = response.data;
            console.log(result);

            setRegisterStatus({
                status: "Success",
                desc: "Your Account Created Successfully!"
            })

            setIsRegisterSuccess(true);
            setSignupEmail("");
            setSignupUserName("");
            setSignupPassword("");
            setTimeout(() => {
                setIsRegisterSuccess(false)
            }, 1000)

            setTimeout(() => {
                setIsLogin(!isLogin);
            }, 1000)
        }
        catch (error: any) {
            setRegisterStatus({
                status: "Failure",
                desc: error.response?.data?.message || "Something went wrong"
            });

            setIsRegisterSuccess(true);

            setTimeout(() => {
                setIsRegisterSuccess(false);
            }, 1500);
        }
    }

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newUser = {
                email: loginEmail,
                password: loginPassword
            }
            const response = await axiosConnection.post(USER_LOGIN, newUser);
            const result = response.data;
            console.log(result)
            setRegisterStatus({
                status: "Success",
                desc: "Login successful. Welcome back!"
            })
            setIsLoginSuccess(true);
            setTimeout(() => {
                navigate("/admin/dashboard")
            }, 1000)
        }
        catch (error: any) {

            setRegisterStatus({
                status: "Failure",
                desc: error.response?.data?.message || "Something went wrong"
            })
            setIsLoginSuccess(true);
            setTimeout(() => {
                setIsLoginSuccess(false)
            }, 1500)
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
            registerUser,
            isRegisterSuccess,
            setIsRegisterSuccess,
            registerStatus,
            loginUser,
            isLoginSuccess
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider