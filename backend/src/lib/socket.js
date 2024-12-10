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
        socket.on('joinRoom', (roomName) => {
            socket.join(roomName)
            console.log(`${socket.id} joined room: ${roomName}`)

            //Notify others in the room
            socket.to(roomName).emit('messege', `${socket.id} joined the room`)
        })

        //Leaving a room
        socket.on('leaveRoom', (roomName) => {
            socket.leave(roomName)
            console.log(`${socket.id} left room: ${roomName}`)

            //Notify others in the room
            socket.to(roomName).emit('messege', `${socket.id} left the room`)
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