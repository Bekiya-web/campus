# Quick Fix: "Failed to Hide Post" Error

## The Problem
You're getting "failed to hide post" because the database columns don't exist yet.

## The Solution (3 Steps)

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### Step 2: Copy & Paste This SQL
```sql
-- Add the missing columns
ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS "hideUntil" TIMESTAMPTZ;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_discussion_posts_hidden 
ON public.discussion_posts(hidden);
```

### Step 3: Click "Run" Button
- You should see: "Success. No rows returned"
- That's normal and means it worked!

## Test It
1. Refresh your app
2. Go to any discussion post as admin
3. Click the three-dot menu (⋮)
4. Click "Hide Post"
5. It should work now! ✅

## Still Not Working?

### Check if you're an admin:
Open browser console (F12) and type:
```javascript
JSON.parse(localStorage.getItem('sb-iwymkieoscqjjiwrdyxe-auth-token'))
```
Look for `role: 'admin'` in the user metadata.

### Check the exact error:
1. Open browser console (F12)
2. Try to hide a post
3. Look for red error messages
4. Share the error message for more help

## Alternative: Run Complete Migration
If the quick fix doesn't work, run the complete migration file:
`frontend/database/discussions/complete_migration.sql`

This includes:
- Creating the `is_admin()` function
- Adding the columns
- Verifying everything worked
