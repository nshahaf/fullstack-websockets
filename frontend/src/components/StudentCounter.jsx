import { useEffect, useState } from "react";
import { socket } from "../sockets/client";

export default function StudentCounter() {
    const [userCount, setUserCount] = useState(0)


    useEffect(() => {
        socket.on('updateStudentCounter', (roomData) => {
            setUserCount(() => roomData.userCount)
        })


        return () => {
            socket.off('updateStudentCounter')
        }
    }, []);

    if (userCount <= 1) return ''
    return (
        <span>Students: {userCount - 1}</span>
    )
}
