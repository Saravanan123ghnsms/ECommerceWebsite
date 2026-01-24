
import LoginInfo from '../components/login/LoginInfo';
import LoginNotification from '../components/login/LoginNotification';
import SignLoginDesc from '../components/login/SignLoginDesc';
import SignupInfo from '../components/login/SignupInfo';
import LoginProvider from '../context/LoginProvider';
import '../styles/login.css';

const Login = () => {

    return (
        <div className='loginPage'>
            <LoginProvider>
                <LoginInfo />
                <SignupInfo />
                <SignLoginDesc />
                <LoginNotification />
            </LoginProvider>
        </div>
    )
}

export default Login