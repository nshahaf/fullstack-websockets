import { useContext } from 'react';
import { SocketContext } from '../sockets/socketContex';

export const useSocket = () => useContext(SocketContext);