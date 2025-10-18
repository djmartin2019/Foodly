import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // ✅ Load all environment variables from process.env + .env files
  const env = loadEnv(mode, process.cwd(), '')

  // ✅ Log for Cloudflare build logs (won't expose actual values)
  console.log('🧱 Building Foodly for:', mode)
  console.table({
    VITE_SUPABASE_URL: env.VITE_SUPABASE_URL ? '✅ Loaded' : '❌ Missing',
    VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing',
    VITE_MAPBOX_TOKEN: env.VITE_MAPBOX_TOKEN ? '✅ Loaded' : '❌ Missing',
  })

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
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'import.meta.env.VITE_MAPBOX_TOKEN': JSON.stringify(env.VITE_MAPBOX_TOKEN),
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
  }
})
