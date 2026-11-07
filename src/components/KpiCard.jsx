// =====================================================================
// ARCHIVO: src/components/KpiCard.jsx
// ---------------------------------------------------------------------
// Tarjeta repetible de las filas de KPIs. Recibe valor, label, icono
// y color (una clave del mapa, no una clase Tailwind suelta).
// =====================================================================
export default function KpiCard({ valor, label, icono, color = 'cyan' }) {
  const colores = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400',
    rose: 'from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-400',
  }

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colores[color]} border`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icono}</span>
      </div>
      <p className="text-2xl font-black text-white leading-none mb-1">{valor}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  )
}