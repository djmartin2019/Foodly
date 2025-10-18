import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // ✅ Load all environment variables from process.env + .env files
  const env = loadEnv(mode, process.cwd(), "");

  // ✅ Enhanced logging for Cloudflare Pages debugging
  console.log("🧱 Building Foodly for:", mode);
  console.log("📋 Environment variables check:");
  console.table({
    VITE_SUPABASE_URL: env.VITE_SUPABASE_URL ? "✅ Loaded" : "❌ Missing",
    VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY
      ? "✅ Loaded"
      : "❌ Missing",
    VITE_MAPBOX_TOKEN: env.VITE_MAPBOX_TOKEN ? "✅ Loaded" : "❌ Missing",
  });

  // ✅ Debug: Show what's actually in process.env
  console.log("🔍 Process.env keys containing VITE_:", 
    Object.keys(process.env).filter(key => key.startsWith('VITE_'))
  );

  // ✅ Fallback values for Cloudflare Pages (when env vars aren't passed)
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://tbcodjhsyktoldyzflax.supabase.co";
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY29kamhzeWt0b2xkeXpmbGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjcyMjcsImV4cCI6MjA3NjMwMzIyN30.rD6ICOoQSmUCpAdUp8QnXnHMO3jwyiEXThoXM2bdDgY";
  const mapboxToken = env.VITE_MAPBOX_TOKEN || process.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNjRheDA4YWcya29jdWluamJiOHlifQ.6GnpfyZAEN4PL5zBXOsP_A";

  console.log("🎯 Final resolved values:");
  console.table({
    "Supabase URL": supabaseUrl ? "✅ Resolved" : "❌ Missing",
    "Supabase Key": supabaseAnonKey ? "✅ Resolved" : "❌ Missing", 
    "Mapbox Token": mapboxToken ? "✅ Resolved" : "❌ Missing",
  });

  return {
    plugins: [react()],

    // Base public path - use '/' for root deployment
    base: "/",

    build: {
      // Output directory for Cloudflare Pages
      outDir: "dist",

      // Generate sourcemaps for better debugging
      sourcemap: false,

      // Optimize chunk size
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            supabase: ["@supabase/supabase-js"],
            mapbox: ["mapbox-gl"],
          },
        },
      },
    },

    // ✅ Explicitly define environment variables for build
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(supabaseAnonKey),
      "import.meta.env.VITE_MAPBOX_TOKEN": JSON.stringify(mapboxToken),
    },

    // Preview server config (for local testing)
    preview: {
      port: 4173,
      strictPort: false,
    },

    // Dev server config
    server: {
      port: 5173,
      strictPort: false,
      host: true,
    },
  };
});
