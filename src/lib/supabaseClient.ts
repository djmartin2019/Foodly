import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("❌ Missing Supabase environment variables.");
  console.table({
    VITE_SUPABASE_URL: url ?? "undefined",
    VITE_SUPABASE_ANON_KEY: anonKey ? "defined" : "undefined",
    env: import.meta.env.MODE,
  });
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(url, anonKey);
console.log("✅ Supabase initialized successfully");
