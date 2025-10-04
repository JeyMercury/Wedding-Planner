"use client"
import { useState } from "react"

export default function RsvpForm() {
  const [form, setForm] = useState({
    nombre: "",
    asistencia: "",
    plusOne: false,
    cata: false,
    alergias: "",
    menu: [],
    carneopescado: "",
    transporte: "",
    comentarios: ""
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => {
        if (checked) {
          return { ...prev, [name]: [...prev[name], value] };
        } else {
          return { ...prev, [name]: prev[name].filter((v) => v !== value) };
        }
      });
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-lime-100">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block font-medium text-gray-700 mb-2">
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
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Asistencia */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          ¿Asistirás?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
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
          <label className="flex items-center gap-2 text-sm text-gray-700">
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
        <label className="block font-medium text-gray-700 mb-2">
          ¿Traerás acompañante?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
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
          <label className="flex items-center gap-2 text-sm text-gray-700">
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
      <div>
        <label htmlFor="nombre_acompañante" className="block font-medium text-gray-700 mb-2">
          Nombre del acompañante
        </label>
        <input
          id="nombre_acompañante"
          name="nombre_acompañante"
          type="text"
          placeholder="Ej: Juan García"
          value={form.nombre_acompañante}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Alergias / intolerancias */}
      <div>
        <label htmlFor="alergias" className="block font-medium text-gray-700 mb-2">
          ¿Tienes alergias o intolerancias?
        </label>
        <input
          id="alergias"
          name="alergias"
          type="text"
          placeholder="Por ejemplo: gluten, frutos secos..."
          value={form.alergias}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Menú */}
      <div>
        <p className="block font-medium text-gray-700 mb-2">
          Preferencia de menú
        </p>
        <div className="flex gap-6 text-sm text-gray-700">
          {["Normal", "Vegetariano", "Vegano", "Sin gluten", "Embarazo"].map((opcion) => (
            <label key={opcion} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="menu"
                value={opcion.toLowerCase()}
                checked={form.menu.includes(opcion.toLowerCase())}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-lime-500 focus:ring-lime-400"
                required
              />
              <span>{opcion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Carne o Pescado */}
      <div>
        <p className="block font-medium text-gray-700 mb-2">
          Carne o Pescado
        </p>
        <div className="flex gap-6 space-y-2 text-sm text-gray-700">
          {["Carne", "Pescado", "Otro (Vegano, vegetariano...)"].map((opcion) => (
            <label key={opcion} className="flex items-center space-x-2">
              <input
                type="radio"
                name="carneopescado"
                value={opcion.toLowerCase()}
                checked={form.carneopescado === opcion.toLowerCase()}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-lime-500 focus:ring-lime-400"
              />
              <span>{opcion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transporte */}
      <div>
        <p className="block font-medium text-gray-700 mb-2">
          Transporte en autobús 🚌
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          ¡Queremos organizar el transporte para que llegar a la boda sea fácil para todos!
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          Habrá opción desde Fuenlabrada y Madrid. Por favor, indícanos si te gustaría desplazarte en autobús:
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          {[
            { label: "Sí, agradecería transporte (Fuenlabrada)", value: "fuenlabrada" },
            { label: "Sí, agradecería transporte (Madrid)", value: "madrid" },
            { label: "No, iré por mi cuenta", value: "no" },
          ].map(({ label, value }) => (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="transporte"
                value={value}
                checked={form.transporte === value}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 text-lime-500 focus:ring-lime-400"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
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
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
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
