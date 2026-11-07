// =====================================================================
// ARCHIVO: src/components/Sidebar.jsx
// ---------------------------------------------------------------------
// Menú lateral. NavLink resalta la ruta activa automáticamente.
// =====================================================================
import { NavLink } from 'react-router-dom'
import { MonitorActivity, PackageSearch , UsersRound , CreditCardReader , Settings2 , ChartColumn , Globe ,  } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-slate-950 border-r border-slate-800 min-h-screen p-4 flex flex-col">
      {/* Logo / nombre del panel */}
      <div className="flex items-center gap-2 px-3 py-4 mb-6">
        <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-black text-lg">
          📊
        </span>
        <div>
          <p className="text-white font-black text-sm leading-none">Panel Admin</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">DummyJSON</p>
        </div>
      </div>

    {/* Enlaces de navegación */}
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span><MonitorActivity /></span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/pospage"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span><CreditCardReader /></span>
          <span>POS Touch</span>
        </NavLink>

             <NavLink
          to="/productos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span> <PackageSearch /> </span>
          <span>Productos</span>
        </NavLink>


        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span><UsersRound /></span>
          <span>Clientes & CRM</span>
        </NavLink>
        
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span><ChartColumn /></span>
          <span>Receta</span>
        </NavLink>

   

        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`
          }
        >
          <span><Settings2 /></span>
          <span>Configuración</span>
        </NavLink>

      </nav>

      {/* Pie del sidebar */}
      <p className="mt-auto px-3 pt-6 text-[10px] text-slate-600 leading-relaxed">
        Proyecto de práctica del curso Fullstack JS 2026.
      </p>
    </aside>
  )
}