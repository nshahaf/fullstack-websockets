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

const socket = io('http://localhost:3000', {
    auth: {
        clientId: clientId
    },
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})


export { socket }