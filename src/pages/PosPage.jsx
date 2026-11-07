import { useState, useEffect, useMemo } from 'react'
import { obtenerpos} from '../data/api.js'
import KpiCard from '../components/KpiCard.jsx'
import PosTabla from '../components/PosTabla.jsx'
import BarraCargando from '../components/BarraCargando.jsx'




export const PosPage = () => {
  const [pos, setPos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [mensajeError, setMensajeError] = useState('')

  const cargarDatos = async () => {
      try {
        const posData = await obtenerpos()
        setPos(posData)
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

  
    if (estado === 'cargando') {
      return (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3 , 4].map((i) => (
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
  <div> 
    <p className="text-[11px] text-slate-500 mb-3">
         Mostrando <span className="text-white font-bold">{pos.length}</span> 
       </p>
 
       <PosTabla Posts={pos} />
     </div>
   )
 }
