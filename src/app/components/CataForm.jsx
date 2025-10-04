"use client"
import { useState } from "react"

export default function RsvpForm() {
  const [form, setForm] = useState({
    nombre: "",
    asistencia: "",
    plusOne: false,
    cata: false,
    alergias: "",
    menu: "",
    transporte: "",
    alojamiento: false,
    talla: "",
    comentarios: ""
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    alert(data.message)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-lime-100">

      {/* Cata */}
      <div className="flex justify-center">
        <label htmlFor="cata" className="block text-sm font-medium text-gray-700 mb-4 text-center">
          <p>¿Te gustaría asistir a una cata maridaje con cerveza durante el cóctel? 🍺</p>
          <p>(3 cervezas con aperitivo, unos 30 minutos de duración)</p>
        </label>
      </div>

      <div className="text-center item">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Asistirás a la cata de cervezas?
        </label>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="cata"
              value="sí"
              checked={form.cata === "sí"}
              onChange={handleChange}
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            Sí
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="cata"
              value="sí-00"
              checked={form.cata === "sí-00"}
              onChange={handleChange}
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            Sí, pero 0,0%
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="cata"
              value="no"
              checked={form.cata === "no"}
              onChange={handleChange}
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            No
          </label>
        </div>
      </div>

      {/* Botón */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-lime-700 hover:bg-lime-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all cursor-pointer"
        >
          Enviar respuesta
        </button>
      </div>
    </form>
  )
}
