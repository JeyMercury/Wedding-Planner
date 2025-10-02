// src/app/page.tsx

import Image from "next/image"
import RsvpForm from "./components/RsvpForm"
import CataForm from "./components/CataForm"

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <Image
          src="/images/dolomitas_tres_picos.jpg" 
          alt="Foto de título"
          fill
          priority
          className="object-cover object-[80%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
            Alba & Juanjo
          </h1>
          <p className="text-xl md:text-2xl text-white">
            28 Febrero 2026 · Valdetorres de Jarama, Madrid
          </p>
        </div>
      </section>

      {/* Bienvenida / mensaje */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-lime-800 mb-6">
          ¡Bienvenidos!
        </h2>
        <p className="text-lg leading-relaxed">
          ¡Que sí! Que nos casamos!!! Estamos super felices y queremos compartir contigo todo nuestro amor.  
          Aquí podrás enterarte de los detalles y confirmar tu asistencia.
        </p>
      </section>

      {/* Detalles de la boda */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-serif text-lime-800 mb-8 text-center">
          Detalles del evento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Lugar</h3>
            <p>Valdetorres de Jarama, Madrid</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Fecha y hora</h3>
            <p>28 Febrero 2026, 12:00</p>
          </div>
          {/* Puedes añadir más cards: transporte, alojamiento, mapa, etc. */}
        </div>
        <div className="flex justify-center mt-8">
          <Image
            src="/images/fuerteventura_playa_palomitas.jpg" 
            alt="Foto de título"
            width={768}
            height={100}
            priority
            className="object-cover h-80"
          />
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-serif text-lime-800 mb-8 text-center">
          Confirma tu asistencia
        </h2>
        <div className="max-w-xl mx-auto">
          <RsvpForm />
        </div>
      </section>

      {/* Preguntas / encuesta */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-serif text-lime-800 mb-6 text-center">
          Unas preguntitas
        </h2>
        <p className="text-center mb-4">
          Cuéntanos si asistirás a la cata de cervezas, si tienes preferencias alimentarias, etc.
        </p>
        <div className="max-w-xl mx-auto ">
          <CataForm />
        </div>
        {/* Aquí podrías insertar otro formulario o campos extra debajo del RSVP o por separado */}
      </section>

      {/* Pie / contacto */}
      <footer className="py-12 bg-white border-t">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-800">¿Dudas o consultas? Escríbenos.</p>
          <p className="mt-2 text-gray-500">© 2026 Alba & Juanjo</p>
        </div>
      </footer>
    </main>
  )
}
