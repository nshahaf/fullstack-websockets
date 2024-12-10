import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'
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
const userState = { roomId: null, role: null }

const socket = io('http://localhost:3000', {
    auth: {
        clientId: clientId
    },
    withCredentials: true,
    autoConnect: false, // Prevent auto connection
    transports: ['websocket'], // Use WebSocket transport
})

const socketActions = { //Emitting Events
    joinRoom: (roomId, roomTitle) => socket.emit('joinRoom', { roomId, roomTitle }), // Emit the "joinRoom" event
    leaveRoom: () => socket.emit('leaveRoom', { roomId: userState.roomId }), // Emit the "leaveRoom" event
    backToLobby: () => socket.emit('backToLobby'), // Emit the "backToLobby" event
    sendMessage: (message) => socket.emit('sendMessage', message), // Emit the "sendMessage" event
    getUserRole: () => userState.role,

}

const socketListeners = {
    onMessage: (message) => {
        toast.success(message, {
            duration: 2000,
        })

    },
    onRoleAssigned: (user) => {
        console.log(user)
        userState.roomId = user.roomId
        userState.role = user.role
    },
    onDisconnect: (navigate) => {
        socketActions.leaveRoom()
        navigate('/')
    }
}

export { socket, socketActions, socketListeners }