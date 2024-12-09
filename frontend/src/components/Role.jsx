import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); //TODO: handle production/development case

const RoleLogic = () => {
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState({});

    useEffect(() => {
        // Listen for role assignment from the server
        socket.on('roleAssigned', (assignedRole) => {
            setRole(assignedRole);
        });

        // Listen for user list updates
        socket.on('userListUpdate', ({ users, roles }) => {
            setUsers(users);
            setRoles(roles);
        });

        return () => {
            socket.off('roleAssigned');
            socket.off('userListUpdate');
        };
    }, []);

    return (
        <div>
            <h2>User Roles</h2>
            <ul>
                {users.map((user) => (
                    <li key={user}>
                        User {user} - {roles[user] === 'mentor' ? 'Mentor' : 'Student'}
                    </li>
                ))}
            </ul>

            <p>
                You are the {role === 'mentor' ? 'Mentor' : 'Student'}.
            </p>

            {/* Display checkboxes */}
            <div>
                <label>
                    Mentor Role
                    <input type="checkbox" checked={role === 'mentor'} disabled />
                </label>
            </div>
            <div>
                <label>
                    Student Role
                    <input type="checkbox" checked={role === 'student'} disabled />
                </label>
            </div>
        </div>
    );
};

export default RoleLogic;
