import { createClient } from '@supabase/supabase-js'

// ✅ Estas variables se definen en Vercel (Settings → Environment Variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ⚠️ Comprobación básica por si faltan las variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Error: faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY.\n' +
    'Añádelas en tu panel de Vercel → Settings → Environment Variables.'
  )
}

// 🔗 Crea el cliente Supabase que podrás importar en todo tu proyecto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
