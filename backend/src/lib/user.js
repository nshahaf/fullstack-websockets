let users = [];
let roles = {};

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Assign the first user as mentor, others as students
        if (users.length === 0) {
            roles[socket.id] = 'mentor';
        } else {
            roles[socket.id] = 'student';
        }

        // Add user to the list
        users.push(socket.id);

        // Send role and user list to the new user
        socket.emit('roleAssigned', roles[socket.id]);
        io.emit('userListUpdate', { users, roles });

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);

            // Remove the user from the list
            users = users.filter((id) => id !== socket.id);
            delete roles[socket.id];

            // Reassign the mentor role if the first user disconnects
            if (users.length > 0 && roles[users[0]] !== 'mentor') {
                roles[users[0]] = 'mentor'; // Assign the first remaining user as mentor
            }

            // Notify everyone about the user list update
            io.emit('userListUpdate', { users, roles });
        });
    });
};