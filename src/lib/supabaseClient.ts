import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("❌ Missing Supabase environment variables");
  throw new Error("Supabase env vars missing at runtime.");
}

export const supabase = createClient(url, anonKey);
