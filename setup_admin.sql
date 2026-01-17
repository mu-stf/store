-- =====================================================
-- SETUP ADMIN ACCOUNT FOR GHARIM STORE
-- =====================================================
-- This script will:
-- 1. Create an admin user with your credentials
-- 2. Grant admin privileges to the account

-- =====================================================
-- STEP 1: CREATE ADMIN USER
-- =====================================================
-- Go to Supabase Dashboard → Authentication → Users → Add User
-- Email: mus5667@gmail.com
-- Password: 123456
-- Auto Confirm User: YES (check this box)

-- Or use this API approach (if you prefer):
-- You can sign up manually through your auth.html page with these credentials

-- =====================================================
-- STEP 2: GRANT ADMIN PRIVILEGES
-- =====================================================
-- After creating the user, run this command to make them admin:

UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'mus5667@gmail.com';

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Verify the admin was created successfully:

SELECT id, email, is_admin, created_at 
FROM public.profiles 
WHERE email = 'mus5667@gmail.com';

-- Expected result: one row with is_admin = true

-- =====================================================
-- DONE!
-- =====================================================
-- You can now login to admin.html with:
-- Email: mus5667@gmail.com
-- Password: 123456
