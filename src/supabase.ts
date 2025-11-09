
import { createClient } from '@supabase/supabase-js'
import { getSecret } from 'astro:env/server'
const supabaseUrl = 'https://ftxzkolsexefileehfct.supabase.co'
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey!)