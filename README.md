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

# Preview production build
npm run preview
```

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
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
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
