// =====================================================================
// ARCHIVO: src/App.jsx
// ---------------------------------------------------------------------
// Reemplaza el App.jsx generado por Vite. Se hace al final porque
// importa Layout y las páginas, que ya deben existir.
//
// Rutas del panel:
//   /dashboard      → DashboardPage (resumen de varias tablas)
//   /clientes       → ClientesPage (listado)
//   /clientes/:id   → ClienteDetalle (detalle)
//   /productos      → ProductosPage (listado)
//   *               → redirige a /dashboard
// =====================================================================
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ClientesPage from './pages/ClientesPage.jsx'
import ClienteDetalle from './pages/ClienteDetalle.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import { RecetaPage } from './pages/RecetaPage.jsx'
import { PosPage } from './pages/PosPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/clientes/:id" element={<ClienteDetalle />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/pospage" element={<PosPage/>} />
        <Route path="/recipes" element={< RecetaPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}