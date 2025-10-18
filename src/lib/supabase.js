import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// More detailed error logging for debugging
console.log("Environment check:", {
  supabaseUrl: supabaseUrl ? "✅ Found" : "❌ Missing",
  supabaseAnonKey: supabaseAnonKey ? "✅ Found" : "❌ Missing",
  env: import.meta.env.MODE,
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables:", {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? "Present" : "Missing",
    allEnvVars: Object.keys(import.meta.env),
  });

  throw new Error(
    `Missing Supabase environment variables. 
    VITE_SUPABASE_URL: ${supabaseUrl ? "Found" : "Missing"}
    VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "Found" : "Missing"}
    Environment: ${import.meta.env.MODE}
    Available env vars: ${Object.keys(import.meta.env).join(", ")}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
