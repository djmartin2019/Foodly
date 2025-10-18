# Cloudflare Pages Environment Variables - Alternative Approach

## The Issue
Even with `loadEnv()` and explicit `define`, Cloudflare Pages isn't passing environment variables to the build process. The variables show as `undefined` in production.

## Alternative Solutions

### Option 1: Use Cloudflare Pages Functions (Recommended)

Instead of relying on build-time environment variables, use Cloudflare Pages Functions to serve the configuration:

1. **Create `functions/api/config.js`:**
```javascript
export async function onRequest() {
  return new Response(JSON.stringify({
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
    VITE_MAPBOX_TOKEN: process.env.VITE_MAPBOX_TOKEN,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
```

2. **Update your app to fetch config at runtime:**
```javascript
// In your app initialization
const config = await fetch('/api/config').then(r => r.json());
```

### Option 2: Hardcode Values (Quick Fix)

If the above doesn't work, temporarily hardcode the values in your code:

```javascript
// In supabaseClient.ts
const url = import.meta.env.VITE_SUPABASE_URL || "https://tbcodjhsyktoldyzflax.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

### Option 3: Use Cloudflare Workers Environment Variables

Configure environment variables in Cloudflare Workers instead of Pages:

1. Go to Cloudflare Dashboard > Workers & Pages
2. Select your project
3. Go to Settings > Variables
4. Add environment variables there

### Option 4: Check Cloudflare Pages Build Settings

Verify these settings in Cloudflare Pages:

1. **Build System Version:** Should be 3
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Root Directory:** (empty)
5. **Node.js Version:** 18 or higher

### Option 5: Use Different Variable Names

Sometimes Cloudflare Pages has issues with `VITE_` prefix. Try:

1. **Remove `VITE_` prefix:**
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `MAPBOX_TOKEN`

2. **Update vite.config.ts:**
```javascript
define: {
  "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
  "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(process.env.SUPABASE_ANON_KEY),
  "import.meta.env.VITE_MAPBOX_TOKEN": JSON.stringify(process.env.MAPBOX_TOKEN),
}
```

## Debugging Steps

### 1. Check Build Logs
Look for these messages in Cloudflare Pages build logs:
```
Building with environment: production
All available env vars: [...]
Supabase URL (sanity check): ✅ Present or ❌ Missing
```

### 2. Add Runtime Debugging
Add this to your app to see what's available:
```javascript
console.log('Runtime env check:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  allEnvVars: Object.keys(import.meta.env),
});
```

### 3. Test with Different Approaches
Try each option above to see which works with your Cloudflare Pages setup.

## Most Likely Solution

The issue is probably that Cloudflare Pages isn't passing environment variables to the build process correctly. Try **Option 5** (removing `VITE_` prefix) first, as this is a common issue with Cloudflare Pages.

If that doesn't work, **Option 1** (Pages Functions) is the most robust solution for production apps.

