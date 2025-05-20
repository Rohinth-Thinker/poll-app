import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {

    const [ socket, setSocket ] = useState(null);

    useEffect(() => {
        function connectSocket() {
            const socket = io();

            socket.on("connect", () => {
                setSocket(socket);
            })

            return () => {
                socket.off("connect");
            }
        }

        connectSocket();
    }, [])

    return (
        <SocketContext.Provider value={{socket}} >
            { children }
        </SocketContext.Provider>
    )
}