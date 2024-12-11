import { useNavigate } from "react-router-dom";
import Role from "./Role";
import { socket } from "../sockets/client";
import { useSocket } from "../hooks/useSocket";
import StudentCounter from "./StudentCounter";

export default function Header() {
  const navigate = useNavigate()
  const { roomId, setRoomId, setRole } = useSocket()

  const handleRedirect = () => {
    socket.emit('leaveRoom', { roomId: roomId })
    setRoomId(null)
    setRole(null)
    navigate('/')
  }

  return (
    <div className='header'>
      <div className="logo-role">
        <h1>CodeBlocks</h1>
        <Role />
      </div>
      <ul className="clean-list nav-list">
        <StudentCounter />
        <li onClick={handleRedirect} className="nav-item">Lobby</li>
      </ul>
    </div>
  )
}
