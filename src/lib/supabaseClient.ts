import { createClient } from "@supabase/supabase-js";

// Try multiple sources for environment variables
const getEnvVar = (key: string) => {
  // 1. Try import.meta.env (build-time)
  if (import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  // 2. Try window.APP_CONFIG (runtime config)
  if (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG[key]) {
    return window.APP_CONFIG[key];
  }
  
  // 3. Try process.env (fallback)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  return null;
};

const url = getEnvVar('VITE_SUPABASE_URL');
const anonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Enhanced debugging
console.log("Environment variable sources check:", {
  'import.meta.env.VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL ? "✅ Found" : "❌ Missing",
  'window.APP_CONFIG.VITE_SUPABASE_URL': (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.VITE_SUPABASE_URL) ? "✅ Found" : "❌ Missing",
  'process.env.VITE_SUPABASE_URL': (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL) ? "✅ Found" : "❌ Missing",
  'Final resolved URL': url ? "✅ Found" : "❌ Missing"
});

console.log("Environment variable sources check:", {
  'import.meta.env.VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing",
  'window.APP_CONFIG.VITE_SUPABASE_ANON_KEY': (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.VITE_SUPABASE_ANON_KEY) ? "✅ Found" : "❌ Missing",
  'process.env.VITE_SUPABASE_ANON_KEY': (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY) ? "✅ Found" : "❌ Missing",
  'Final resolved Key': anonKey ? "✅ Found" : "❌ Missing"
});

if (!url || !anonKey) {
  console.error("❌ Missing Supabase environment variables.");
  console.table({
    VITE_SUPABASE_URL: url ?? "undefined",
    VITE_SUPABASE_ANON_KEY: anonKey ? "defined" : "undefined",
    env: import.meta.env.MODE,
    windowConfig: typeof window !== 'undefined' ? window.APP_CONFIG : "Not available",
  });
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(url, anonKey);
console.log("✅ Supabase initialized successfully");
