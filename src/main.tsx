import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalStyle } from './styles'
import App from './App'
import { ThemeProvider } from './contexts/index';

const container = document.getElementById('root');

if(!container) {
  throw new Error('Root container missing in DOM.');
}

const root = createRoot(container);

root.render(
   <StrictMode>
    <ThemeProvider>
    <GlobalStyle/>
    <App />
    </ThemeProvider>
  </StrictMode>,
);

