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
      console.log('✅ Config fetched successfully:', {
        supabaseUrl: configCache.VITE_SUPABASE_URL ? '✅' : '❌',
        supabaseKey: configCache.VITE_SUPABASE_ANON_KEY ? '✅' : '❌',
        mapboxToken: configCache.VITE_MAPBOX_TOKEN ? '✅' : '❌',
      });
      return configCache;
    } catch (error) {
      console.error('❌ Failed to fetch configuration:', error);
      // Return empty config to prevent crashes
      configCache = {};
      return configCache;
    }
  })();

  return configPromise;
};

// Get environment variables with secure fallback
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
  
  return null;
};

// Initialize Supabase client
const initializeSupabase = async () => {
  const url = await getEnvVar('VITE_SUPABASE_URL');
  const anonKey = await getEnvVar('VITE_SUPABASE_ANON_KEY');

  console.log("Supabase configuration:", {
    url: url ? "✅ Found" : "❌ Missing",
    anonKey: anonKey ? "✅ Found" : "❌ Missing",
    source: import.meta.env.VITE_SUPABASE_URL ? "build-time" : "runtime"
  });

  if (!url || !anonKey) {
    console.error("❌ Missing Supabase environment variables.");
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
    }).catch(error => {
      console.error('Failed to initialize Supabase:', error);
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
