// =====================================================================
// ARCHIVO: src/layout/Layout.jsx
// ---------------------------------------------------------------------
// El Layout es el "marco" del panel: Sidebar a la izquierda y una
// columna principal con Header arriba, el contenido en medio
// (<Outlet/>) y Footer abajo.
// Se crea DESPUÉS de Sidebar, Header y Footer porque los importa.
// =====================================================================
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout({ titulo = 'Panel de control', estado = 'listo' }) {
  return (
    <div className="flex min-h-screen">
      {/* Menú lateral */}
      <Sidebar />

      {/* Columna principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header titulo={titulo} estado={estado} />

        {/* Aquí se renderiza la página según la ruta */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}