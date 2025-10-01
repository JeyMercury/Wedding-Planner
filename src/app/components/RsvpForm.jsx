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
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Tu nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Ej: Juan García"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Asistencia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Asistirás?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.asistencia === "sí"}
              onChange={() =>
                setForm({ ...form, asistencia: form.asistencia === "sí" ? "" : "sí" })
              }
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            Sí
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.asistencia === "no"}
              onChange={() =>
                setForm({ ...form, asistencia: form.asistencia === "no" ? "" : "no" })
              }
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            No
          </label>
        </div>
      </div>
      {/* Acompañante */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Traerás acompañante?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.acompañante === "sí"}
              onChange={() =>
                setForm({ ...form, acompañante: form.acompañante === "sí" ? "" : "sí" })
              }
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            Sí
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.acompañante === "no"}
              onChange={() =>
                setForm({ ...form, acompañante: form.acompañante === "no" ? "" : "no" })
              }
              className="h-4 w-4 text-lime-500 border-gray-300 focus:ring-lime-400"
            />
            No
          </label>
        </div>
      </div>

      {/* Alergias / intolerancias */}
      <div>
        <label htmlFor="alergias" className="block text-sm font-medium text-gray-700 mb-1">
          ¿Tienes alergias o intolerancias?
        </label>
        <input
          id="alergias"
          name="alergias"
          type="text"
          placeholder="Por ejemplo: gluten, frutos secos..."
          value={form.alergias}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Menú */}
      <div>
        <label htmlFor="menu" className="block text-sm font-medium text-gray-700 mb-1">
          Preferencia de menú
        </label>
        <select
          id="menu"
          name="menu"
          value={form.menu}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        >
          <option value="">-- selecciona --</option>
          <option value="normal">Normal</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="vegano">Vegano</option>
          <option value="sin gluten">Sin gluten / libre de alérgenos</option>
        </select>
      </div>

      {/* Transporte */}
      <div>
        <label htmlFor="transporte" className="block text-sm font-medium text-gray-700 mb-1">
          ¿Necesitas transporte / indicaciones?
        </label>
        <select
          id="transporte"
          name="transporte"
          value={form.transporte}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        >
          <option value="">-- selecciona --</option>
          <option value="no">No, iré por mi cuenta</option>
          <option value="sí">Sí, agradecería transporte / indicaciones</option>
        </select>
      </div>

      {/* Comentarios */}
      <div>
        <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-1">
          Comentarios / mensaje adicional
        </label>
        <textarea
          id="comentarios"
          name="comentarios"
          rows={3}
          placeholder="¿Algo que nos quieras decir?"
          value={form.comentarios}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
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
