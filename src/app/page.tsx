// src/app/page.tsx

import Image from "next/image"
import RsvpForm from "./components/RsvpForm"

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative h-dvh flex items-center justify-center bg-gray-100">
        <Image
          src="/images/dolomitas_tres_picos.jpg" 
          alt="Foto de título"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <p className="text-xl md:text-2xl text-white">
           ¡Nos casamos!
          </p>
          <h1 className="text-5xl md:text-6xl font-serif text-white m-4 mt-30">
            Alba & Juanjo
          </h1>
          <p className="text-xl md:text-2xl text-white">
            28 de Febrero 2026
          </p>
          <p className="text-xl md:text-2xl text-white">
            Valdetorres de Jarama, Madrid
          </p>
        </div>
      </section>

      {/* Bienvenida / mensaje */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        {/* <div className="absolute left-1/2 -translate-x-1/2 w-64 opacity-60 z-[0]">
          <Image
            src="/images/acuarela_planta.jpeg"
            alt="Decoración floral"
            width={300}
            height={150}
            className="mx-auto"
          />
        </div> */}
        <h2 className="text-3xl font-serif text-lime-800 mb-6">
          ¡Bienvenidos a nuestra boda!
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          ¡Nos casamos! 🎉
        </p>
        <p className="text-lg leading-relaxed mb-4">
          En esta web encontrarás toda la información sobre el gran día y podrás confirmar tu asistencia.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          ¡Te esperamos con muchas ganas para celebrar juntos!
        </p>
      </section>

      {/* Detalles de la boda */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-serif text-lime-800 mb-8 text-center">
          Detalles del evento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Fecha y hora</h3>
            <p>28 Febrero 2026, 12:30</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Lugar</h3>
            <p>Valdetorres de Jarama, Madrid</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Espacio</h3>
            <p>Finca Soto de Gracia</p>
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

      {/* Pie / contacto */}
      <footer className="py-12 bg-white border-t">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-800">¿Dudas o consultas? Escríbenos.</p>
          <p className="mt-2 text-gray-500">
            <span>Whatsapp: 650536101</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Email: jj.garcia.navas@hotmail.es</span>
          </p>
          <p className="mt-2 text-gray-500">© 2026 Alba & Juanjo</p>
        </div>
      </footer>
    </main>
  )
}
