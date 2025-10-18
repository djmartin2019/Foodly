import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
});
