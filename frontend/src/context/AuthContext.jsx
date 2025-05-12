import { useState } from "react";
import { createContext, useContext } from "react";


const AuthContext = createContext(null)

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [ authUser, setAuthUser ] = useState( JSON.parse(localStorage.getItem("user")) || null );
    // localStorage.setItem('user', JSON.stringify({userId: "6821f47fcb50369f618ae7fd"}));

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }} >
            { children }
        </AuthContext.Provider>
    )
}