import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.VUE_APP_HOSTED_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.VUE_APP_HOSTED_SUPABASE_ANON_KEY!;
console.log('url = ' + supabaseUrl);
console.log('anonKey = ' + supabaseAnonKey);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)