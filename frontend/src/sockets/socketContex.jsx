import { createContext, useContext, useEffect } from 'react'
import socket from './client';


// Create the SocketContext
const SocketContext = createContext()


// Context Provider for the app
export const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.connect() // connect on mount

        return () => socket.disconnect() //disconnect on anmount
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export { SocketContext } // Export context for use in the custom hook
