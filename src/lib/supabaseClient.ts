import { createClient } from "@supabase/supabase-js";

// Configuration state
let configCache: any = null;
let configPromise: Promise<any> | null = null;

// Fetch configuration from Cloudflare Pages Function
const fetchConfig = async () => {
  if (configCache) return configCache;
  if (configPromise) return configPromise;

  configPromise = (async () => {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }
      configCache = await response.json();
      return configCache;
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      // Fallback to empty config
      configCache = {};
      return configCache;
    }
  })();

  return configPromise;
};

// Try multiple sources for environment variables
const getEnvVar = async (key: string) => {
  // 1. Try import.meta.env (build-time)
  if (import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  // 2. Try runtime config from Cloudflare Pages Function
  const config = await fetchConfig();
  if (config[key]) {
    return config[key];
  }
  
  // 3. Try process.env (fallback)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  return null;
};

// Initialize Supabase client
const initializeSupabase = async () => {
  const url = await getEnvVar('VITE_SUPABASE_URL');
  const anonKey = await getEnvVar('VITE_SUPABASE_ANON_KEY');

  // Enhanced debugging
  console.log("Environment variable sources check:", {
    'import.meta.env.VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL ? "✅ Found" : "❌ Missing",
    'runtime config VITE_SUPABASE_URL': (await fetchConfig()).VITE_SUPABASE_URL ? "✅ Found" : "❌ Missing",
    'process.env.VITE_SUPABASE_URL': (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL) ? "✅ Found" : "❌ Missing",
    'Final resolved URL': url ? "✅ Found" : "❌ Missing"
  });

  console.log("Environment variable sources check:", {
    'import.meta.env.VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing",
    'runtime config VITE_SUPABASE_ANON_KEY': (await fetchConfig()).VITE_SUPABASE_ANON_KEY ? "✅ Found" : "❌ Missing",
    'process.env.VITE_SUPABASE_ANON_KEY': (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY) ? "✅ Found" : "❌ Missing",
    'Final resolved Key': anonKey ? "✅ Found" : "❌ Missing"
  });

  if (!url || !anonKey) {
    console.error("❌ Missing Supabase environment variables.");
    console.table({
      VITE_SUPABASE_URL: url ?? "undefined",
      VITE_SUPABASE_ANON_KEY: anonKey ? "defined" : "undefined",
      env: import.meta.env.MODE,
      runtimeConfig: await fetchConfig(),
    });
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(url, anonKey);
};

// Export a promise that resolves to the Supabase client
export const supabasePromise = initializeSupabase();

// For backward compatibility, export a getter that returns the promise
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    return (...args: any[]) => {
      return supabasePromise.then(client => client[prop](...args));
    };
  }
});
