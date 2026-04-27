-- ============================================================================
-- COMPLETE MIGRATION FOR ADMIN DISCUSSION CONTROLS
-- Run this entire script in Supabase SQL Editor
-- ============================================================================

-- Step 1: Ensure is_admin() function exists
-- This function is used by RLS policies to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE uid = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Add hidden and hideUntil columns to discussion_posts
ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.discussion_posts 
ADD COLUMN IF NOT EXISTS "hideUntil" TIMESTAMPTZ;

-- Step 3: Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_discussion_posts_hidden 
ON public.discussion_posts(hidden);

-- Step 4: Add comments for documentation
COMMENT ON COLUMN public.discussion_posts.hidden 
IS 'Admin can hide posts from regular users. Default: false';

COMMENT ON COLUMN public.discussion_posts."hideUntil" 
IS 'Optional timestamp when post should become visible again. NULL means hidden indefinitely';

-- Step 5: Verify the migration
DO $$
DECLARE
  hidden_exists BOOLEAN;
  hideUntil_exists BOOLEAN;
BEGIN
  -- Check if columns exist
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'discussion_posts' AND column_name = 'hidden'
  ) INTO hidden_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'discussion_posts' AND column_name = 'hideUntil'
  ) INTO hideUntil_exists;
  
  -- Report results
  IF hidden_exists AND hideUntil_exists THEN
    RAISE NOTICE '✅ Migration successful! Both columns added.';
  ELSE
    RAISE EXCEPTION '❌ Migration failed! Columns not found.';
  END IF;
END $$;

-- Step 6: Show current schema
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'discussion_posts'
AND column_name IN ('hidden', 'hideUntil')
ORDER BY column_name;
