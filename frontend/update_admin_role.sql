-- Update user role to admin
-- Replace 'your-email@example.com' with your actual email address

UPDATE users 
SET role = 'admin' 
WHERE email = 'bekibekinat@gmail.com';

-- Or if you know your user ID:
-- UPDATE users SET role = 'admin' WHERE uid = 'your-user-id';

-- Verify the update:
SELECT uid, name, email, role FROM users WHERE role = 'admin';