alter table stickers enable row level security;

-- الجميع يقرأ الملصقات المفعّلة
create policy "public read active stickers"
on stickers
for select
using (active = true);

-- الأدمن فقط يضيف / يعدّل
create policy "admin manage stickers"
on stickers
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.is_admin = true
  )
);
