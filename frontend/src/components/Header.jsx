import { useNavigate } from "react-router-dom";
import Role from "./Role";
import { socket } from "../sockets/client";
import { useSocket } from "../hooks/useSocket";

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
      <h1>CodeBlocks</h1>
      <ul className="clean-list nav-list">
        <Role />
        <li onClick={handleRedirect} className="nav-item">Lobby</li>
      </ul>
    </div>
  )
}
