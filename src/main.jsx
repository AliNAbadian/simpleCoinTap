import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TelegramApp from './pages/TelegramApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelegramApp />
  </StrictMode>,
)
