-- Migration: User Restrictions
-- Run this in Supabase SQL Editor to add separate restriction toggles for users.

alter table public.users
  add column if not exists "canUpload" boolean not null default true,
  add column if not exists "canChat" boolean not null default true,
  add column if not exists "canRate" boolean not null default true,
  add column if not exists "isBanned" boolean not null default false;

-- Update RLS for Materials (Restriction: canUpload)
drop policy if exists "materials insert auth" on public.materials;
create policy "materials insert auth" on public.materials
  for insert with check (
    auth.uid() = "uploadedBy" AND 
    (select "canUpload" from public.users where uid = auth.uid()) = true
  );

-- Update RLS for Chat Messages (Restriction: canChat)
drop policy if exists "auth_insert_chat_messages" on public.chat_messages;
create policy "auth_insert_chat_messages" on public.chat_messages for insert 
with check (
  auth.uid() = "senderId" AND
  (select "canChat" from public.users where uid = auth.uid()) = true
);

-- Update RLS for Ratings (Restriction: canRate)
-- Note: Assuming you have a material_ratings table from earlier turn
do $$
begin
  if exists (select 1 from information_schema.tables where table_name = 'material_ratings') then
    drop policy if exists "users insert ratings" on public.material_ratings;
    execute 'create policy "users insert ratings" on public.material_ratings for insert with check (auth.uid() = uid AND (select "canRate" from public.users where uid = auth.uid()) = true)';
  end if;
end $$;

-- Update Admin Policies to allow admin to update these new columns
drop policy if exists "users own row update" on public.users;
create policy "users own row update" on public.users
  for update using (auth.uid() = uid or is_admin());
