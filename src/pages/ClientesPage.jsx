// =====================================================================
// ARCHIVO: src/pages/ClientesPage.jsx
// ---------------------------------------------------------------------
// Reemplaza TODO el archivo placeholder del Bloque 1 por este.
// LISTADO de clientes = KPIs de SU tabla + filtros + tabla.
// En la Clase 4 se le agregan debounce, paginación y exportación CSV.
// =====================================================================
import { useState, useEffect, useMemo } from 'react'
import {
  obtenerUsuarios,
  obtenerCarritos,
  unirClientesYCarritos,
  normalizar,
} from '../data/api.js'
import KpiCard from '../components/KpiCard.jsx'
import ClientesTabla from '../components/ClientesTabla.jsx'
import BarraCargando from '../components/BarraCargando.jsx'

const TASA_BCV = 40

export default function ClientesPage() {
  const [usuarios, setUsuarios] = useState([])
  const [carritos, setCarritos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [mensajeError, setMensajeError] = useState('')

  // Filtros.
  const [busqueda, setBusqueda] = useState('')
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('todas')
  const [orden, setOrden] = useState('total-desc')

  // Carga de datos (en orden, sin Promise.all).
  const cargarDatos = async () => {
    try {
      const usuariosData = await obtenerUsuarios()
      const carritosData = await obtenerCarritos()
      setUsuarios(usuariosData)
      setCarritos(carritosData)
      setEstado('listo')
    } catch (error) {
      setMensajeError(error.message)
      setEstado('error')
    }
  }

  useEffect(() => {
    ;(async () => {
      await cargarDatos()
    })()
  }, [])

  // Pipeline: crudos → unidos → filtrados → KPIs.
  const clientes = useMemo(
    () => unirClientesYCarritos(usuarios, carritos),
    [usuarios, carritos],
  )

  const clientesFiltrados = useMemo(() => {
    let resultado = clientes

    if (busqueda.trim()) {
      const texto = normalizar(busqueda)
      resultado = resultado.filter(
        (cliente) =>
          normalizar(cliente.nombre).includes(texto) ||
          normalizar(cliente.email).includes(texto) ||
          normalizar(cliente.ciudad).includes(texto),
      )
    }

    if (ciudadSeleccionada !== 'todas') {
      resultado = resultado.filter(
        (cliente) => cliente.ciudad === ciudadSeleccionada,
      )
    }

    resultado = [...resultado].sort((a, b) => {
      if (orden === 'total-desc') return b.totalGastado - a.totalGastado
      if (orden === 'total-asc') return a.totalGastado - b.totalGastado
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre)
      return 0
    })

    return resultado
  }, [clientes, busqueda, ciudadSeleccionada, orden])

  // KPIs DE LA TABLA: sobre la lista filtrada.
  const kpis = useMemo(
    () => ({
      totalClientes: clientesFiltrados.length,
      totalCarritos: clientesFiltrados.reduce((s, c) => s + c.totalCarritos, 0),
      totalArticulos: clientesFiltrados.reduce((s, c) => s + c.totalArticulos, 0),
      ingresoTotal: clientesFiltrados.reduce((s, c) => s + c.totalGastado, 0),
    }),
    [clientesFiltrados],
  )

  const ciudades = useMemo(() => {
    const lista = [...new Set(clientes.map((cliente) => cliente.ciudad))]
    return lista.sort()
  }, [clientes])

  if (estado === 'cargando') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-800/60 animate-pulse" />
          ))}
        </div>
        <BarraCargando filas={8} />
      </div>
    )
  }

  if (estado === 'error') {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl bg-slate-950 border border-rose-500/30">
        <span className="text-4xl block mb-3">⚠️</span>
        <h2 className="text-white font-bold text-lg mb-2">No se pudieron cargar los datos</h2>
        <p className="text-[11px] text-slate-400 mb-6">{mensajeError}</p>
        <button
          type="button"
          onClick={() => { setEstado('cargando'); cargarDatos() }}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          🔁 Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* KPIs de la tabla de clientes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard valor={kpis.totalClientes} label="Clientes" icono="👥" color="cyan" />
        <KpiCard valor={kpis.totalCarritos} label="Carritos" icono="🛒" color="emerald" />
        <KpiCard valor={kpis.totalArticulos} label="Artículos vendidos" icono="📦" color="amber" />
        <KpiCard
          valor={`$${kpis.ingresoTotal.toFixed(2)}`}
          label={`Ingreso · Bs ${(kpis.ingresoTotal * TASA_BCV).toLocaleString('es-VE')}`}
          icono="💰"
          color="rose"
        />
      </div>

      {/* Barra de filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="🔍 Buscar por nombre, email o ciudad…"
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
        />
        <select
          value={ciudadSeleccionada}
          onChange={(evento) => setCiudadSeleccionada(evento.target.value)}
          className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
        >
          <option value="todas">Todas las ciudades</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </select>
        <select
          value={orden}
          onChange={(evento) => setOrden(evento.target.value)}
          className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
        >
          <option value="total-desc">Mayor gasto primero</option>
          <option value="total-asc">Menor gasto primero</option>
          <option value="nombre">Nombre (A-Z)</option>
        </select>
      </div>

      <p className="text-[11px] text-slate-500 mb-3">
        Mostrando <span className="text-white font-bold">{clientesFiltrados.length}</span> de {clientes.length} clientes
      </p>

      <ClientesTabla clientes={clientesFiltrados} />
    </div>
  )
}