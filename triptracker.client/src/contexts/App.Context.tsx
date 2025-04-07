import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/* export interface ClientUser {
    loggedIn : boolean,
    username : string
} */

export type AppContextType = {
    // userInfo : ClientUser | null,
    userLoggedIn : boolean,
    userName : string | null,
    login : (email : string) => void,
    logout : () => void
}

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = (email : string) : void => {
            setUserLoggedIn(true);
            setUserName(email)
            navigate("/");
        }

    const logout = async () : Promise<void> => {
        setUserLoggedIn(false);
        setUserName(null);
        navigate("/login");
    }

    const value = {
        userLoggedIn,
        userName,
        login,
        logout
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider")
    }
    return context;
}