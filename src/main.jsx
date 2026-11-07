
// =====================================================================
// ARCHIVO: src/main.jsx
// ---------------------------------------------------------------------
// Edita el archivo generado para envolver la App en BrowserRouter.
// Sin BrowserRouter, /dashboard daría 404 al recargar.
// =====================================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)