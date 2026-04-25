-- ============================================================
-- EDUNEXUS — FULL ADMIN & APPROVAL SYSTEM SETUP
-- Run this entire script in your Supabase SQL Editor ONCE.
-- ============================================================

-- ── 1. is_admin() helper function ──────────────────────────
create or replace function public.is_admin()
returns boolean
language sql security definer set search_path = public
as $$
  select exists (
    select 1 from public.users
    where uid = auth.uid() and role = 'admin'
  );
$$;

-- ── 2. Add status column to materials ──────────────────────
-- Values: 'pending' | 'approved' | 'rejected'
alter table public.materials
  add column if not exists status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected'));

-- Approve all existing materials so nothing breaks
update public.materials set status = 'approved' where status = 'pending';

-- ── 3. Create messages table ────────────────────────────────
create table if not exists public.messages (
  id            uuid primary key default gen_random_uuid(),
  "senderId"    uuid not null references public.users(uid) on delete cascade,
  "senderName"  text not null,
  "receiverId"  uuid not null references public.users(uid) on delete cascade,
  "receiverName" text not null,
  "materialId"  uuid references public.materials(id) on delete set null,
  "materialTitle" text,
  content       text not null,
  type          text not null check (type in ('material_message','direct_message')),
  read          boolean not null default false,
  "createdAt"   timestamptz not null default now()
);

-- ── 4. Create feature_requests table ───────────────────────
create table if not exists public.feature_requests (
  id            uuid primary key default gen_random_uuid(),
  "userId"      uuid not null references public.users(uid) on delete cascade,
  "userName"    text not null,
  "materialId"  uuid references public.materials(id) on delete set null,
  "materialTitle" text,
  title         text not null,
  description   text not null,
  status        text not null default 'pending'
                  check (status in ('pending','approved','rejected','implemented')),
  priority      text not null check (priority in ('low','medium','high')),
  "createdAt"   timestamptz not null default now(),
  "updatedAt"   timestamptz not null default now()
);

-- ── 5. Enable RLS on new tables ────────────────────────────
alter table public.messages enable row level security;
alter table public.feature_requests enable row level security;

-- ── 6. Admin policies — USERS table ────────────────────────
drop policy if exists "users own row select" on public.users;
create policy "users own row select" on public.users
  for select using (auth.uid() = uid or is_admin());

drop policy if exists "users own row update" on public.users;
create policy "users own row update" on public.users
  for update using (auth.uid() = uid or is_admin());

drop policy if exists "users own row insert" on public.users;
create policy "users own row insert" on public.users
  for insert with check (auth.uid() = uid);

drop policy if exists "admin users delete" on public.users;
create policy "admin users delete" on public.users
  for delete using (is_admin());

-- ── 7. Admin policies — MATERIALS table ────────────────────
-- Public: only see approved materials
-- Admins: see all (including pending/rejected)
drop policy if exists "materials readable" on public.materials;
create policy "materials readable" on public.materials
  for select using (status = 'approved' or auth.uid() = "uploadedBy" or is_admin());

drop policy if exists "materials insert auth" on public.materials;
create policy "materials insert auth" on public.materials
  for insert with check (
    auth.uid() = "uploadedBy" AND
    (select "canUpload" from public.users where uid = auth.uid()) = true
  );

drop policy if exists "materials update uploader" on public.materials;
create policy "materials update uploader" on public.materials
  for update using (auth.uid() = "uploadedBy" or is_admin());

drop policy if exists "admin materials delete" on public.materials;
create policy "admin materials delete" on public.materials
  for delete using (auth.uid() = "uploadedBy" or is_admin());

-- ── 8. Policies — MESSAGES table ───────────────────────────
drop policy if exists "users read own messages" on public.messages;
create policy "users read own messages" on public.messages
  for select using (auth.uid() = "senderId" or auth.uid() = "receiverId" or is_admin());

drop policy if exists "users insert messages" on public.messages;
create policy "users insert messages" on public.messages
  for insert with check (auth.uid() = "senderId");

drop policy if exists "users update messages" on public.messages;
create policy "users update messages" on public.messages
  for update using (auth.uid() = "receiverId" or is_admin());

drop policy if exists "users delete messages" on public.messages;
create policy "users delete messages" on public.messages
  for delete using (auth.uid() = "senderId" or auth.uid() = "receiverId" or is_admin());

-- ── 9. Policies — FEATURE_REQUESTS table ───────────────────
drop policy if exists "anyone read feature requests" on public.feature_requests;
create policy "anyone read feature requests" on public.feature_requests
  for select using (true);

drop policy if exists "users insert feature requests" on public.feature_requests;
create policy "users insert feature requests" on public.feature_requests
  for insert with check (auth.uid() = "userId");

drop policy if exists "admins update feature requests" on public.feature_requests;
create policy "admins update feature requests" on public.feature_requests
  for update using (is_admin());

drop policy if exists "delete feature requests" on public.feature_requests;
create policy "delete feature requests" on public.feature_requests
  for delete using (auth.uid() = "userId" or is_admin());

-- ── 10. Policies — NOTIFICATIONS table ─────────────────────
drop policy if exists "notifications own row select" on public.notifications;
create policy "notifications own row select" on public.notifications
  for select using (auth.uid() = uid);

drop policy if exists "notifications own row update" on public.notifications;
create policy "notifications own row update" on public.notifications
  for update using (auth.uid() = uid);

drop policy if exists "notifications insert authenticated" on public.notifications;
create policy "notifications insert authenticated" on public.notifications
  for insert with check (auth.role() = 'authenticated');

-- ── Done! ───────────────────────────────────────────────────
-- After running this:
--   • New uploads are status='pending' and hidden from public
--   • Admin sees all materials including pending ones
--   • Uploader can always see their own materials
--   • Admin approving/rejecting sends notification to uploader
