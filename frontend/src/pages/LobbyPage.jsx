import { useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";


export default function LobbyPage({ codeBlocks = [] }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleRedirect = (blockId) => {
    // Redirects to the code block page corresponding to the clicked item
    navigate(`/code-block/${blockId}`);
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleSubmit = (code) => {
    console.log(code)
  }



  return (
    <div className="page lobby-page">
      <h1>Choose a code block</h1>
      <ul className="block-list">
        {codeBlocks.map((block) => (
          <li className="block-item" key={block._id} onClick={() => handleRedirect(block._id)}>{block.title}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Create Code block</button>
      {isOpen && <CodeEditor submit={handleSubmit} />}
    </div>
  )
}

//TODO//: page should contain title: Choose code block
//TODO//: page should contain a list of code blocks (at least 4 items represented by a name)
//TODO//: Clicking an item should redirect users to the coresponding code block page
//TODO: styling
