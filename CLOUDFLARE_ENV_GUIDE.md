# Cloudflare Pages Environment Variables - The Right Way

## The Problem
Cloudflare Pages handles environment variables differently than other platforms. Even with `loadEnv()` and explicit `define`, variables often don't make it to the build process.

## The Solution: Multiple Fallback Strategy

Cloudflare Pages can pass environment variables in several ways:

1. **Direct access**: `process.env.SUPABASE_URL`
2. **With VITE_ prefix**: `process.env.VITE_SUPABASE_URL`
3. **Uppercase**: `process.env.SUPABASE_URL`
4. **VITE_ + uppercase**: `process.env.VITE_SUPABASE_URL`

## How to Configure in Cloudflare Pages

### Option 1: Without VITE_ prefix (Recommended)
In Cloudflare Pages Dashboard, set:
- `SUPABASE_URL` = `https://tbcodjhsyktoldyzflax.supabase.co`
- `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- `MAPBOX_TOKEN` = `pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNj...`

### Option 2: With VITE_ prefix
In Cloudflare Pages Dashboard, set:
- `VITE_SUPABASE_URL` = `https://tbcodjhsyktoldyzflax.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- `VITE_MAPBOX_TOKEN` = `pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNj...`

## Why This Works

The updated `vite.config.ts` tries all possible variations:
```typescript
const getEnvVar = (key: string) => {
  const variations = [
    process.env[key],                    // Direct access
    process.env[`VITE_${key}`],          // With VITE_ prefix
    process.env[key.toUpperCase()],      // Uppercase
    process.env[`VITE_${key.toUpperCase()}`], // VITE_ + uppercase
  ];
  
  return variations.find(v => v);
};
```

## Testing

After deployment, check the build logs for:
```
Building with environment: production
Process.env keys: [SUPABASE_URL, SUPABASE_ANON_KEY, MAPBOX_TOKEN]
SUPABASE_URL: ✅ Found (https://tbcodjhsyktoldyzflax.supabase.co...)
SUPABASE_ANON_KEY: ✅ Found (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
MAPBOX_TOKEN: ✅ Found (pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNj...)
Final resolved values:
Supabase URL: ✅ Present
Supabase Anon Key: ✅ Present
Mapbox Token: ✅ Present
```

## If Still Not Working

If you still get `undefined` values, try this alternative approach:

### Runtime Configuration
Instead of build-time variables, fetch config at runtime:

1. **Create `public/config.js`:**
```javascript
window.APP_CONFIG = {
  VITE_SUPABASE_URL: "https://tbcodjhsyktoldyzflax.supabase.co",
  VITE_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  VITE_MAPBOX_TOKEN: "pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNj...",
};
```

2. **Update `index.html`:**
```html
<script src="/config.js"></script>
```

3. **Update `supabaseClient.ts`:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.APP_CONFIG?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || window.APP_CONFIG?.VITE_SUPABASE_ANON_KEY;
```

## Common Cloudflare Pages Issues

1. **Case sensitivity**: Try both `SUPABASE_URL` and `supabase_url`
2. **Special characters**: Ensure no extra spaces or quotes
3. **Build system version**: Use Build System Version 3
4. **Node.js version**: Use Node.js 18 or higher

## Final Note

Cloudflare Pages environment variable handling is notoriously inconsistent. The multiple fallback approach should work, but if not, the runtime configuration method is 100% reliable.
