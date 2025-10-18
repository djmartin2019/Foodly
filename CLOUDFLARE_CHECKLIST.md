# Cloudflare Pages Deployment Checklist

Use this checklist to ensure a smooth deployment to Cloudflare Pages.

## Pre-Deployment (Local)

- [ ] All code changes committed to Git
- [ ] Dependencies up to date: `npm install`
- [ ] Local build successful: `npm run build`
- [ ] Preview works: `npm run preview` → visit http://localhost:4173
- [ ] Environment variables documented in `ENV_EXAMPLE.txt`
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] Code pushed to GitHub repository

## Cloudflare Setup

- [ ] Cloudflare account created
- [ ] Navigate to **Workers & Pages** > **Create application** > **Pages**
- [ ] Connect to Git and authorize GitHub access
- [ ] Select `foodly` repository
- [ ] Configure build settings:
  - Production branch: `main`
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - (Optional) `VITE_MAPTILER_KEY`
- [ ] Click **Save and Deploy**

## Post-Deployment

- [ ] Deployment successful (check build logs)
- [ ] Site accessible at `https://foodly.pages.dev`
- [ ] Update Supabase **Site URL** to `https://foodly.pages.dev`
- [ ] Add Cloudflare URL to Supabase **Redirect URLs**:
  - `https://foodly.pages.dev/auth/callback`
- [ ] Test authentication flow:
  - [ ] Sign up works
  - [ ] Email verification works
  - [ ] Login works
  - [ ] Protected routes work
  - [ ] Sign out works

## Custom Domain (Optional)

- [ ] Domain added in Cloudflare Pages > **Custom domains**
- [ ] DNS configured (CNAME or Cloudflare proxy)
- [ ] SSL certificate provisioned (automatic)
- [ ] Update Supabase URLs to use custom domain
- [ ] Test custom domain authentication

## Monitoring

- [ ] Set up build notifications (optional)
- [ ] Bookmark deployment URL: `https://dash.cloudflare.com`
- [ ] Monitor first few deployments for issues

## Branch Strategy

✅ **Production:** Push to `main` → deploys to production
✅ **Preview:** Push to any branch → unique preview URL
✅ **Example:** `feature/maps` → `https://feature-maps.foodly.pages.dev`

## Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Push to deploy
git push origin main
```

## Success Criteria

✅ Build completes without errors
✅ All routes work (/, /signup, /login, /app)
✅ Authentication flow works end-to-end
✅ No console errors in browser
✅ Supabase connection working
✅ Environment variables loaded correctly

## If Something Goes Wrong

1. Check build logs in Cloudflare Dashboard
2. Verify environment variables are set correctly
3. Test locally with `npm run build && npm run preview`
4. Check Supabase redirect URLs include your domain
5. Review `DEPLOYMENT.md` for detailed troubleshooting

## Support

- See `DEPLOYMENT.md` for comprehensive guide
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
