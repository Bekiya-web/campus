# Database Migration Instructions for Admin Discussion Controls

## Problem
The "failed to hide post" error occurs because the database is missing the required columns.

## Solution
Run the following SQL commands in your Supabase SQL Editor:

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Copy and Run This SQL

```sql
-- Add hidden and hideUntil columns to discussion_posts table
ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS "hideUntil" TIMESTAMPTZ;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_discussion_posts_hidden 
ON public.discussion_posts(hidden);

-- Add comments for documentation
COMMENT ON COLUMN public.discussion_posts.hidden 
IS 'Admin can hide posts from regular users';

COMMENT ON COLUMN public.discussion_posts."hideUntil" 
IS 'Optional timestamp when post should become visible again. NULL means hidden indefinitely';
```

### Step 3: Verify Migration
Run this query to verify the columns were added:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'discussion_posts'
AND column_name IN ('hidden', 'hideUntil');
```

You should see:
- `hidden` | boolean | NO | false
- `hideUntil` | timestamp with time zone | YES | NULL

### Step 4: Test the Feature
1. Go to any discussion post as an admin
2. Click the three-dot menu (⋮)
3. Click "Hide Post"
4. Enter duration (optional) and confirm
5. Post should now be hidden!

## Troubleshooting

### If you still get errors:
1. Check browser console (F12) for exact error message
2. Verify you're logged in as admin (`profile.role === 'admin'`)
3. Check Supabase logs for database errors
4. Ensure RLS policies allow admins to update posts

### Common Issues:
- **"column does not exist"**: Migration not run yet
- **"permission denied"**: RLS policy issue - admins should have update permission
- **"Failed to hide post"**: Check browser console for specific error
