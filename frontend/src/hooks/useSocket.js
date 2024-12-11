import { useContext } from 'react';
import { SocketContext } from '../sockets/socketContex';

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};