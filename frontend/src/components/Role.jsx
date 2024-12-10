
import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export default function Role() {
    const socket = useSocket()
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([])


    useEffect(() => {

        // Listen for user list updates
        socket.on('userListUpdate', (users) => {
            setUsers(users);
        });

        return () => {
            socket.off('userListUpdate');
        };
    }, []);

    return (
        <li className='Role'>{role}</li>
    )
}


