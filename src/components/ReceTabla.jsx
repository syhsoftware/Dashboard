// =====================================================================
// ARCHIVO: src/components/ProductosTabla.jsx
// ---------------------------------------------------------------------
// Tabla del listado de productos (ya filtrados).
// No tiene drill-down: el listado solo muestra tabla + KPIs.
// =====================================================================
export default function Recetapage({ recipes}) {
    
  if (recipes.length === 0) {
    return (
      <div className="p-10 text-center rounded-2xl bg-slate-950 border border-slate-800">
        <span className="text-3xl block mb-2">🔍</span>
        <p className="text-white font-bold text-sm mb-1">Sin resultados</p>
        <p className="text-[11px] text-slate-500">
          Prueba con otro término de búsqueda o cambia el filtro de categoría.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
          <tr>
            <th className="px-4 py-3 font-black">id</th>
            <th className="px-4 py-3 font-black">instruccionjes</th>
            <th className="px-4 py-3 font-black text-right">tiempo de preparacion</th>
            <th className="px-4 py-3 font-black text-right">dificulta</th>
            <th className="px-4 py-3 font-black text-right">pais</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900">
          {recipes.map((item) => (
            <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">

              <td className="px-4 py-3 text-slate-400 capitalize">
                {(item.id)}
              </td>
              <td className="px-4 py-3 text-emerald-400 font-bold">
                {item.instructions}
              </td>
              <td className="px-4 py-3 text-amber-400 ">
                {item.prepTimeMinutes}
              </td>
              <td className="px-4 py-3 text-slate-300" >{item.difficulty}</td>
              <td className="px-4 py-3 text-slate-300 text-right">
                 {item.cuisine}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}