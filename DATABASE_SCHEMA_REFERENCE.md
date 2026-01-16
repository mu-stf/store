# Database Schema Reference

## Database Structure

```
GHARIM Store Database
│
├── auth.users (managed by Supabase)
│   └── id, email, password, etc.
│
└── Public Tables:
    │
    ├─ profiles
    │  ├─ id (uuid) → auth.users.id
    │  ├─ email (text)
    │  ├─ is_admin (boolean)
    │  └─ created_at (timestamp)
    │
    ├─ stickers
    │  ├─ id (uuid, PK)
    │  ├─ title (text)
    │  ├─ price (integer)
    │  ├─ category (text)
    │  ├─ image_url (text)
    │  ├─ active (boolean)
    │  ├─ created_at (timestamp)
    │  └─ updated_at (timestamp)
    │
    └─ orders
       ├─ id (uuid, PK)
       ├─ items (jsonb) [array of products]
       ├─ total (integer)
       ├─ name (text)
       ├─ phone (text)
       ├─ city (text)
       ├─ address (text)
       └─ created_at (timestamp)
```

## Row Level Security (RLS) Policies

### profiles table
```
┌─────────────────────────────────┐
│ READ: Users can read own profile │
│ UPDATE: Users can update own     │
└─────────────────────────────────┘
```

### stickers table
```
┌──────────────────────────────────┐
│ SELECT (public): active = true   │
│ SELECT (admin): all stickers     │
│ INSERT (admin only)              │
│ UPDATE (admin only)              │
│ DELETE (admin only)              │
└──────────────────────────────────┘
```

### orders table
```
┌──────────────────────────────────┐
│ INSERT (public): anyone can      │
│ SELECT (admin only)              │
│ DELETE (admin only)              │
└──────────────────────────────────┘
```

## Data Flow

### Customer Flow
```
Customer
   │
   ├─→ View Products (read active stickers)
   │
   ├─→ Add to Cart (local storage)
   │
   └─→ Checkout
       └─→ Insert order (anyone can)
           └─→ Save to orders table
```

### Admin Flow
```
Admin (after login & profile.is_admin=true)
   │
   ├─→ Read Products (can see all, active=false too)
   │
   ├─→ Create Product
   │   └─→ Insert into stickers
   │
   ├─→ Edit Product
   │   └─→ Update stickers
   │
   ├─→ Delete Product
   │   └─→ Delete from stickers
   │
   └─→ View Orders
       └─→ Read from orders table
```

## Sample Queries

### Get all active products
```sql
SELECT id, title, price, category, image_url 
FROM public.stickers 
WHERE active = true
ORDER BY created_at DESC;
```

### Get all orders (admin only)
```sql
SELECT id, name, phone, city, total, created_at 
FROM public.orders 
ORDER BY created_at DESC;
```

### Count products by category
```sql
SELECT category, COUNT(*) as count
FROM public.stickers
WHERE active = true
GROUP BY category;
```

### Get total revenue
```sql
SELECT SUM(total) as total_revenue
FROM public.orders;
```

### Make user admin
```sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'admin@example.com';
```

### Remove product from store (don't delete)
```sql
UPDATE public.stickers
SET active = false
WHERE id = 'product-uuid';
```

## Storage Buckets (Optional)

If using Supabase Storage for images:

```
Bucket: stickers
├─ Public bucket
├─ Path: stickers/{timestamp}_{filename}
└─ Used by admin.html for image uploads
```

## Triggers & Functions

### on_auth_user_created trigger
- **When**: New user signs up in auth.users
- **Action**: Automatically creates profile with email
- **Result**: All new users get is_admin = false

## Environment Variables (supabase.js)

```javascript
SUPABASE_URL = "https://kztjouywtnorkbvmtpwa.supabase.co"
SUPABASE_ANON_KEY = "sb_publishable_BkOtY7izopw810yVci77lg_tZmu3B2d"
```

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Products not showing | RLS blocking reads | Enable `public read active stickers` policy |
| Admin can't add products | Not marked as admin | Run profile update command |
| Orders not saving | RLS blocking inserts | Enable `public insert orders` policy |
| Images not uploading | No Storage bucket | Create `stickers` bucket in Storage |
| New users can't login | Profile not created | Verify trigger is working |

## Testing SQL Commands

### Check row counts
```sql
SELECT 
  (SELECT COUNT(*) FROM public.profiles) as profiles_count,
  (SELECT COUNT(*) FROM public.stickers) as stickers_count,
  (SELECT COUNT(*) FROM public.orders) as orders_count;
```

### Check RLS policies
```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Check recent stickers
```sql
SELECT id, title, price, active, created_at
FROM public.stickers
ORDER BY created_at DESC
LIMIT 5;
```

### Check recent orders
```sql
SELECT id, name, total, created_at
FROM public.orders
ORDER BY created_at DESC
LIMIT 5;
```

---

**Reference**: Use this guide to understand the database structure and verify your setup is correct.
