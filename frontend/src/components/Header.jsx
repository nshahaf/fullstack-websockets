import { Link } from "react-router-dom";

export default function Header() {

  return (
    <div className='header'>
      <h1>CodeBlocks</h1>
      <ul className="clean-list nav-list">
        <Link to={"/"} className="nav-item">Lobby</Link>
      </ul>
    </div>
  )
}
