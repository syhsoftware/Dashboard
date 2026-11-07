
// =====================================================================
// ARCHIVO: src/components/Header.jsx
// ---------------------------------------------------------------------
// Barra superior: título + badge de estado de los datos.
// =====================================================================
export default function Header({ titulo = 'Dashboard', estado = 'listo' }) {
  const estados = {
    cargando: { texto: 'Cargando datos…', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    listo: { texto: 'Datos actualizados', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    error: { texto: 'Error al cargar', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
  }

  const estadoActual = estados[estado] || estados.listo

  return (
    <header className="h-16 shrink-0 bg-slate-950/80 border-b border-slate-800 backdrop-blur-sm flex items-center justify-between px-6">
      <h1 className="text-white font-bold text-sm">{titulo}</h1>

      <span
        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${estadoActual.color}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {estadoActual.texto}
      </span>
    </header>
  )
}