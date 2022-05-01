import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.VUE_APP_LOCAL_SUPABASE_URL;
const supabaseAnonKey: string = process.env.VUE_APP_LOCAL_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)