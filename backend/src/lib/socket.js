let users = []
const MENTOR = 'Mentor'
const STUDENT = 'Student'
const createUser = (socketId, role) => ({ socketId: socketId, role: role })
const filteredUsers = (socketId) => users.filter(user => user.socketId !== socketId)
const getUser = (socketId) => users.filter(user => user.socketId === socketId).at(0)


const socketHandler = (io) => {
    // Handle user connection
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        //Joining a room
        socket.on('joinRoom', (roomTitle) => {
            socket.join(roomTitle)
            console.log(`User: ${socket.id} joined room: ${roomTitle}`)

            //Notify the current user
            socket.emit('message', `you have joined "${roomTitle}" room`)

            //Notify others in the room
            socket.to(roomTitle).emit('message', `${socket.id} joined the room`)
        })

        //Leaving a room
        socket.on('leaveRoom', (roomTitle) => {
            socket.leave(roomTitle)
            console.log(`${socket.id} left room: ${roomTitle}`)

            //Notify others in the room
            socket.to(roomTitle).emit('message', `${socket.id} left the room`)
        })

        socket.on("backToLobby", () => {
            const rooms = Array.from(socket.rooms); // Get all rooms the socket is in (include self)
            rooms.forEach((room) => {
                if (room !== socket.id) { // Skip the socket's own room
                    socket.leave(room)
                    console.log(`Socket ${socket.id} left room: ${room}`)
                }
            })

            socket.emit("message", `You have been removed from all rooms.`)
        })


        // Assign the first user as mentor, others as students
        if (users.length === 0) {
            users.push(createUser(socket.id, MENTOR))
        } else {
            users.push(createUser(socket.id, STUDENT))
        }

        socket.emit('roleAssigned', getUser(socket.id)) //socketId and role to the new user
        io.emit('userListUpdate', users); //emit updated users list to everyone



        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id)

            // Remove the user from the list
            users = filteredUsers(socket.id)


        });
    });


};



export default socketHandler;