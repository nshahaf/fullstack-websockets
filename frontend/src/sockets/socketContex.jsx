import { createContext, useEffect, useState } from 'react'
import { socket } from './client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

// Create the SocketContext
const SocketContext = createContext()

// Context Provider for the app
export const SocketProvider = ({ children }) => {
    const navigate = useNavigate()
    const [role, setRole] = useState(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        socket.connect() // connect on mount
        socket.on('message', (message) => {
            toast.success(message, {
                duration: 2000,
            })
        })
        socket.on('roleAssigned', (roleData) => {
            console.log(roleData)
            setRole(roleData.role)
            setRoomId(roleData.roomId)
        })
        socket.on('disconnect', () => {
            socket.emit('leaveRoom', { roomId: roomId })
            setRole(null)
            setRoomId(null)
            navigate('/')
        })


        return () => {
            socket.off(('message'))
            socket.off(('roleAssigned'))
            socket.off('disconnect')
            socket.disconnect()
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, role, setRole, roomId, setRoomId }}>
            {children}
        </SocketContext.Provider>
    )
}


export { SocketContext } // Export context for use in the custom hook

