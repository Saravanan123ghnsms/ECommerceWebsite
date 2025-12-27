
import '../styles/login.css'
import LoginInfo from '../components/login/LoginInfo';
import SignupInfo from '../components/login/SignupInfo';
import SignLoginDesc from '../components/login/SignLoginDesc';
import LoginNotification from '../components/login/LoginNotification';

const Login = () => {

    return (
        <div className='loginPage'>
            <LoginInfo />
            <SignupInfo />
            <SignLoginDesc />
            <LoginNotification />
        </div>
    )
}

export default Login