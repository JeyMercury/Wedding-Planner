import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { error } = await supabase
      .from("rsvps")
      .insert([
        {
          nombre: body.nombre,
          asistencia: body.asistencia,
          plus_one: body.plusOne,
          cata: body.cata,
        },
      ])

    if (error) throw error

    return NextResponse.json({ message: "Confirmación guardada con éxito 🎉" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Error al guardar" }, { status: 500 })
  }
}
