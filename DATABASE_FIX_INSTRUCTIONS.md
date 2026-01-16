# Database Fix Instructions

## What Was Missing

Your Supabase database was missing the core tables:
- ❌ `stickers` table (products) - **MISSING**
- ❌ `orders` table (customer orders) - **MISSING**
- ✅ `profiles` table (user roles) - exists in setup_admin.sql
- ✅ RLS policies & triggers - exist in 2.sql & 3.sql

## How to Fix

### Step 1: Go to Supabase Dashboard
1. Visit https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**

### Step 2: Run the Complete Setup
1. Copy the entire contents of `database_complete_setup.sql`
2. Paste it into the Supabase SQL Editor
3. Click **Run** to execute all at once

**OR run in stages if you prefer:**

1. First, run the `1.sql` (profiles table)
2. Then, run the section from `database_complete_setup.sql` for stickers
3. Then, run the section for orders
4. Finally, run `setup_admin.sql` (trigger for new users)

### Step 3: Make Yourself Admin (CRITICAL!)
In the SQL Editor, run:
```sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```
Replace `your-email@example.com` with your actual Supabase email.

### Step 4: Test the Setup
1. Open http://localhost:8000/cohee.html
2. Products should now load from Supabase
3. Open http://localhost:8000/admin.html
4. You should be able to log in and see orders

## Database Schema

### profiles
```
id (uuid) - PK, references auth.users
email (text) - user email
is_admin (boolean) - admin flag
created_at (timestamp) - signup time
```

### stickers (Products)
```
id (uuid) - PK
title (text) - product name
price (integer) - price in dinars
category (text) - product category
image_url (text) - product image
active (boolean) - whether to show in store
created_at (timestamp) - created date
updated_at (timestamp) - last update
```

### orders (Customer Orders)
```
id (uuid) - PK
items (jsonb) - array of {id, title, price, qty}
total (integer) - total price
name (text) - customer name
phone (text) - customer phone
city (text) - customer city
address (text) - delivery address
created_at (timestamp) - order date
```

## Troubleshooting

### "Table already exists" error
- This is fine, the script uses `CREATE TABLE IF NOT EXISTS`
- The script won't overwrite existing data

### "Permission denied" error
- Make sure you're logged into Supabase as a user with admin rights
- Your Supabase user must have access to run SQL

### Products not loading
1. Check that `stickers` table has data:
   ```sql
   SELECT COUNT(*) FROM public.stickers;
   ```
2. Check RLS policies are enabled:
   ```sql
   SELECT * FROM pg_tables WHERE tablename = 'stickers';
   ```

### Admin login not working
1. Make sure you ran the admin update command
2. Check profiles table has your email:
   ```sql
   SELECT * FROM public.profiles WHERE email = 'your-email@example.com';
   ```

## What The Script Does

✅ Creates `profiles` table with user management  
✅ Creates `stickers` table with products  
✅ Creates `orders` table for customer orders  
✅ Enables Row Level Security (RLS) on all tables  
✅ Creates policies for public & admin access  
✅ Creates trigger for new user signups  
✅ Inserts 20 sample products  

## Files Updated

- **database_complete_setup.sql** - NEW! Complete schema setup
- Keep existing: 1.sql, 2.sql, 3.sql, setup_admin.sql

## Next Steps

After fixing the database:
1. Test the store at http://localhost:8000/cohee.html
2. Test admin at http://localhost:8000/admin.html  
3. Check that cart and orders work
4. All data should sync with Supabase
