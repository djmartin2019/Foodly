# Foodly — Find food that feels local

A modern, dark-mode web app for discovering local food spots through community-driven taste data.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Supabase** - Backend and authentication
- **Lucide React** - Icon library

## Design System

### Colors

- **Primary Background**: `#0B0F0E` (brand-dark)
- **Primary Accent**: `#24C38C` (brand-green)
- **Secondary Accent**: `#2EE59D` (brand-mint)

### Typography

- **Font**: Inter (sans-serif)
- **Style**: Modern, clean, high contrast

### Components

- Glassmorphism effects with `bg-zinc-900/80` and `backdrop-blur-md`
- Glow effects on CTAs and interactive elements
- Smooth animations and hover states
- Mobile-first responsive design

## Cloudflare Pages Deployment Fix

### Environment Variables Issue Resolution

If you're experiencing "Missing Supabase environment variables" errors on Cloudflare Pages:

1. **Ensure Build System Version = 3**
   - Go to Cloudflare Pages > Settings > Builds & deployments
   - Set Build system version to 3

2. **Variables defined under "Production" and "Preview"**
   - Go to Settings > Environment variables
   - Add these variables to BOTH environments:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_MAPBOX_TOKEN`

3. **Redeploy with "Clear Build Cache" checked**
   - Go to Deployments tab
   - Click "Retry deployment"
   - Check "Clear build cache" option
   - Wait for deployment to complete

4. **Verify in console:**
   ```javascript
   console.log(import.meta.env)
   ```
   Should show all `VITE_` variables present.

5. **If you still see `Missing`, confirm `vite.config.ts` includes loadEnv()**
   - The updated config explicitly loads and defines environment variables
   - Check build logs for "✅ Present" messages during build

### Build Log Verification

During deployment, you should see in build logs:
```
Building with environment: production
Supabase URL (sanity check): ✅ Present
Supabase Anon Key (sanity check): ✅ Present
Mapbox Token (sanity check): ✅ Present
```

If any show "❌ Missing", the environment variables aren't properly configured in Cloudflare Pages.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

### Installation

1. **Clone and install dependencies:**

```bash
# Install dependencies
npm install
```

2. **Set up Supabase:**

   a. Go to your [Supabase Dashboard](https://app.supabase.com)

   b. Navigate to Project Settings > API

   c. Copy your `Project URL` and `anon/public` key

   d. Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://tbcodjhsyktoldyzflax.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Set up the database schema:**

   a. Go to Supabase Dashboard > SQL Editor

   b. Copy and paste the contents of `supabase-setup.sql`

   c. Run the SQL to create the `profiles` table and policies

4. **Start the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Deploying to Cloudflare Pages

Foodly is optimized for deployment on Cloudflare Pages with automatic GitHub integration.

#### Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Your project pushed to a GitHub repository
- Supabase project set up with the database schema

#### Step 1: Connect GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. Authorize Cloudflare to access your GitHub account
4. Select your `foodly` repository

#### Step 2: Configure Build Settings

Set the following build configuration:

- **Production branch:** `main`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave empty if project is in repo root)

#### Step 3: Set Environment Variables

In the Cloudflare Pages project settings, add these environment variables:

| Variable                 | Value                         | Where to get it                                  |
| ------------------------ | ----------------------------- | ------------------------------------------------ |
| `VITE_SUPABASE_URL`      | Your Supabase project URL     | Supabase Dashboard > Project Settings > API      |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Supabase Dashboard > Project Settings > API      |
| `VITE_MAPTILER_KEY`      | (Optional) MapTiler API key   | [MapTiler Dashboard](https://cloud.maptiler.com) |

**Important:** Add these for both **Production** and **Preview** environments.

#### Step 4: Configure Supabase Redirect URLs

Update your Supabase authentication settings:

1. Go to Supabase Dashboard > **Authentication** > **URL Configuration**
2. Add your Cloudflare Pages URL to **Redirect URLs**:
   ```
   https://foodly.pages.dev/auth/callback
   https://your-custom-domain.com/auth/callback
   ```
3. Update **Site URL** to your production domain

#### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy your site automatically
3. Every push to `main` will trigger a new production deployment
4. Every push to other branches creates a unique preview deployment

#### Preview Deployments

Cloudflare Pages automatically creates preview deployments for every branch:

- **URL format:** `https://<branch-name>.foodly.pages.dev`
- **Use case:** Test features before merging to production
- **Environment:** Uses preview environment variables
- **Auto-cleanup:** Preview URLs are available as long as the branch exists

#### Custom Domain (Optional)

1. Go to your Cloudflare Pages project > **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `foodly.com`)
4. Follow the DNS configuration instructions
5. SSL certificates are automatically provisioned

#### Local Build Verification

Before deploying, verify your build works locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

#### Troubleshooting

**Build fails with "command not found":**

- Ensure Node.js version is 18 or higher
- Check that all dependencies are in `package.json`

**Environment variables not working:**

- Verify variable names start with `VITE_`
- Check they're set in both Production and Preview environments
- Redeploy after adding/changing environment variables

**Routes return 404:**

- The `_redirects` file ensures SPA routing works
- Verify it exists in your repository root

**Authentication redirect issues:**

- Update Supabase redirect URLs to include your Cloudflare Pages domain
- Check that callback URL matches: `/auth/callback`

#### Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase URL Configuration](https://supabase.com/docs/guides/auth/redirect-urls)

## Project Structure

```
foodly/
├── src/
│   ├── components/      # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.jsx
│   ├── lib/            # Utilities and configs
│   │   └── supabase.js
│   ├── pages/          # Page components
│   │   ├── Landing.jsx
│   │   ├── Auth.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles + Tailwind
├── supabase-setup.sql  # Database schema
├── wrangler.toml       # Cloudflare configuration
├── _redirects          # SPA routing for Cloudflare Pages
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.ts      # Vite configuration (optimized for CF Pages)
└── package.json        # Dependencies
```

## Features

### Landing Page

- ✨ Fullscreen hero with animated background
- 🎯 Three-column "How It Works" section
- 👥 Community feed mockup
- 🔒 Privacy-first messaging
- 📱 Fully responsive mobile-first design
- 🌊 Smooth scroll and fade-in animations
- 🎨 Custom brand colors and glow effects

### Authentication

- 🔐 Email/password signup and login
- 👤 User profile creation with:
  - First name
  - Last name
  - Email
  - Password
  - Phone number
- 🛡️ Protected routes
- ✉️ Email verification
- 🚪 Secure sign out

### Database

- PostgreSQL via Supabase
- Row-level security policies
- User profile storage
- Automatic timestamp updates

## Authentication Flow

1. User signs up with email, password, and profile information
2. Supabase creates an auth user
3. Profile data is stored in the `profiles` table
4. Email verification is sent
5. User can sign in and access protected routes
6. User profile data is displayed in the dashboard

## Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** Never commit your `.env` file to version control!

## Database Schema

### profiles table

- `id` (UUID, Primary Key) - References auth.users
- `email` (TEXT, NOT NULL, UNIQUE)
- `first_name` (TEXT, NOT NULL)
- `last_name` (TEXT, NOT NULL)
- `phone` (TEXT, NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Routes

- `/` - Landing page
- `/signup` - Sign up page
- `/login` - Login page (same as signup, different tab)
- `/app` - Protected dashboard (requires authentication)

## Brand Identity

**Tone**: Playful, clever, slightly mysterious (like "Supabase meets Foursquare")

**Tagline**: "Find food that feels local."

**Secondary**: "A map for taste, powered by you."

## License

© Foodly 2025. All rights reserved.
