
// Store room-specific users and their roles
const roomUsers = {}; // { roomTitle: [{ socketId, role }] }

// Roles constants
const MENTOR = "Mentor";
const STUDENT = "Student";

const socketHandler = (io) => {
    // Handle user connection
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        //Joining a room
        socket.on('joinRoom', ({ roomId, roomTitle }) => {
            // If room does not exist, create it
            if (!roomUsers[roomId]) {
                roomUsers[roomId] = []
            }

            // Assign user role (mentor for the first user, student for others)
            const usersInRoom = roomUsers[roomId]
            let role = STUDENT

            if (usersInRoom.length === 0) {
                role = MENTOR; // First user becomes the mentor
            }
            // Add the user with their role
            usersInRoom.push({ socketId: socket.id, role });

            // Add the user to the room
            socket.join(roomId)
            console.log(`User: ${socket.id} joined "${roomTitle}" as ${role}`)

            //Notify the current user
            socket.emit('message', `You joined "${roomTitle}" as ${role}`)
            socket.emit('roleAssigned', { role, roomId })
            //Notify others in the room
            socket.to(roomId).emit('message', `${socket.id} has joined as ${role}`)
        })

        // Leave room and clean up users
        socket.on('leaveRoom', (roomId) => {
            if (roomUsers[roomId]) {
                // Remove user from the room's users list
                roomUsers[roomId] = roomUsers[roomId].filter(user => user.socketId !== socket.id);

                // Notify the room about the user leaving
                socket.to(roomId).emit('message', `${socket.id} has left the room`);

                socket.emit("message", `You left the room`)
                socket.emit('roleAssigned', { roomId: null, role: null })
                // Leave the room
                socket.leave(roomId);
            }
        });

        // Handle user disconnect
        socket.on('disconnect', () => {
            const rooms = Array.from(socket.rooms); // Get all rooms the socket is in (include self)
            rooms.forEach((room) => {
                if (room === socket.id) return //skip the socket own room
                if (roomUsers[room]) roomUsers[room] = roomUsers[room].filter(user => user.socketId !== socket.id) // If the room exists in roomUsers, remove the socket from the room

                socket.leave(room)
                console.log(`Socket ${socket.id} left room: ${room}`);
            })
            console.log('A user disconnected:', socket.id);
        })
    })
}

export default socketHandler;