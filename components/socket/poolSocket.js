
"use client"
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://civilization-frontend.online');

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return React.useContext(SocketContext);
};