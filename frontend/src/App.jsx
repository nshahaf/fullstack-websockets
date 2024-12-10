import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LobbyPage from './pages/LobbyPage'
import CodeBlockPage from './pages/CodeBlockPage'
import Header from './components/Header'
import { blockService } from './services/blockService.js'

import './assets/styles/main.scss'
import { useSocket } from './hooks/useSocket.js'
import { socketListeners } from './sockets/client.js'
import { Toaster } from 'react-hot-toast';

function App() {
  const socket = useSocket()
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    blockService.getCodeBlocks()
      .then(res => setCodeBlocks(res))

  }, []);

  useEffect(() => {
    // Set up listeners
    socket.on('message', socketListeners.onMessage)
    socket.on('roleAssigned', socketListeners.onRoleAssigned)

    // Clean up listeners when the component unmounts
    return () => {
      socket.off(('message', socketListeners.onMessage))
      socket.off(('roleAssigned', socketListeners.onRoleAssigned))
    }
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
        <Toaster />
      </div>
    </>
  )
}

function NotFoundPage() {
  return <LobbyPage />;
}

export default App
