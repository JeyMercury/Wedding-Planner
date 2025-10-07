"use client"
import Image from "next/image"
import { useState } from "react"

export default function RsvpForm() {
  const [form, setForm] = useState({
    nombre: "",
    asistencia: "",
    acompañante: "",
    nombre_acompañante: "",
    alergias: "",
    menu: [],
    carneopescado: "",
    transporte: "",
    comentarios: ""
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "menu") {
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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-lime-100">
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
        <div className="flex flex-col sm:flex-row gap-4">
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
        <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Nombre acompañante */}
      <div>
        <label htmlFor="nombre_acompañante" className="block font-medium text-gray-700 mb-2">
          Nombre del acompañante
        </label>
        <input
          id="nombre_acompañante"
          name="nombre_acompañante"
          type="text"
          placeholder="Ej: María Pérez"
          value={form.nombre_acompañante}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 shadow-sm"
        />
      </div>

      {/* Alergias / intolerancias */}
      <div>
        <label htmlFor="alergias" className="block font-medium text-gray-700 mb-2">
          Alergias o Intolerancias 🗒️
        </label>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          ¿Tienes alguna alergia que debamos saber?
        </p>
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
          Preferencia de menú 🎉
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          ¡Queremos que tu experiencia en nuestra boda sea perfecta!
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          Para asegurarnos de que todos disfrutéis de la comida,
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          por favor indícanos si tienes alguna restricción alimentaria. (Si no tienes ninguna, no es necesario contestar)
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-700">
          {["Normal", "Vegetariano", "Vegano", "Sin gluten", "Embarazo"].map((opcion) => (
            <label key={opcion} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="menu"
                value={opcion.toLowerCase()}
                checked={form.menu.includes(opcion.toLowerCase())}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-lime-500 focus:ring-lime-400"
                required={form.menu.length === 0}
              />
              <span>{opcion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Carne o Pescado */}
      <div>
        <p className="block font-medium text-gray-700 mb-2">
          Carne o Pescado 🍽️
        </p>
        <p className="block text-sm font-medium text-gray-700 mb-1">
          Por favor, elige tu preferencia para el plato principal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
          {["Carne", "Pescado"].map((opcion) => (
            <label key={opcion} className="flex items-center gap-2">
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
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {[
            { label: "Sí, agradecería transporte (Fuenlabrada)", value: "fuenlabrada" },
            { label: "Sí, agradecería transporte (Madrid)", value: "madrid" },
            { label: "No, iré por mi cuenta", value: "no" },
          ].map(({ label, value }) => (
            <label key={value} className="flex items-center gap-2">
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

      {/* Cata */}
      <div>
        <h2 className="text-3xl font-serif text-lime-800 mb-6 text-center">
          Asistencia a Cata de Cerveza
        </h2>
        <div className="md:flex md:flex-center">
          <Image
            src="/images/juanjo_beer_square.jpg" 
            alt="Foto de título"
            width={250}
            height={175}
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] md:object-center md:mb-4"
          />
            <Image
              src="/images/alba_beer_square.jpg" 
              alt="Foto de título"
              width={250}
              height={175}
              priority
              className="object-cover object-[70%_center] md:object-center mb-4"
            />
          </div>
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
