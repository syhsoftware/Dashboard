// =====================================================================
// ARCHIVO: src/components/ClientesTabla.jsx
// ---------------------------------------------------------------------
// Tabla del listado de clientes (ya unidos y filtrados).
// Cada fila es un Link a /clientes/:id (drill-down).
// =====================================================================
import { Link } from 'react-router-dom'

export default function ClientesTabla({ clientes }) {
  // Caso borde: no hay resultados tras el filtro.
  if (clientes.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-slate-950 border border-slate-800">
        <span className="text-3xl block mb-2">🔍</span>
        <p className="text-white font-bold text-sm mb-1">Sin resultados</p>
        <p className="text-[11px] text-slate-500">
          Prueba con otro término de búsqueda o cambia el filtro de ciudad.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
          <tr>
            <th className="px-4 py-3 font-black">Cliente</th>
            <th className="px-4 py-3 font-black">Email</th>
            <th className="px-4 py-3 font-black">Ciudad</th>
            <th className="px-4 py-3 font-black">Empresa</th>
            <th className="px-4 py-3 font-black text-right">Carritos</th>
            <th className="px-4 py-3 font-black text-right">Artículos</th>
            <th className="px-4 py-3 font-black text-right">Total gastado</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-900">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-slate-900/60 transition-colors">
              <td className="px-4 py-3">
                <Link to={`/clientes/${cliente.id}`} className="flex items-center gap-3 no-underline group">
                  <img
                    src={cliente.avatar}
                    alt={cliente.nombre}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <span className="text-white font-bold text-xs group-hover:text-cyan-300 transition-colors">
                    {cliente.nombre}
                  </span>
                </Link>
              </td>

              <td className="px-4 py-3 text-slate-400">{cliente.email}</td>
              <td className="px-4 py-3 text-slate-400">{cliente.ciudad}</td>
              <td className="px-4 py-3 text-slate-400">{cliente.empresa}</td>
              <td className="px-4 py-3 text-slate-300 text-right">{cliente.totalCarritos}</td>
              <td className="px-4 py-3 text-slate-300 text-right">{cliente.totalArticulos}</td>

              <td className="px-4 py-3 text-right">
                <span className="text-emerald-400 font-bold">$ {cliente.totalGastado.toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}