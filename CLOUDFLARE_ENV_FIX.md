# Cloudflare Pages Environment Variables Fix

## The Problem

You're getting "Missing Supabase environment variables" error on Cloudflare Pages even though you have the variables defined in the dashboard.

## Root Cause

Cloudflare Pages environment variables need to be properly configured for **both** Production and Preview environments, and the deployment needs to be triggered after adding them.

## Step-by-Step Fix

### 1. Verify Cloudflare Pages Variables

Go to your Cloudflare Pages project dashboard:

1. **Navigate to Settings > Environment variables**
2. **Check BOTH environments:**

   - **Production** environment
   - **Preview** environment

3. **Verify these exact variable names:**

   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_MAPBOX_TOKEN
   ```

4. **Check variable values:**
   - `VITE_SUPABASE_URL`: `https://tbcodjhsyktoldyzflax.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT)
   - `VITE_MAPBOX_TOKEN`: `pk.eyJ1IjoiZGptYXJ0aW4yMDE5IiwiYSI6ImNtZ3doNjdheDA4YWcya29jdWluamJiOHIifQ...`

### 2. Force Redeploy

**Critical:** Environment variables only take effect on new deployments.

**Option A: Trigger via Git**

```bash
git add .
git commit --allow-empty -m "Force redeploy for environment variables"
git push origin main
```

**Option B: Manual Redeploy**

1. Go to Cloudflare Pages > **Deployments**
2. Click **Retry deployment** on the latest deployment
3. Wait for build to complete

### 3. Debug with Enhanced Logging

The updated `supabase.js` now includes detailed logging. After redeploying:

1. **Open your deployed site**
2. **Open browser DevTools (F12)**
3. **Check Console tab**
4. **Look for these logs:**
   ```
   Environment check: {
     supabaseUrl: "✅ Found" or "❌ Missing",
     supabaseAnonKey: "✅ Found" or "❌ Missing",
     env: "production"
   }
   ```

### 4. Common Issues & Solutions

**Issue: Variables show in dashboard but not working**

- **Solution:** Redeploy after adding variables
- **Why:** Vite bakes env vars into the build at build time

**Issue: Works locally but not on Cloudflare**

- **Solution:** Check variable names start with `VITE_`
- **Why:** Only `VITE_` prefixed vars are available in client code

**Issue: Preview works but Production doesn't**

- **Solution:** Add variables to Production environment
- **Why:** Preview and Production use separate env var sets

**Issue: Variables truncated or incomplete**

- **Solution:** Copy-paste full values, no extra spaces
- **Why:** Partial values cause authentication failures

### 5. Verification Checklist

After redeploying, verify:

- [ ] Variables added to **Production** environment
- [ ] Variables added to **Preview** environment
- [ ] Variable names start with `VITE_`
- [ ] Values are complete (not truncated)
- [ ] New deployment triggered after adding variables
- [ ] Build completed successfully
- [ ] Console shows "✅ Found" for both variables
- [ ] Site loads without Supabase errors

### 6. Expected Console Output

**Success (what you should see):**

```
Environment check: {
  supabaseUrl: "✅ Found",
  supabaseAnonKey: "✅ Found",
  env: "production"
}
```

**Failure (what you're seeing now):**

```
Environment check: {
  supabaseUrl: "❌ Missing",
  supabaseAnonKey: "❌ Missing",
  env: "production"
}
Missing Supabase environment variables: {
  VITE_SUPABASE_URL: undefined,
  VITE_SUPABASE_ANON_KEY: undefined,
  allEnvVars: ["MODE", "DEV", "PROD", ...]
}
```

### 7. Still Not Working?

If variables are correct but still failing:

1. **Check Build Logs:**

   - Go to Cloudflare Pages > Deployments
   - Click on latest deployment
   - Look for any build errors

2. **Verify Project Settings:**

   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: (empty)

3. **Test Environment Detection:**
   - The enhanced error message will show all available environment variables
   - Check if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in the list

### 8. Quick Test

To test if environment variables are working:

1. **Deploy the updated code** (with enhanced logging)
2. **Open your site**
3. **Check browser console**
4. **Look for the "Environment check" log**

If you see "✅ Found" for both variables, the issue is resolved!

## Why This Happens

1. **Build-time vs Runtime:** Vite environment variables are baked into the JavaScript bundle at build time
2. **Environment Separation:** Cloudflare Pages treats Production and Preview as separate environments
3. **Deployment Required:** Changes to environment variables require a new deployment to take effect
4. **Client-side Only:** Only `VITE_` prefixed variables are available in the browser

## Success Indicators

✅ Console shows "Environment check: { supabaseUrl: "✅ Found", supabaseAnonKey: "✅ Found" }"
✅ No "Missing Supabase environment variables" error
✅ Site loads completely
✅ Authentication works (signup/login)
✅ Map loads with markers

---

**Next Step:** Redeploy your site and check the browser console for the detailed environment logging!
