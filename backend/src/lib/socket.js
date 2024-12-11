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
        console.log('connection: A user connected:', clientId);

        socket.emit('roleAssigned', { roomId: null, role: null })

        //Joining a room
        socket.on('joinRoom', ({ roomId, roomTitle }) => {

            if (!roomUsers[roomId]) { // If room does not exist, create it
                roomUsers[roomId] = []
            }
            const usersInRoom = roomUsers[roomId] // Assign user role (mentor for the first user, student for others)
            let role = STUDENT
            if (usersInRoom.length === 0) role = MENTOR // First user becomes the mentor
            usersInRoom.push({ clientId, role })// Add the user with their role

            socket.join(roomId) // Add the user to the room

            console.log(`joinRoom: User: ${clientId} joined "${roomTitle}" as ${role}`) //logging for debbuging
            socket.emit('message', `You joined "${roomTitle}" as ${role}`) //Notify the current user
            socket.to(roomId).emit('message', `${clientId} has joined as ${role}`) //Notify others in the room
            socket.emit('roleAssigned', { role, roomId }) //update role

        })

        // Leave room and clean up users
        socket.on('leaveRoom', ({ roomId }) => {
            if (roomUsers[roomId]) {
                roomUsers[roomId] = roomUsers[roomId].filter(user => user.clientId !== clientId) // Remove user from the room's users list
                console.log(`leaveRoom: leaving room ${roomId}`) //logging for debugging
                socket.emit("message", `You left the room`) // emit to self
                socket.emit('roleAssigned', { roomId: null, role: null }) // update Role

                // Leave the room
                socket.leave(roomId);
            }
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log(`disconnect: User ${clientId} disconnected`)
            Object.keys(roomUsers).forEach((room) => {

                // Filter out the disconnected user
                roomUsers[room] = roomUsers[room].filter(user => user.clientId !== clientId)

                // Clean up empty rooms
                if (roomUsers[room].length === 0) {
                    delete roomUsers[room];
                }
            })
        })
    })
}

export default socketHandler;