import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase environment variables. Requests will fail.');
}

if (supabaseAnonKey?.startsWith('sbp_')) {
  console.error('CRITICAL: You are using a Personal Access Token (sbp_...) instead of the Anon Public Key (eyJ...). Please update your credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);