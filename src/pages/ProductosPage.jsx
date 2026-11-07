// =====================================================================
// ARCHIVO: src/pages/ProductosPage.jsx
// ---------------------------------------------------------------------
// Reemplaza TODO el archivo placeholder del Bloque 1 por este.
// LISTADO de productos = KPIs de SU tabla + filtros + tabla.
// Es el mismo patrón del listado de clientes, con otra entidad.
// =====================================================================
import { useState, useEffect, useMemo } from 'react'
import { obtenerProductos, normalizar } from '../data/api.js'
import KpiCard from '../components/KpiCard.jsx'
import ProductosTabla from '../components/ProductosTabla.jsx'
import BarraCargando from '../components/BarraCargando.jsx'

export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [mensajeError, setMensajeError] = useState('')

  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [orden, setOrden] = useState('precio-desc')

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos()
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

  // Pipeline: filtrado + orden.
  const productosFiltrados = useMemo(() => {
    let resultado = productos

    if (busqueda.trim()) {
      const texto = normalizar(busqueda)
      resultado = resultado.filter(
        (producto) =>
          normalizar(producto.title).includes(texto) ||
          normalizar(producto.brand || '').includes(texto) ||
          normalizar(producto.category).includes(texto),
      )
    }

    if (categoriaSeleccionada !== 'todas') {
      resultado = resultado.filter(
        (producto) => producto.category === categoriaSeleccionada,
      )
    }

    resultado = [...resultado].sort((a, b) => {
      if (orden === 'precio-desc') return b.price - a.price
      if (orden === 'precio-asc') return a.price - b.price
      if (orden === 'rating-desc') return b.rating - a.rating
      if (orden === 'stock-desc') return b.stock - a.stock
      return 0
    })

    return resultado
  }, [productos, busqueda, categoriaSeleccionada, orden])

  // KPIs DE LA TABLA de productos.
  const kpis = useMemo(() => {
    const totalProductos = productosFiltrados.length
    const totalCategorias = new Set(productosFiltrados.map((p) => p.category)).size
    const precioPromedio = totalProductos
      ? productosFiltrados.reduce((s, p) => s + p.price, 0) / totalProductos
      : 0
    const stockTotal = productosFiltrados.reduce((s, p) => s + p.stock, 0)

    return { totalProductos, totalCategorias, precioPromedio, stockTotal }
  }, [productosFiltrados])

  const categorias = useMemo(() => {
    const lista = [...new Set(productos.map((p) => p.category))]
    return lista.sort()
  }, [productos])

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
        <h2 className="text-white font-bold text-lg mb-2">No se pudieron cargar los productos</h2>
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
      {/* KPIs de la tabla de productos */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard valor={kpis.totalProductos} label="Productos" icono="📦" color="cyan" />
        <KpiCard valor={kpis.totalCategorias} label="Categorías" icono="🏷️" color="emerald" />
        <KpiCard
          valor={`$${kpis.precioPromedio.toFixed(2)}`}
          label="Precio promedio"
          icono="💲"
          color="amber"
        />
        <KpiCard valor={kpis.stockTotal} label="Stock total" icono="📊" color="rose" />
      </div>

      {/* Barra de filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          placeholder="🔍 Buscar por producto, marca o categoría…"
          className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
        />
        <select
          value={categoriaSeleccionada}
          onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
          className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer capitalize"
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
        <select
          value={orden}
          onChange={(evento) => setOrden(evento.target.value)}
          className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
        >
          <option value="precio-desc">Mayor precio primero</option>
          <option value="precio-asc">Menor precio primero</option>
          <option value="rating-desc">Mejor rating</option>
          <option value="stock-desc">Más stock</option>
        </select>
      </div>

      <p className="text-[11px] text-slate-500 mb-3">
        Mostrando <span className="text-white font-bold">{productosFiltrados.length}</span> de {productos.length} productos
      </p>

      <ProductosTabla productos={productosFiltrados} />
    </div>
  )
}