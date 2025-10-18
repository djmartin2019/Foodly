import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cloudflare Pages specific environment variable handling
  // Cloudflare Pages passes env vars differently than other platforms
  
  console.log("Building with environment:", mode);
  console.log("Process.env keys:", Object.keys(process.env).filter(key => 
    key.includes('SUPABASE') || key.includes('MAPBOX') || key.includes('VITE_')
  ));

  // Try multiple ways Cloudflare Pages might pass environment variables
  const getEnvVar = (key: string) => {
    // Try different variations that Cloudflare Pages might use
    const variations = [
      process.env[key],                    // Direct access
      process.env[`VITE_${key}`],          // With VITE_ prefix
      process.env[key.toUpperCase()],      // Uppercase
      process.env[`VITE_${key.toUpperCase()}`], // VITE_ + uppercase
    ];
    
    const value = variations.find(v => v);
    console.log(`${key}:`, value ? "✅ Found" : "❌ Missing", value ? `(${value.substring(0, 20)}...)` : "");
    return value;
  };

  const supabaseUrl = getEnvVar('SUPABASE_URL') || getEnvVar('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY') || getEnvVar('VITE_SUPABASE_ANON_KEY');
  const mapboxToken = getEnvVar('MAPBOX_TOKEN') || getEnvVar('VITE_MAPBOX_TOKEN');

  console.log("Final resolved values:");
  console.log("Supabase URL:", supabaseUrl ? "✅ Present" : "❌ Missing");
  console.log("Supabase Anon Key:", supabaseAnonKey ? "✅ Present" : "❌ Missing");
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