import { useState } from "react";
import { createContext, useContext } from "react";


const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [ authUser, setAuthUser ] = useState( JSON.parse(localStorage.getItem("userId")) || null );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }} >
            { children }
        </AuthContext.Provider>
    )
}