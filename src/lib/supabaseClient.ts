import { createClient } from "@supabase/supabase-js";

// Simple fallback approach - try multiple sources
const getSupabaseUrl = () => {
  return import.meta.env.VITE_SUPABASE_URL || 
         "https://tbcodjhsyktoldyzflax.supabase.co";
};

const getSupabaseAnonKey = () => {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || 
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY29kamhzeWt0b2xkeXpmbGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjcyMjcsImV4cCI6MjA3NjMwMzIyN30.rD6ICOoQSmUCpAdUp8QnXnHMO3jwyiEXThoXM2bdDgY";
};

const url = getSupabaseUrl();
const anonKey = getSupabaseAnonKey();

console.log("Supabase configuration:", {
  url: url ? "✅ Found" : "❌ Missing",
  anonKey: anonKey ? "✅ Found" : "❌ Missing",
  source: import.meta.env.VITE_SUPABASE_URL ? "build-time" : "fallback"
});

if (!url || !anonKey) {
  console.error("❌ Missing Supabase environment variables.");
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(url, anonKey);
console.log("✅ Supabase initialized successfully");
