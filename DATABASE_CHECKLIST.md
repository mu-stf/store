# Database Fix Checklist

## Quick Start (5 minutes)

- [ ] Open Supabase dashboard → your project
- [ ] Go to **SQL Editor**
- [ ] Open `database_complete_setup.sql` from your project
- [ ] Copy **all content** and paste into SQL Editor
- [ ] Click **Run**
- [ ] Wait for success message

## After Running the Script

- [ ] Run this command to make yourself admin:
```sql
UPDATE public.profiles SET is_admin = true WHERE email = 'your@email.com';
```
(Replace with your real email)

- [ ] Verify tables exist:
```sql
SELECT * FROM public.stickers LIMIT 5;
SELECT * FROM public.orders;
SELECT * FROM public.profiles;
```

## Test the Application

- [ ] Start server: `python -m http.server 8000`
- [ ] Open http://localhost:8000/cohee.html
- [ ] Check that 20 products load ✓
- [ ] Try adding to cart ✓
- [ ] Try checkout (should save order) ✓
- [ ] Open http://localhost:8000/admin.html
- [ ] Log in with your email ✓
- [ ] Should see products list ✓
- [ ] Should see orders list ✓
- [ ] Try creating a new product ✓

## If Something Goes Wrong

### "Table already exists" = OK
- Just means it's already been run
- Data won't be deleted

### "Permission denied"
- Log out of Supabase, log back in
- Make sure you're using the right user

### Products don't load in store
- Check browser console for errors (F12)
- Verify supabase.js has correct credentials
- Check that `stickers` table has data

### Admin login fails
- Double-check your email is correct
- Run the admin update command again
- Check profiles table has your email

### Products don't show in admin
- Make sure you're logged in
- Make sure you're admin (check profiles table)
- Try refreshing page

## File Locations

```
edit2/
├── database_complete_setup.sql  ← Run this in Supabase!
├── DATABASE_FIX_INSTRUCTIONS.md ← Read for details
├── cohee.html                   ← Main store
├── admin.html                   ← Admin panel
├── product.html                 ← Product details
├── app.js                        ← Store logic
└── supabase.js                  ← Supabase config
```

## What Gets Created

| Table | Purpose | Status |
|-------|---------|--------|
| profiles | Users & admin roles | ✅ Created |
| stickers | Products | ✅ Created with 20 samples |
| orders | Customer orders | ✅ Created |
| RLS Policies | Security | ✅ Configured |
| Triggers | Auto-create profile on signup | ✅ Configured |

---

**Status**: Ready to fix! Follow the checklist above.
