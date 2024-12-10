import { Link } from "react-router-dom";
import Role from "./Role";
import { useSocket } from "../hooks/useSocket";

export default function Header() {
  const socket = useSocket()

  const handleClick = () => {
    socket.emit('backToLobby')
  }


  return (
    <div className='header'>
      <h1>CodeBlocks</h1>
      <ul className="clean-list nav-list">
        <Role />
        <Link to={'/'} onClick={handleClick} className="nav-item">Lobby</Link>
      </ul>
    </div>
  )
}
