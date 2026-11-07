// =====================================================================
// ARCHIVO: src/components/BarraCargando.jsx
// ---------------------------------------------------------------------
// Barras grises animadas. Se repite la cantidad indicada en "filas".
// =====================================================================
export default function BarraCargando({ filas = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: filas }).map((_, indice) => (
        <div key={indice} className="h-14 rounded-xl bg-slate-800/60 border border-slate-800" />
      ))}
    </div>
  )
}