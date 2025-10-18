# Cloudflare Pages Environment Variables Setup

## The Issue
Cloudflare Pages isn't passing environment variables to the build process, even though they're configured in the dashboard.

## Solution: Use Cloudflare Pages Functions Only

Since the build-time environment variables aren't working, we'll rely entirely on the Cloudflare Pages Function for runtime configuration.

## What You Need to Do

### 1. Set Environment Variables in Cloudflare Pages Dashboard
Go to your Cloudflare Pages project → Settings → Environment Variables and add:

**Production Environment:**
- `VITE_SUPABASE_URL` = `https://tbcodjhsyktoldyzflax.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY29kamhzeWt0b2xkeXpmbGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjcyMjcsImV4cCI6MjA3NjMwMzIyN30.rD6ICOoQSmUCpAdUp8QnXnHMO3jwyiEXThoXM2bdDgY`
- `VITE_MAPBOX_TOKEN` = `pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNjRheDA4YWcya29jdWluamJiOHlifQ.6GnpfyZAEN4PL5zBXOsP_A`

### 2. How It Works Now
- **Build Process**: Doesn't need environment variables (they're not being passed anyway)
- **Runtime**: App fetches configuration from `/api/config` Cloudflare Pages Function
- **Security**: API keys are served securely from server-side environment

### 3. Expected Behavior
After deployment:
1. App loads without environment variables
2. App fetches config from `/api/config` endpoint
3. Supabase and Mapbox initialize with the fetched configuration
4. Everything works securely

## Debugging
If it still doesn't work:
1. Check that the environment variables are set in Cloudflare Pages Dashboard
2. Visit `https://your-site.pages.dev/api/config` directly to see if it returns the config
3. Check browser console for any fetch errors

This approach is more reliable because it doesn't depend on Cloudflare Pages' build-time environment variable system.
