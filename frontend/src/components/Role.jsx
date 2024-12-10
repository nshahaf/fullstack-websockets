
import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export default function Role() {
    const socket = useSocket()
    const [role, setRole] = useState(null);

    useEffect(() => {
        socket.on('roleAssigned', (user) => {
            setRole(user.role)
        })
        return () => {
            socket.off('roleAssigned')
        }

    }, [socket])

    return (
        <li className='Role'>{role}</li>
    )
}


