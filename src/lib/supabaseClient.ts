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

  const client = createClient(url, anonKey);
  console.log("✅ Supabase initialized successfully");
  return client;
};

// Create a synchronous-looking interface that handles async initialization
class AsyncSupabaseClient {
  private clientPromise: Promise<any>;
  private initializedClient: any = null;

  constructor() {
    this.clientPromise = initializeSupabase();
    this.clientPromise.then(client => {
      this.initializedClient = client;
    });
  }

  get auth() {
    return new Proxy({}, {
      get: (target, prop) => {
        return (...args: any[]) => {
          if (this.initializedClient) {
            return this.initializedClient.auth[prop](...args);
          }
          return this.clientPromise.then(client => client.auth[prop](...args));
        };
      }
    });
  }

  get from() {
    return (table: string) => {
      if (this.initializedClient) {
        return this.initializedClient.from(table);
      }
      return this.clientPromise.then(client => client.from(table));
    };
  }

  // Add other Supabase methods as needed
  get storage() {
    return new Proxy({}, {
      get: (target, prop) => {
        return (...args: any[]) => {
          if (this.initializedClient) {
            return this.initializedClient.storage[prop](...args);
          }
          return this.clientPromise.then(client => client.storage[prop](...args));
        };
      }
    });
  }
}

// Export the async client
export const supabase = new AsyncSupabaseClient();
export const supabasePromise = initializeSupabase();
