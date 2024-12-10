import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './sockets/socketContex'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SocketProvider>
      <App />
    </SocketProvider >
  </BrowserRouter>,
)
