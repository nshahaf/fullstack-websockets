import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})

export default socket