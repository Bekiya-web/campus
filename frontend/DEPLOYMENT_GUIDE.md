# Deployment Guide - Fixing 404 Error

## Problem
After deployment, you're getting a `404: NOT_FOUND` error with `DEPLOYMENT_NOT_FOUND` when trying to login or sign up.

## Root Cause
The deployed application doesn't have access to the Supabase environment variables, so it can't connect to your backend.

## Solution

### Step 1: Verify Local Setup Works

Test locally first to confirm everything works:

```bash
cd frontend
npm run dev
```

Visit http://localhost:8080 and try to login/signup. If this works, the issue is deployment configuration.

### Step 2: Configure Vercel Environment Variables

#### Method A: Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://iwymkieoscqjjiwrdyxe.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save**

#### Method B: Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add VITE_SUPABASE_URL production
# Paste: https://iwymkieoscqjjiwrdyxe.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM
```

### Step 3: Redeploy

After adding environment variables, you MUST redeploy:

#### Option A: Vercel Dashboard
1. Go to **Deployments** tab
2. Click the three dots (...) on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

#### Option B: Vercel CLI
```bash
vercel --prod
```

#### Option C: Git Push (if connected to GitHub)
```bash
git add .
git commit -m "Add environment variables configuration"
git push
```

### Step 4: Verify Deployment

1. Visit your deployed site
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try to login/signup
5. Check for any errors

If you still see errors, check:
- Network tab for failed requests
- Console for JavaScript errors
- Make sure you redeployed AFTER adding env variables

## Troubleshooting

### Issue: Still getting 404 after adding env variables
**Solution:** You must redeploy. Environment variables are only applied to new deployments.

### Issue: "Missing Supabase environment variables" error
**Solution:** 
1. Check variable names are EXACTLY: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Make sure they're set for Production environment
3. Redeploy

### Issue: Login works locally but not on deployment
**Solution:** Clear your browser cache and cookies for the deployed site, then try again.

### Issue: Different error message
**Solution:** Check browser console for the actual error and share it for specific help.

## Verification Checklist

- [ ] Environment variables added to Vercel
- [ ] Both variables set for Production environment
- [ ] Redeployed after adding variables
- [ ] Cleared browser cache
- [ ] Tested login/signup on deployed site
- [ ] Checked browser console for errors

## Need More Help?

If you're still having issues:
1. Share the exact error message from browser console
2. Share your Vercel deployment URL
3. Confirm you've completed all steps above
