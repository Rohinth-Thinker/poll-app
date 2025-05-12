import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter} from "react-router-dom";

import App from './App.jsx'
import { SocketContextProvider } from './context/SocketContext';
import { AuthContextProvider } from './context/AuthContext';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
      </StrictMode>
  </BrowserRouter> 
)
