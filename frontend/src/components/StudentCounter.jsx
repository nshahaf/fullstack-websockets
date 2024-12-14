import { useEffect, useState } from "react";
import { socket } from "../sockets/client";
import { useSocket } from "../hooks/useSocket"

export default function StudentCounter() {
    const [userCount, setUserCount] = useState(0)
    const {roomId} = useSocket()
    


    useEffect(() => {
        socket.on('updateStudentCounter', (roomData) => {
            setUserCount(() => roomData.userCount)
        })


        return () => {
            socket.off('updateStudentCounter')
        }
    }, []);

    if (userCount <= 1 || !roomId) return ''
    return (
        <span>Students: {userCount - 1}</span>
    )
}
