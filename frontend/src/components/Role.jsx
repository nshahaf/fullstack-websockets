import { useSocket } from "../hooks/useSocket"

export default function Role() {
    const { role } = useSocket()

    return (
        <li className='Role'>{role}</li>
    )
}


