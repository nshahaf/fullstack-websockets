//TODO//: page should contain title: Choose code block
//TODO//: page should contain a list of code blocks (at least 4 items represented by a name)
//TODO: Clicking an item should redirect users to the coresponding code block page 

import { useNavigate } from "react-router-dom";

export default function LobbyPage() {
  const navigate = useNavigate();

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
    </div>
  )
}
