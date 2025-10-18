import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  // Get environment variables with fallbacks for production
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const mapboxToken = env.VITE_MAPBOX_TOKEN || process.env.VITE_MAPBOX_TOKEN;

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

    // Define environment variables for build
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
