import { useContext } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { LoginContext } from '../../context/LoginProvider';
import { CreateGlobalContext } from '../../context/GlobalContextProvider';

const GlobalNotification = () => {
  const globalContext = useContext(CreateGlobalContext);
  if (!globalContext) {
    throw Error("Please verify global context is missing!");
  }
  const { showNotification, notificationDetails } = globalContext;
  return (
    <div className={`${notificationDetails?.status === 'Success' ? "bg-green-50 border-green-300 border-1" : "bg-red-50 border-red-300 border-1"}`}>
      <div className='notifyMsg' style={{ paddingTop: ".8rem", paddingInline: "1rem" }}>
        <div>
          <h2 style={{ marginBottom: "5px" }} className={`${notificationDetails?.status === 'Success' ? "text-green-600" : "text-red-500"} font-black text-lg`}>{notificationDetails?.status}</h2>
          <p style={{ marginBottom: "20px" }}>{notificationDetails?.desc}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          {
            notificationDetails?.status === 'Success' ?
              <SiTicktick style={{ fill: "green", fontSize: "1.5rem" }} />
              :
              <IoIosCloseCircle style={{ fill: "red", fontSize: "1.5rem" }} />
          }
        </div>
      </div>
      <div className={`${(showNotification) && "loginMsgLoading"}`} style={{ backgroundColor: notificationDetails?.status === 'Success' ? " rgb(10, 191, 10)" : "red" }} />

    </div>
  )
}

export default GlobalNotification