import { supabase } from './supabaseClient'

/**
 * Inserta los datos del formulario en la tabla "rsvps" de Supabase
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
      .insert([
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
        }
      ])

    if (error) {
      console.error('❌ Error insertando en Supabase:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true }

  } catch (err) {
    console.error('❌ Error inesperado al insertar RSVP:', err)
    return { success: false, error: err.message }
  }
}
