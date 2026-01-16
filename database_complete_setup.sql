-- =====================================================
-- GHARIM STICKER STORE - COMPLETE DATABASE SETUP
-- =====================================================
-- This script sets up all required tables, policies, and triggers
-- Run this in your Supabase SQL editor in the correct order

-- =====================================================
-- 1. CREATE PROFILES TABLE (for user management & admin roles)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "users_read_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "users_update_own_profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- =====================================================
-- 2. CREATE STICKERS TABLE (products)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.stickers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price integer NOT NULL,
  category text,
  image_url text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on stickers
ALTER TABLE public.stickers ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read active stickers
CREATE POLICY "public_read_active_stickers" ON public.stickers
  FOR SELECT USING (active = true);

-- Policy: Admin can read all stickers
CREATE POLICY "admin_read_all_stickers" ON public.stickers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy: Only admin can insert stickers
CREATE POLICY "admin_insert_stickers" ON public.stickers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy: Only admin can update stickers
CREATE POLICY "admin_update_stickers" ON public.stickers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy: Only admin can delete stickers
CREATE POLICY "admin_delete_stickers" ON public.stickers
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );


-- =====================================================
-- 3. CREATE ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  items jsonb NOT NULL,
  total integer NOT NULL,
  name text NOT NULL,
  phone text,
  city text,
  address text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert orders
CREATE POLICY "public_insert_orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Policy: Only admin can read orders
CREATE POLICY "admin_read_orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy: Only admin can delete orders
CREATE POLICY "admin_delete_orders" ON public.orders
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );


-- =====================================================
-- 4. CREATE FUNCTION & TRIGGER FOR NEW USER SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, is_admin)
  VALUES (new.id, new.email, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop trigger if it exists to avoid duplicates
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================================================
-- 5. SAMPLE DATA (optional - comment out if not needed)
-- =====================================================
-- Insert sample stickers for testing
INSERT INTO public.stickers (title, price, category, image_url, active)
VALUES
  ('توزيعات بخور ملكي', 5000, 'توزيعات', 'https://images.unsplash.com/photo-1628144450171-ec59a117cb83?q=80&w=400', true),
  ('مصحف الجيب مغلف', 7500, 'توزيعات', 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400', true),
  ('سبحة العقيق الفاخرة', 15000, 'توزيعات', 'https://images.unsplash.com/photo-1590074259010-8636cb077e69?q=80&w=400', true),
  ('مجموعة بخور وعود', 25000, 'هدايا', 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=400', true),
  ('علبة هدايا خشبية محفورة', 12500, 'توزيعات', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400', true),
  ('مصحف مخملي كبير', 35000, 'مصاحف', 'https://images.unsplash.com/photo-1597933534024-bcbb64dfd6f6?q=80&w=400', true),
  ('حامل مصحف خشبي', 45000, 'هدايا', 'https://images.unsplash.com/photo-1584281729155-320077819323?q=80&w=400', true),
  ('طقم صلاة متكامل', 65000, 'هدايا', 'https://images.unsplash.com/photo-1564683214965-3619add9800d?q=80&w=400', true),
  ('مصحف بالتجليد الذهبي', 55000, 'مصاحف', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=400', true),
  ('قنينة عطر زيتية فخمة', 12000, 'هدايا', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400', true),
  ('علبة هدايا مطرزة', 8500, 'توزيعات', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400', true),
  ('فانوس رمضاني يدوي', 18000, 'هدايا', 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=400', true),
  ('لوحة آية الكرسي مذهبة', 95000, 'هدايا', 'https://images.unsplash.com/photo-1510522134121-2238418b53c3?q=80&w=400', true),
  ('سجادة صلاة طبية', 40000, 'مصاحف', 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=400', true),
  ('صندوق بخور الصندل', 17000, 'توزيعات', 'https://images.unsplash.com/photo-1628144450171-ec59a117cb83?q=80&w=400', true),
  ('مجموعة الأذكار الفاخرة', 9000, 'هدايا', 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400', true),
  ('بساط صلاة أثري', 120000, 'مصاحف', 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=400', true),
  ('مبخرة نحاسية يدوية', 32000, 'هدايا', 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=400', true),
  ('طقم سبحة ومصحف جيب', 14000, 'توزيعات', 'https://images.unsplash.com/photo-1590074259010-8636cb077e69?q=80&w=400', true),
  ('درع آية الكرسي كريستال', 85000, 'هدايا', 'https://images.unsplash.com/photo-1510522134121-2238418b53c3?q=80&w=400', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 6. MAKE YOURSELF ADMIN (IMPORTANT!)
-- =====================================================
-- Replace 'your-email@example.com' with your actual email
-- Run this after your first signup:
-- UPDATE public.profiles SET is_admin = true WHERE email = 'your-email@example.com';

-- =====================================================
-- DONE! Your database is now ready.
-- =====================================================
