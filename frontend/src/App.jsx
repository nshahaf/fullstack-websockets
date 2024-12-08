// import reactLogo from './assets/icons/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage';
import CodeBlockPage from './pages/CodeBlockPage';

import './assets/styles/main.scss'
function App() {

  return (
    <>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/code-block/:codeBlock" element={<CodeBlockPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

function NotFoundPage() {
  return <HomePage />;
}

export default App
