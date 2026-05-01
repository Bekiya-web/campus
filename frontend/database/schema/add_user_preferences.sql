-- Add user preferences and settings columns to users table

-- Appearance Settings
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS dark_mode BOOLEAN DEFAULT false;

-- Notification Settings
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS push_notifications BOOLEAN DEFAULT true;

-- Privacy Settings
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS public_profile BOOLEAN DEFAULT true;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS show_email BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN public.users.dark_mode IS 'User preference for dark mode theme';
COMMENT ON COLUMN public.users.email_notifications IS 'Enable/disable email notifications';
COMMENT ON COLUMN public.users.push_notifications IS 'Enable/disable push notifications';
COMMENT ON COLUMN public.users.public_profile IS 'Make profile visible to other users';
COMMENT ON COLUMN public.users.show_email IS 'Display email address publicly on profile';

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name IN ('dark_mode', 'email_notifications', 'push_notifications', 'public_profile', 'show_email')
ORDER BY column_name;
