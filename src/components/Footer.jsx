// =====================================================================
// ARCHIVO: src/components/Footer.jsx
// ---------------------------------------------------------------------
// Pie del panel: dos textos pequeños de créditos.
// =====================================================================
export default function Footer() {
  return (
    <footer className="h-12 shrink-0 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6">
      <p className="text-[10px] text-slate-600">
        Panel Admin · Curso Fullstack JS 2026
      </p>
      <p className="text-[10px] text-slate-600">
        Datos de prueba por DummyJSON
      </p>
    </footer>
  )
}