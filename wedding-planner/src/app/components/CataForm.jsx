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
            <label htmlFor="transporte" className="block text-sm font-medium text-gray-700 mb-4 text-center">
                <p>¿Te gustaría asistir a una cata maridaje con cerveza durante el cóctel? 🍺</p>
                <p>(3 cervezas con aperitivo, unos 30 minutos de duración)</p>
            </label>
        </div>
        <div className="flex items-center">
            <input
            id="cata"
            name="cata"
            type="checkbox"
            checked={form.cata}
            onChange={handleChange}
            className="h-4 w-4 text-lime-600 border-gray-300 rounded focus:ring-lime-400"
            />
            <label htmlFor="cata" className="ml-2 text-sm text-gray-700">
            ¿Asistirás a la cata de cervezas?
            </label>
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
