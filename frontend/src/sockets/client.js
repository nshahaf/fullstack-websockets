import { io } from 'socket.io-client'
import { v4 as uuid } from 'uuid';

const getClientId = () => {
    let clientId = localStorage.getItem('clientId')
    if (!clientId) {
        clientId = uuid()
        localStorage.setItem('clientId', clientId)
    }
    return clientId
}
const clientId = getClientId()

// const userState = { roomId: null, role: null }

const socket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
    auth: {
        clientId: clientId
    },
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})


export { socket }