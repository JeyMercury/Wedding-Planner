import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación básica de los campos requeridos
    if (!body.nombre || !body.asistencia || !body.menu || !body.cata) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    // Inserta los datos en Supabase
    const { error } = await supabase.from("rsvps").insert([
      {
        nombre: body.nombre,
        asistencia: body.asistencia === "sí",
        acompanante:
          body.acompanante === true ||
          body.acompanante === "sí" ||
          body.acompanante === "true"
            ? "sí"
            : "no",
        nombre_acompanante: body.nombre_acompanante || null,
        ninos: 
          body.ninos === true ||
          body.ninos === "sí" ||
          body.ninos === "true"
            ? "sí"
            : "no",
        cantidad_ninos:
          body.ninos === "sí" && body.cantidad_ninos !== ""
            ? Number(body.cantidad_ninos)
            : 0,
        alergias: body.alergias || null,
        menu: Array.isArray(body.menu)
          ? body.menu
          : body.menu
          ? [body.menu]
          : null,
        carneopescado: body.carneopescado || null,
        transporte: body.transporte || null,
        comentarios: body.comentarios || null,
        cata: body.cata || "no",
      },
    ]);

    if (error) {
      console.error("❌ Error Supabase:", error);
      throw error;
    }

    return NextResponse.json({
      message: "✅ Confirmación guardada con éxito 🎉",
    });
  } catch (err: any) {
    console.error("❌ Error general:", err);
    return NextResponse.json(
      { message: "Error al guardar la confirmación." },
      { status: 500 }
    );
  }
}
