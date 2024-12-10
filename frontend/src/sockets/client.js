import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})

const socketActions = { //Emitting Events
    joinRoom: (room) => socket.emit('joinRoom', room), // Emit the "joinRoom" event
    leaveRoom: (room) => socket.emit('leaveRoom', room), // Emit the "leaveRoom" event
    sendMessage: (message) => socket.emit('sendMessage', message), // Emit the "sendMessage" event
}

const socketListeners = {
    onMessage: (message) => {
        console.log(message);
    },
}

export { socket, socketActions, socketListeners }