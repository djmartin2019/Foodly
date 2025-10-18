# Foodly Setup Guide

This guide will walk you through setting up Foodly with Supabase authentication.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Navigate to **Project Settings** (gear icon in the sidebar)
4. Go to **API** section
5. Copy the following:
   - **Project URL** (e.g., `https://tbcodjhsyktoldyzflax.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Create Environment File

Create a `.env` file in the root of your project:

```bash
VITE_SUPABASE_URL=https://tbcodjhsyktoldyzflax.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_anon_key_here` with your actual anon key from Step 2.

**Important:** The `.env` file is already in `.gitignore` so it won't be committed to version control.

## Step 4: Set Up Database Schema

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the sidebar
3. Click **New Query**
4. Open the `supabase-setup.sql` file in this project
5. Copy and paste the entire contents into the SQL Editor
6. Click **Run** or press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

This will create:

- A `profiles` table to store user data
- Row-level security policies
- Automatic triggers for timestamp updates

## Step 5: Configure Email Settings (Optional)

By default, Supabase uses their email service for authentication emails. For production:

1. Go to **Authentication** > **Email Templates** in Supabase Dashboard
2. Customize your confirmation and password reset emails
3. (Optional) Set up a custom SMTP provider in **Project Settings** > **Auth**

## Step 6: Start Development Server

```bash
npm run dev
```

Your app will be running at `http://localhost:5173`

## Step 7: Test Authentication

1. Navigate to `http://localhost:5173`
2. Click "Join the Beta"
3. Fill out the signup form with:
   - First Name
   - Last Name
   - Email
   - Password (at least 6 characters)
   - Phone Number
4. Click "Create Account"
5. Check your email for a verification link (check spam folder)
6. Click the verification link
7. Return to the app and log in

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure you created the `.env` file in the root directory
- Restart your dev server after creating the `.env` file
- Verify that the variable names start with `VITE_`

### "relation 'profiles' does not exist"

- Run the SQL script from `supabase-setup.sql` in the Supabase SQL Editor
- Make sure you ran it against the correct database

### Email verification not working

- Check your spam folder
- In development, you can disable email confirmation:
  - Go to **Authentication** > **Providers** > **Email**
  - Toggle off "Enable email confirmations"
  - Save

### Can't sign in after email verification

- Make sure you're using the correct email and password
- Check the Supabase Dashboard > **Authentication** > **Users** to see if your user exists
- Try resetting your password

## Production Deployment

When deploying to production:

1. Add your environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Set up a custom domain in Supabase Dashboard > **Authentication** > **URL Configuration**
3. Configure email templates with your brand
4. Set up RLS policies for any additional tables
5. Enable email confirmations in production

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
