alter table orders enable row level security;

-- الأدمن فقط يقرأ الطلبات
create policy "admin read orders"
on orders
for select
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.is_admin = true
  )
);

-- أي زبون يضيف طلب
create policy "public insert orders"
on orders
for insert
with check (true);
