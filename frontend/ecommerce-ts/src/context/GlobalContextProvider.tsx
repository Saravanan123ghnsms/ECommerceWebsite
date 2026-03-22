import React, { createContext, useState, type ReactNode } from 'react'

type globalContextProviderType = {
    children: ReactNode
}

type notificationStatusType = {
    status: string,
    desc: string
}

type createGlobalContextType = {
    showNotification: boolean,
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>,
    notificationDetails: notificationStatusType | null,
    setNotificationDetails: React.Dispatch<React.SetStateAction<notificationStatusType | null>>
}

export const CreateGlobalContext = createContext<createGlobalContextType | null>(null);

const GlobalContextProvider = ({ children }: globalContextProviderType) => {

    const [showNotification, setShowNotification] = useState(false);

    const [notificationDetails, setNotificationDetails] = useState<notificationStatusType | null>(null)

    return (
        <CreateGlobalContext.Provider value={{
            showNotification,
            setShowNotification,
            notificationDetails,
            setNotificationDetails
        }}>
            {children}
        </CreateGlobalContext.Provider>
    )
}

export default GlobalContextProvider;