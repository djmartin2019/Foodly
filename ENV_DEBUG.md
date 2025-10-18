# Environment Variables Debug Guide

## Issue: "Missing Supabase environment variables" on Cloudflare Pages

### Quick Fix Steps

1. **Check Cloudflare Pages Environment Variables**

   - Go to your Cloudflare Pages project dashboard
   - Navigate to **Settings** > **Environment variables**
   - Verify these variables exist for **BOTH** Production and Preview:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_MAPBOX_TOKEN`

2. **Redeploy After Adding Variables**

   - After adding/updating environment variables, trigger a new deployment
   - Go to **Deployments** tab
   - Click **Retry deployment** or push a new commit

3. **Check Variable Names**
   - Ensure variable names start with `VITE_`
   - No typos in variable names
   - Values don't have extra spaces or quotes

### Common Issues

**Variables not showing up:**

- Make sure they're added to the correct environment (Production/Preview)
- Redeploy after adding variables
- Check that variable names start with `VITE_`

**Wrong environment:**

- Preview deployments use Preview environment variables
- Production deployments use Production environment variables
- Make sure both environments have the same variables

**Build vs Runtime:**

- Vite environment variables are available at build time
- They get baked into the JavaScript bundle
- Changes require a new build/deployment

### Debug Steps

1. **Check Browser Console**

   - Open your deployed site
   - Open browser DevTools (F12)
   - Look for the detailed error message with environment info

2. **Verify Variable Values**

   - In Cloudflare Pages, click the eye icon to view variable values
   - Ensure URLs don't have trailing slashes
   - Ensure keys are complete (not truncated)

3. **Test Locally First**
   - Create `.env` file locally with same values
   - Run `npm run dev` and verify it works
   - Then deploy to Cloudflare

### Expected Values

**VITE_SUPABASE_URL:**

```
https://tbcodjhsyktoldyzflax.supabase.co
```

**VITE_SUPABASE_ANON_KEY:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long JWT token)
```

**VITE_MAPBOX_TOKEN:**

```
pk.eyJ1IjoiZGptYXJ0aW4iLCJhIjoiY2... (starts with pk.)
```

### Force Redeploy

If variables are correct but still not working:

1. **Trigger New Deployment:**

   ```bash
   # Make a small change and push
   git commit --allow-empty -m "Force redeploy for env vars"
   git push origin main
   ```

2. **Or use Cloudflare Dashboard:**
   - Go to **Deployments**
   - Click **Retry deployment** on latest deployment

### Still Not Working?

1. **Check Build Logs:**

   - Go to Cloudflare Pages > **Deployments**
   - Click on latest deployment
   - Check build logs for any errors

2. **Verify Project Settings:**

   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: (empty)

3. **Test with Console Logs:**
   - The updated supabase.js now logs environment info
   - Check browser console for detailed debugging info

### Production Checklist

- [ ] Variables added to Production environment
- [ ] Variables added to Preview environment
- [ ] Variable names start with `VITE_`
- [ ] Values are complete (no truncation)
- [ ] Redeployed after adding variables
- [ ] Build completed successfully
- [ ] No console errors on deployed site
