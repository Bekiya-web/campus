-- Add bio column to users table for profile descriptions

-- Add bio column (nullable text field)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.users.bio IS 'User biography/about me text for profile page';

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'bio';
