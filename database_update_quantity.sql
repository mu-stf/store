-- =====================================================
-- UPDATE STICKERS TABLE - ADD QUANTITY & DESCRIPTION
-- =====================================================
-- This migration adds inventory tracking and product descriptions
-- Run this in your Supabase SQL editor

-- 1. Add quantity column (default = 0 for existing products)
ALTER TABLE public.stickers 
ADD COLUMN IF NOT EXISTS quantity integer DEFAULT 0;

-- 2. Add description column (nullable for existing products)
ALTER TABLE public.stickers 
ADD COLUMN IF NOT EXISTS description text;

-- 3. Add index for quantity lookups (performance optimization)
CREATE INDEX IF NOT EXISTS idx_stickers_quantity ON public.stickers(quantity);

-- 4. Update trigger for updated_at timestamp (if not already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_stickers_updated_at ON public.stickers;

CREATE TRIGGER update_stickers_updated_at
    BEFORE UPDATE ON public.stickers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Optional: Update existing sample products with default quantities
-- Uncomment the lines below if you want to set initial quantities for existing products

-- UPDATE public.stickers SET quantity = 50 WHERE quantity = 0 OR quantity IS NULL;

-- =====================================================
-- DONE! Your stickers table now supports inventory tracking
-- =====================================================
-- Next steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Verify the new columns exist: SELECT * FROM public.stickers LIMIT 1;
-- 3. Update your admin panel to use the new fields
