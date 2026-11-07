// =====================================================================
// ARCHIVO: src/components/ProductosTabla.jsx
// ---------------------------------------------------------------------
// Tabla del listado de productos (ya filtrados).
// No tiene drill-down: el listado solo muestra tabla + KPIs.
// =====================================================================
export default function ProductosTabla({ productos }) {
  if (productos.length === 0) {
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
            <th className="px-4 py-3 font-black">Producto</th>
            <th className="px-4 py-3 font-black">Categoría</th>
            <th className="px-4 py-3 font-black text-right">Precio</th>
            <th className="px-4 py-3 font-black text-right">Descuento</th>
            <th className="px-4 py-3 font-black text-right">Stock</th>
            <th className="px-4 py-3 font-black text-right">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900">
          {productos.map((producto) => (
            <tr key={producto.id} className="hover:bg-slate-900/60 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={producto.thumbnail}
                    alt={producto.title}
                    className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="min-w-0">
                    <p className="text-white font-bold text-xs truncate">{producto.title}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {producto.brand || 'Sin marca'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-400 capitalize">
                {String(producto.category).replace(/-/g, ' ')}
              </td>
              <td className="px-4 py-3 text-emerald-400 font-bold text-right">
                $ {producto.price.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-amber-400 text-right">
                {producto.discountPercentage.toFixed(1)}%
              </td>
              <td className="px-4 py-3 text-slate-300 text-right">{producto.stock}</td>
              <td className="px-4 py-3 text-slate-300 text-right">
                ⭐ {producto.rating.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}