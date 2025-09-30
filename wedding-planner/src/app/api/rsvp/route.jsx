export async function POST(req) {
  const body = await req.json()
  console.log("RSVP recibido:", body) // De momento solo lo mostramos en consola

  return new Response(JSON.stringify({ message: "¡Gracias por confirmar!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
