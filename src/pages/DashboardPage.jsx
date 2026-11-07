// =====================================================================
// ARCHIVO: src/pages/DashboardPage.jsx
// ---------------------------------------------------------------------
// Reemplaza TODO el archivo placeholder del Bloque 1 por este.
// Dashboard PRINCIPAL: KPIs de VARIAS tablas (clientes, productos,
// carritos, ventas) y accesos a los listados. No muestra tablas
// detalladas: eso vive en /clientes y /productos.
// =====================================================================
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  obtenerUsuarios,
  obtenerCarritos,
  obtenerProductos,
  unirClientesYCarritos,
} from '../data/api.js'
import KpiCard from '../components/KpiCard.jsx'
import BarraCargando from '../components/BarraCargando.jsx'

const TASA_BCV = 40

export default function DashboardPage() {
  const [usuarios, setUsuarios] = useState([])
  const [carritos, setCarritos] = useState([])
  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [mensajeError, setMensajeError] = useState('')

  // Carga de los TRES endpoints en orden (sin Promise.all).
  const cargarDatos = async () => {
    try {
      const usuariosData = await obtenerUsuarios()
      const carritosData = await obtenerCarritos()
      const productosData = await obtenerProductos()
      setUsuarios(usuariosData)
      setCarritos(carritosData)
      setProductos(productosData)
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

  // KPIs DE VARIAS TABLAS.
  const resumen = useMemo(() => {
    const clientes = unirClientesYCarritos(usuarios, carritos)
    const ingresoTotal = clientes.reduce((suma, c) => suma + c.totalGastado, 0)
    const totalCarritos = carritos.length
    const totalCategorias = new Set(productos.map((p) => p.category)).size

    return {
      totalClientes: clientes.length,
      totalProductos: productos.length,
      totalCarritos,
      ingresoTotal,
      totalCategorias,
      ticketPromedio: totalCarritos ? ingresoTotal / totalCarritos : 0,
    }
  }, [usuarios, carritos, productos])

  if (estado === 'cargando') return <BarraCargando filas={6} />

  if (estado === 'error') {
    return (
      <div className="text-center py-20">
        <p className="text-white font-bold mb-4">No se pudieron cargar los datos</p>
        <button onClick={cargarDatos} className="px-6 py-3 bg-rose-600 text-white rounded-xl text-xs font-bold cursor-pointer">
          🔁 Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* KPIs de varias tablas */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <KpiCard valor={resumen.totalClientes} label="Clientes" icono="👥" color="cyan" />
        <KpiCard valor={resumen.totalProductos} label="Productos" icono="📦" color="emerald" />
        <KpiCard valor={resumen.totalCarritos} label="Carritos" icono="🛒" color="amber" />
        <KpiCard valor={resumen.totalCategorias} label="Categorías" icono="🏷️" color="cyan" />
        <KpiCard valor={`$${resumen.ingresoTotal.toFixed(2)}`} label={`Ingreso · Bs ${(resumen.ingresoTotal * TASA_BCV).toLocaleString('es-VE')}`} icono="💰" color="rose" />
        <KpiCard valor={`$${resumen.ticketPromedio.toFixed(2)}`} label="Ticket promedio" icono="🧾" color="emerald" />
      </div>

      {/* Accesos a los listados */}
      <h2 className="text-white font-bold text-sm mb-4">Explorar los listados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/clientes" className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all no-underline">
          <h3 className="text-white font-black text-base mb-2">👥 Clientes</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">KPIs de la tabla + búsqueda + filtro por ciudad + detalle.</p>
        </Link>
        <Link to="/productos" className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all no-underline">
          <h3 className="text-white font-black text-base mb-2">📦 Productos</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">KPIs de la tabla + búsqueda + filtro por categoría + orden.</p>
        </Link>
      </div>
    </div>
  )
}