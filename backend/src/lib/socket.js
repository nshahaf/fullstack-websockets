const users = [];
const roles = {};

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle user disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);

        });
    });
};

export default socketHandler;