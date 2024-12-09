// import reactLogo from './assets/icons/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage';
import CodeBlockPage from './pages/CodeBlockPage';

import './assets/styles/main.scss'
import Header from './components/Header';
import { blockService } from './services/blockService.js';
import { useEffect, useState } from 'react';


function App() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    blockService.getCodeBlocks()
      .then(res => setCodeBlocks(res))
  }, []);

  return (
    <>
      <div className="app-layout">
        <Header />
        <Routes>
          <Route path="/" element={<LobbyPage codeBlocks={codeBlocks} />} />
          <Route path="/code-block/:id" element={<CodeBlockPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

function NotFoundPage() {
  return <LobbyPage />;
}

export default App
