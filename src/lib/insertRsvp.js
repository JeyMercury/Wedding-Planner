import { supabase } from './supabaseClient'

/**
 * Inserta o actualiza los datos del formulario en la tabla "rsvps"
 * @param {Object} form - Datos recogidos del formulario
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function insertRsvp(form) {
  try {
    const {
      nombre,
      asistencia,
      acompanante,
      nombre_acompanante,
      alergias,
      menu,
      carneopescado,
      transporte,
      comentarios,
      cata
    } = form

    const { error } = await supabase
      .from('rsvps')
      .upsert([
        {
          nombre,
          asistencia: 
            asistencia === true || asistencia === 'sí' || asistencia === 'true'
              ? 'sí'
              : 'no',
          acompanante: 
            acompanante === true || acompanante === 'sí' || acompanante === 'true'
              ? 'sí'
              : 'no',
          nombre_acompanante: nombre_acompanante || null,
          alergias: alergias || null,
          menu: Array.isArray(menu) ? menu.join(', ') : menu || null,
          carneopescado: carneopescado || null,
          transporte: transporte || null,
          comentarios: comentarios || null,
          cata:
            cata === true || cata === 'sí' || cata === 'true'
              ? 'sí'
              : 'no',
          created_at: new Date().toISOString()
        }
      ],{ onConflict: 'nombre' })

    if (error) {
      console.error('❌ Error insertando/actualizando en Supabase:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true }

  } catch (err) {
    console.error('❌ Error inesperado al insertar/actualizar RSVP:', err)
    return { success: false, error: err.message }
  }
}
