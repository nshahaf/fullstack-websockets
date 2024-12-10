// Store room-specific users and their roles
const roomUsers = {}; // { roomId: [{ clientId, role }] }
const clients = {} // { clientId : socket.id }

// Roles constants
const MENTOR = "Mentor";
const STUDENT = "Student";

const socketHandler = (io) => {
    // Handle user connection
    io.on('connection', (socket) => {
        const { clientId } = socket.handshake.auth // Access query parameters
        clients[clientId] = socket.id // keep track of clientId and map it to socket.id
        console.log('A user connected:', clientId);

        socket.emit('roleAssigned', { roomId: null, role: null })
        console.log(roomUsers)

        //Joining a room
        socket.on('joinRoom', ({ roomId, roomTitle }) => {
            // If room does not exist, create it
            if (!roomUsers[roomId]) {
                roomUsers[roomId] = []
            }

            // Assign user role (mentor for the first user, student for others)
            const usersInRoom = roomUsers[roomId]

            let role = STUDENT
            if (usersInRoom.length === 0) role = MENTOR // First user becomes the mentor
            usersInRoom.push({ clientId, role })// Add the user with their role

            // Add the user to the room
            socket.join(roomId)
            console.log(`User: ${clientId} joined "${roomTitle}" as ${role}`)

            //Notify the current user
            socket.emit('message', `You joined "${roomTitle}" as ${role}`)
            socket.emit('roleAssigned', { role, roomId })
            //Notify others in the room
            socket.to(roomId).emit('message', `${clientId} has joined as ${role}`)

            console.log(roomUsers)

        })

        // Leave room and clean up users
        socket.on('leaveRoom', ({ roomId }) => {
            if (roomUsers[roomId]) {
                // Remove user from the room's users list
                roomUsers[roomId] = roomUsers[roomId].filter(user => user.clientId !== clientId);

                // Notify the room about the user leaving
                socket.to(roomId).emit('message', `${clientId} has left the room`);

                socket.emit("message", `You left the room`)
                socket.emit('roleAssigned', { roomId: null, role: null })
                // Leave the room
                socket.leave(roomId);

                console.log(roomUsers)

            }
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected:', clientId)

            Object.keys(roomUsers).forEach((room) => {
                // Filter out the disconnected user
                roomUsers[room] = roomUsers[room].filter(user => user.clientId !== clientId)
                // Clean up empty rooms
                if (roomUsers[room].length === 0) {
                    delete roomUsers[room];
                    console.log(`Room ${room} is now empty and has been removed.`)
                }
            })
        })
    })
}

export default socketHandler;