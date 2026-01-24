import { useContext } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { LoginContext } from '../../context/LoginProvider';

const LoginNotification = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error("Login Context is missing...");
  }
  const { isRegisterSuccess, registerStatus, isLoginSuccess } = context;
  return (
    <div className={`${isRegisterSuccess ? "registerNotification" : isLoginSuccess ? "loginNotification" : ""}`}>
      <div className='notifyMsg' style={{ paddingTop: ".8rem", paddingInline: "1rem" }}>
        <div>
          <h2 style={{ marginBottom: "5px", }}>{registerStatus.status}</h2>
          <p style={{ marginBottom: "10px" }}>{registerStatus.desc}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          {
            registerStatus.status === 'Success' ?
              <SiTicktick style={{ fill: "green", fontSize: "1.5rem" }} />
              :
              <IoIosCloseCircle style={{ fill: "red", fontSize: "1.5rem" }} />
          }
        </div>
      </div>
      <div className={`${(isRegisterSuccess || isLoginSuccess) && "loginMsgLoading"}`} style={{ backgroundColor: registerStatus.status === 'Success' ? " rgb(10, 191, 10)" : "red" }} />

    </div>
  )
}

export default LoginNotification