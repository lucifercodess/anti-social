import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from'react-router-dom'
import {Toaster} from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Toaster/>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
