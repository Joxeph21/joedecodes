
import { createClient } from '@supabase/supabase-js'
import { getSecret } from 'astro:env/server'
const supabaseUrl = 'https://ftxzkolsexefileehfct.supabase.co'
const supabaseKey = getSecret("SUPABASE_KEY")
export const supabase = createClient(supabaseUrl, supabaseKey!)