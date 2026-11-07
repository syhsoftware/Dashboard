// =====================================================================
// ARCHIVO: src/pages/ClienteDetalle.jsx
// ---------------------------------------------------------------------
// Reemplaza TODO el archivo placeholder del Bloque 1 por este.
// Página de drill-down. La URL /clientes/:id trae el id del cliente.
// useParams() lo extrae y con él cargamos SU perfil y SUS carritos.
// =====================================================================
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerUsuario, obtenerCarritosDeUsuario } from '../data/api.js'
import BarraCargando from '../components/BarraCargando.jsx'

export default function ClienteDetalle() {
  // id viene de la ruta /clientes/:id.
  const { id } = useParams()

  // Estado del cliente y de sus carritos.
  const [cliente, setCliente] = useState(null)
  const [carritos, setCarritos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [mensajeError, setMensajeError] = useState('')

  useEffect(() => {
    // Bandera para evitar setState tras desmontar (navegación rápida).
    let cancelado = false

    const cargarDetalle = async () => {
      setEstado('cargando')
      try {
        // Cargamos el perfil y luego sus carritos (en orden, sin Promise.all).
        const usuarioData = await obtenerUsuario(id)
        const carritosData = await obtenerCarritosDeUsuario(id)
        if (!cancelado) {
          setCliente(usuarioData)
          setCarritos(carritosData)
          setEstado('listo')
        }
      } catch (error) {
        if (!cancelado) {
          setMensajeError(error.message)
          setEstado('error')
        }
      }
    }

    cargarDetalle()

    // Limpieza: si el usuario navega a otro cliente, cancelamos.
    return () => {
      cancelado = true
    }
  }, [id])  // ← se recarga si cambia el id de la URL

  // --- Estados de carga y error ---
  if (estado === 'cargando') {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="h-10 w-72 rounded-xl bg-slate-800/60 animate-pulse mb-8" />
        <BarraCargando filas={4} />
      </div>
    )
  }

  if (estado === 'error') {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl bg-slate-950 border border-rose-500/30">
        <span className="text-4xl block mb-3">😕</span>
        <h2 className="text-white font-bold text-lg mb-2">Cliente no encontrado</h2>
        <p className="text-[11px] text-slate-400 mb-6">{mensajeError}</p>
        <Link to="/dashboard" className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold no-underline">
          ← Volver al dashboard
        </Link>
      </div>
    )
  }

  // --- Vista de detalle ---
  return (
    <div className="max-w-5xl mx-auto">
      {/* Botón volver */}
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-white no-underline mb-6">
        ← Volver al dashboard
      </Link>

      {/* Tarjeta de perfil del cliente */}
      <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-3xl bg-slate-950 border border-slate-800 mb-8">
        <img
          src={cliente.image}
          alt={cliente.firstName}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-500/30"
        />
        <div>
          <h2 className="text-2xl font-black text-white mb-1">
            {cliente.firstName} {cliente.lastName}
          </h2>
          <p className="text-[11px] text-slate-400">{cliente.email}</p>
          <p className="text-[10px] text-slate-500 mt-1">
            🏙️ {cliente.address?.city} · 🏢 {cliente.company?.name}
          </p>
        </div>
      </div>

      {/* Carritos del cliente */}
      <h3 className="text-white font-bold text-sm mb-4">🛒 Carritos ({carritos.length})</h3>
      <div className="space-y-4">
        {carritos.map((carrito) => (
          <div key={carrito.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            {/* Encabezado del carrito: número de pedido + total */}
            <div className="flex justify-between mb-3 pb-3 border-b border-slate-900">
              <p className="text-white font-bold text-xs">Pedido #{carrito.id}</p>
              <p className="text-emerald-400 font-black text-sm">$ {carrito.discountedTotal.toFixed(2)}</p>
            </div>

            {/* Productos del carrito */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {carrito.products.map((producto) => (
                <div key={producto.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60">
                  <img src={producto.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-white text-[11px] font-bold truncate">{producto.title}</p>
                    <p className="text-[10px] text-slate-500">x{producto.quantity} · $ {producto.price.toFixed(2)}</p>
                  </div>
                  <p className="text-emerald-400 font-bold text-[11px]">$ {producto.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}