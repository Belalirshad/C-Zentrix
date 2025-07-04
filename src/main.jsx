import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { startMockServer } from './mockServer'
import useChatStore from './store/chatStore'

startMockServer()

// Listen for custom unread increment event
typeof window !== 'undefined' && window.addEventListener('incrementUnread', (e) => {
  useChatStore.getState().incrementUnread(e.detail);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
