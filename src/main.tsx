import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from './styles/index'
import App from './App.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>,
)
