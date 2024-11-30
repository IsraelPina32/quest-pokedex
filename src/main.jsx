import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from '../src/styles/Global.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>,
)
