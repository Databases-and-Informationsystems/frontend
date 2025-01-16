import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import App from './components/App.tsx'
=======
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router'
>>>>>>> dashboard

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
