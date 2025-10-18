# Foodly Deployment Guide

## Pre-Deployment Checklist

Before deploying to Cloudflare Pages, ensure you have:

- [ ] Supabase project set up with database schema (`supabase-setup.sql` executed)
- [ ] GitHub repository created and code pushed
- [ ] Cloudflare account created
- [ ] Environment variables documented (but NOT committed)
- [ ] Local build tested successfully (`npm run build` && `npm run preview`)

## Environment Variables Reference

Create a `.env` file locally (already in `.gitignore`):

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# MapTiler (optional, for future map features)
VITE_MAPTILER_KEY=your_maptiler_key_here

# Environment identifier
VITE_APP_ENV=production
```

**⚠️ NEVER commit your `.env` file to version control!**

## Cloudflare Pages Setup

### 1. Create New Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** > **Pages**
4. Click **Connect to Git**

### 2. Connect GitHub Repository

1. Authorize Cloudflare to access your GitHub account
2. Select your organization/account
3. Choose the `foodly` repository
4. Click **Begin setup**

### 3. Configure Build Settings

**Framework preset:** Vite

| Setting                | Value           |
| ---------------------- | --------------- |
| Production branch      | `main`          |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Root directory         | (leave empty)   |
| Environment variables  | (see below)     |

### 4. Add Environment Variables

Click **Add environment variable** and add each of the following:

**For Production environment:**

- `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `your_anon_key`
- `VITE_APP_ENV` = `production`

**For Preview environment:**

- Same as production (or use different Supabase project for staging)

### 5. Deploy

1. Click **Save and Deploy**
2. Wait for the build to complete (~2-3 minutes)
3. Your site will be live at `https://foodly.pages.dev`

## Post-Deployment Configuration

### Update Supabase Authentication URLs

After your first deployment:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** > **URL Configuration**
4. Update the following:

**Site URL:**

```
https://foodly.pages.dev
```

**Redirect URLs** (add both):

```
https://foodly.pages.dev/auth/callback
http://localhost:5173/auth/callback
```

5. Click **Save**

### Test Authentication Flow

1. Visit your deployed site: `https://foodly.pages.dev`
2. Click "Join the Beta"
3. Sign up with a test account
4. Check email for verification
5. Click verification link
6. Verify redirect to `/auth/callback` works
7. Log in successfully

## Custom Domain Setup (Optional)

### Add Custom Domain

1. In Cloudflare Pages project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `foodly.com` or `app.foodly.com`)
4. Follow DNS configuration steps:
   - **Option A:** If domain is on Cloudflare, click **Activate domain**
   - **Option B:** If domain is elsewhere, add CNAME record:
     ```
     CNAME  @  foodly.pages.dev
     ```

### Update Supabase for Custom Domain

After custom domain is active:

1. Update Supabase **Site URL** to your custom domain
2. Add custom domain to **Redirect URLs**:
   ```
   https://yourdomain.com/auth/callback
   ```

## Continuous Deployment

### Automatic Deployments

Cloudflare Pages automatically deploys:

- **Production:** Every push to `main` branch
- **Preview:** Every push to feature branches

### Branch Preview URLs

Feature branches get unique URLs:

```
https://<branch-name>.foodly.pages.dev
```

Example:

- Branch: `feature/map-integration`
- Preview URL: `https://feature-map-integration.foodly.pages.dev`

### Deployment Notifications

Set up build notifications:

1. Go to Pages project > **Settings** > **Builds & deployments**
2. Click **Add notification**
3. Choose notification method (Email, Webhook, etc.)
4. Configure notification triggers

## Monitoring & Analytics

### View Build Logs

1. Go to your Pages project
2. Click on any deployment
3. View build logs and deployment status

### Analytics

1. In Pages project, click **Analytics**
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Geographic distribution

### Error Tracking (Optional)

Consider integrating:

- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay
- [PostHog](https://posthog.com) for product analytics

## Rollback Procedure

If a deployment breaks production:

1. Go to Pages project > **Deployments**
2. Find the last working deployment
3. Click the **⋯** menu
4. Select **Rollback to this deployment**
5. Confirm rollback

## Performance Optimization

### Already Implemented

✅ Code splitting (vendor and Supabase chunks)
✅ Asset optimization via Vite
✅ Cloudflare's global CDN
✅ HTTP/2 and HTTP/3
✅ Brotli compression

### Future Optimizations

- [ ] Add lazy loading for routes
- [ ] Implement image optimization (Sharp/ImageKit)
- [ ] Set up service worker for offline support
- [ ] Enable caching headers for static assets
- [ ] Add preload hints for critical resources

## Troubleshooting

### Build Fails

**Error: "command not found: npm"**

- Node.js version issue
- Solution: Set `NODE_VERSION` environment variable to `18`

**Error: "Module not found"**

- Missing dependency in `package.json`
- Solution: Run `npm install --save <package-name>` locally and commit

### Runtime Errors

**Blank page / white screen**

- Check browser console for errors
- Verify environment variables are set in Cloudflare
- Check that `_redirects` file is in repository root

**Authentication not working**

- Verify Supabase redirect URLs include your Cloudflare domain
- Check that callback route `/auth/callback` exists
- Ensure environment variables are correct

### Performance Issues

**Slow initial load**

- Check bundle size: `npm run build` shows gzip sizes
- Consider code splitting if bundles > 200kb
- Enable Cloudflare's "Auto Minify" feature

## Security Checklist

- [ ] Environment variables set in Cloudflare (not in code)
- [ ] `.env` file in `.gitignore`
- [ ] Supabase Row Level Security (RLS) enabled
- [ ] HTTPS enforced (automatic with Cloudflare)
- [ ] Authentication tokens stored securely
- [ ] API keys never exposed in client code
- [ ] CSP headers configured (if needed)

## Maintenance

### Regular Tasks

- Monitor build success rate
- Review error logs weekly
- Update dependencies monthly: `npm update`
- Check Cloudflare status page for incidents
- Review Supabase usage/quotas

### Before Major Updates

1. Test locally: `npm run build && npm run preview`
2. Deploy to preview branch first
3. Test authentication flow
4. Check all routes work
5. Verify environment variables
6. Merge to main only after validation

## Support Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Docs](https://supabase.com/docs)

## Need Help?

- Check build logs in Cloudflare Dashboard
- Review Supabase logs for database issues
- Search [Cloudflare Community](https://community.cloudflare.com)
- Check `#cloudflare-pages` tag on Stack Overflow
