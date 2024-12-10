import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'

const userState = { roomId: null, role: null }

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
    getUserRole: () => userState.role
}

const socketListeners = {
    onMessage: (message) => {
        // console.log(message);
        toast.success(message, {
            duration: 2000,
        })

    },
    onRoleAssigned: (user) => {
        console.log(user)
        userState.roomId = user.roomId
        userState.role = user.role
    },
}

export { socket, socketActions, socketListeners }