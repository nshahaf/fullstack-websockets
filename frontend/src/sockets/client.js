const userState = { roomId: null, role: null }

import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})

const socketActions = { //Emitting Events
    joinRoom: (roomId, roomTitle) => socket.emit('joinRoom', { roomId, roomTitle }), // Emit the "joinRoom" event
    leaveRoom: () => socket.emit('leaveRoom', userState.roomId), // Emit the "joinRoom" event
    backToLobby: () => socket.emit('backToLobby'), // Emit the "backToLobby" event
    sendMessage: (message) => socket.emit('sendMessage', message), // Emit the "sendMessage" event
}

const socketListeners = {
    onMessage: (message) => {
        console.log(message);
    },
    onRoleAssigned: (user) => {
        console.log(user)
        userState.roomId = user.roomId
        userState.role = user.role
    },
}

export { socket, socketActions, socketListeners }