"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminRsvps() {
  const [rsvps, setRsvps] = useState([])
  const [stats, setStats] = useState(null)

  // 🔹 Obtener datos al cargar la página
  useEffect(() => {
    const fetchRsvps = async () => {
      const { data, error } = await supabase.from("rsvps").select("*")
      if (error) console.error("Error al cargar RSVPs:", error)
      else {
        setRsvps(data)
        calcularEstadisticas(data)
      }
    }

    fetchRsvps()
  }, [])

  // 🔹 Calcular estadísticas
  const calcularEstadisticas = (data) => {
    const totalAsistentes = data.length + data.filter(r => r.acompanante === "sí").length
    const totalNinos = data.reduce((sum, r) => sum + (r.cantidad_ninos || 0), 0)

    const menus = {
      normal: data.filter(r => !r.menu || r.menu === "normal").length,
      vegetariano: data.filter(r => r.menu === "vegetariano").length,
      vegano: data.filter(r => r.menu === "vegano").length,
      sin_gluten: data.filter(r => r.menu === "sin gluten").length,
      embarazo: data.filter(r => r.menu === "embarazo").length,
    }

    const platos = {
      carne: data.filter(r => r.carneopescado === "carne").length,
      pescado: data.filter(r => r.carneopescado === "pescado").length,
    }

    const transporte = {
      fuenlabrada: data.filter(r => r.transporte === "fuenlabrada").length,
      madrid: data.filter(r => r.transporte === "madrid").length,
    }

    const catas = {
      si: data.filter(r => r.cata === "sí").length,
      si00: data.filter(r => r.cata === "sí-00").length,
    }

    setStats({
      totalAsistentes,
      totalNinos,
      ...menus,
      ...platos,
      ...transporte,
      ...catas
    })
  }

  if (!stats) return <div className="p-10 text-center">Cargando datos...</div>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-lime-800 text-center">Panel de Asistentes</h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        <Stat title="Total Asistentes" value={stats.totalAsistentes} />
        <Stat title="Niños" value={stats.totalNinos} />
        <Stat title="Menú Normal" value={stats.normal} />
        <Stat title="Vegetariano" value={stats.vegetariano} />
        <Stat title="Vegano" value={stats.vegano} />
        <Stat title="Sin gluten" value={stats.sin_gluten} />
        <Stat title="Embarazo" value={stats.embarazo} />
        <Stat title="Carne" value={stats.carne} />
        <Stat title="Pescado" value={stats.pescado} />
        <Stat title="Bus Fuenlabrada" value={stats.fuenlabrada} />
        <Stat title="Bus Madrid" value={stats.madrid} />
        <Stat title="Cata" value={stats.si} />
        <Stat title="Cata 0,0%" value={stats.si00} />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-lime-700 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Asistencia</th>
              <th className="px-4 py-2">Acompañante</th>
              <th className="px-4 py-2">Niños</th>
              <th className="px-4 py-2">Alergias</th>
              <th className="px-4 py-2">Menú</th>
              <th className="px-4 py-2">Carne/Pescado</th>
              <th className="px-4 py-2">Transporte</th>
              <th className="px-4 py-2">Cata</th>
              <th className="px-4 py-2">Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={r.id} className="border-b hover:bg-lime-50">
                <td className="px-4 py-2">{r.nombre}</td>
                <td className="px-4 py-2">{r.asistencia}</td>
                <td className="px-4 py-2">{r.acompanante === "sí" ? r.nombre_acompanante || "Sí" : "No"}</td>
                <td className="px-4 py-2">{r.cantidad_ninos || 0}</td>
                <td className="px-4 py-2">{r.alergias || "-"}</td>
                <td className="px-4 py-2 capitalize">{r.menu}</td>
                <td className="px-4 py-2 capitalize">{r.carneopescado}</td>
                <td className="px-4 py-2 capitalize">{r.transporte}</td>
                <td className="px-4 py-2 capitalize">{r.cata}</td>
                <td className="px-4 py-2">{r.comentarios || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Componente de tarjeta de estadística
function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center border border-lime-200">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-lime-700">{value}</p>
    </div>
  )
}
