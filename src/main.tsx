import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from './styles/index'
import App from './App.js'


const container = document.getElementById('root');

if(!container) {
  throw new Error('Root container missing in DOM.');
}

const root = createRoot(container);

root.render(
   <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>,
);

