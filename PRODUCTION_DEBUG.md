# Production Issues Debugging

## Current Issues

### 1. Mapbox Token Invalid (401 Unauthorized)
**Error**: `you may have provided an invalid Mapbox access token`
**Cause**: The Mapbox token in `public/config.js` appears to be truncated or invalid

**Solution**: 
- Get a fresh Mapbox token from https://account.mapbox.com/access-tokens/
- Make sure it starts with `pk.` and is the full token
- Replace the token in `public/config.js`

### 2. Supabase Authentication Failing (401 Unauthorized)
**Error**: `POST https://tbcodjhsyktoldyzflax.supabase.co/auth/v1/token?grant_type=password 401`
**Cause**: This could be due to:
- Invalid credentials being passed
- Supabase project settings
- RLS policies blocking the request

**Solution**:
- Check Supabase project settings
- Verify RLS policies are correct
- Test with a simple signup/login

## Quick Fixes

### Fix 1: Update Mapbox Token
1. Go to https://account.mapbox.com/access-tokens/
2. Copy your default public token
3. Update `public/config.js` with the full token

### Fix 2: Test Supabase Connection
1. Check if the Supabase project is active
2. Verify the anon key is correct
3. Test authentication locally first

## Debugging Steps

1. **Check Console Logs**: Look for the environment variable resolution logs
2. **Verify Tokens**: Ensure both tokens are complete and valid
3. **Test Locally**: Make sure everything works locally with the same tokens
4. **Check Supabase Dashboard**: Verify project status and settings

## Alternative: Use Environment Variables Properly

If the runtime config approach isn't working, we can try:

1. **Remove VITE_ prefix** from Cloudflare Pages environment variables
2. **Use Cloudflare Pages Functions** to serve config
3. **Hardcode values temporarily** for testing
