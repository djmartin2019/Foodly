import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars for the current mode
  const env = loadEnv(mode, process.cwd(), "");

  console.log("Building with environment:", mode);
  console.log("All available env vars:", Object.keys(env));
  console.log(
    "Supabase URL (sanity check):",
    env.VITE_SUPABASE_URL ? "✅ Present" : "❌ Missing"
  );
  console.log(
    "Supabase Anon Key (sanity check):",
    env.VITE_SUPABASE_ANON_KEY ? "✅ Present" : "❌ Missing"
  );
  console.log(
    "Mapbox Token (sanity check):",
    env.VITE_MAPBOX_TOKEN ? "✅ Present" : "❌ Missing"
  );

  // Fallback to process.env for Cloudflare Pages
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey =
    env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const mapboxToken = env.VITE_MAPBOX_TOKEN || process.env.VITE_MAPBOX_TOKEN;

  console.log("Final values after fallback:");
  console.log("Supabase URL:", supabaseUrl ? "✅ Present" : "❌ Missing");
  console.log(
    "Supabase Anon Key:",
    supabaseAnonKey ? "✅ Present" : "❌ Missing"
  );
  console.log("Mapbox Token:", mapboxToken ? "✅ Present" : "❌ Missing");

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

    // Explicitly define environment variables for build
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
