import { useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";

export default function LobbyPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const codeBlocks = [
    "Async case",
    "Promise chaining",
    "API request handling",
    "Error handling"
  ];

  const handleRedirect = (blockName) => {
    // Redirects to the code block page corresponding to the clicked item
    navigate(`/code-block/${blockName.toLowerCase().replace(" ", "-")}`);
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleSubmit = (code) => {
    console.log(code)
  }



  return (
    <div className="page lobby-page">
      <h1>Choose code block</h1>
      <ul className="block-list">
        {codeBlocks.map((blockName, index) => (
          <li className="block-item" key={index} onClick={() => handleRedirect(blockName)}>
            {blockName}
          </li>

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
