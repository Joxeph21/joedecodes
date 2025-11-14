
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ftxzkolsexefileehfct.supabase.co'
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey!)