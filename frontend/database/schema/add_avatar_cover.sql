-- Add avatar and cover_photo columns to users table
-- Run this in Supabase SQL Editor

-- Add avatar column (stores profile picture URL)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS avatar text;

-- Add cover_photo column (stores cover photo URL)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS cover_photo text;

-- Create avatars storage bucket for profile pictures and covers
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to avatars bucket
DROP POLICY IF EXISTS "avatars bucket public read" ON storage.objects;
CREATE POLICY "avatars bucket public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload to avatars bucket
DROP POLICY IF EXISTS "avatars bucket authenticated upload" ON storage.objects;
CREATE POLICY "avatars bucket authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow users to update their own avatars
DROP POLICY IF EXISTS "avatars bucket own update" ON storage.objects;
CREATE POLICY "avatars bucket own update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own avatars
DROP POLICY IF EXISTS "avatars bucket own delete" ON storage.objects;
CREATE POLICY "avatars bucket own delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add comment
COMMENT ON COLUMN public.users.avatar IS 'URL to user profile picture stored in avatars bucket';
COMMENT ON COLUMN public.users.cover_photo IS 'URL to user cover photo stored in avatars bucket';
