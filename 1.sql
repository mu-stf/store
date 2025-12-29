create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  is_admin boolean default false,
  primary key (id)
);
