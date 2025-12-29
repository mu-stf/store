-- Stickers: قراءة عامة
alter table stickers enable row level security;

create policy "public read stickers"
on stickers for select
using (true);

-- Orders: إضافة عامة
alter table orders enable row level security;

create policy "public insert orders"
on orders for insert
with check (true);

-- Orders: قراءة أدمن فقط
create policy "admin read orders"
on orders for select
using (auth.role() = 'authenticated');
