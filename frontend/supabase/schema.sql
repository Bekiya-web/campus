-- Run this in Supabase SQL Editor for project: iwymkieoscqjjiwrdyxe

create extension if not exists "pgcrypto";

create table if not exists public.users (
  uid uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  university text not null,
  "universityName" text not null,
  department text not null,
  year text not null,
  role text not null default 'student',
  points integer not null default 0,
  badges text[] not null default '{}',
  bookmarks text[] not null default '{}',
  "createdAt" timestamptz not null default now()
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  university text not null,
  "universityName" text not null,
  department text not null,
  year text not null,
  course text not null,
  "fileURL" text not null,
  "storagePath" text not null,
  "fileSize" bigint not null,
  "uploadedBy" uuid not null references public.users(uid) on delete cascade,
  "uploaderName" text not null,
  "createdAt" timestamptz not null default now(),
  "ratingAvg" numeric(6,2) not null default 0,
  "ratingCount" integer not null default 0,
  "downloadCount" integer not null default 0
);

create table if not exists public.material_ratings (
  material_id uuid not null references public.materials(id) on delete cascade,
  uid uuid not null references public.users(uid) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  "updatedAt" timestamptz not null default now(),
  primary key (material_id, uid)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  body text not null,
  "materialId" uuid references public.materials(id) on delete set null,
  university text,
  department text,
  course text,
  uid uuid not null references public.users(uid) on delete cascade,
  read boolean not null default false,
  "createdAt" timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.materials enable row level security;
alter table public.material_ratings enable row level security;
alter table public.notifications enable row level security;

drop policy if exists "users own row select" on public.users;
create policy "users own row select" on public.users for select using (auth.uid() = uid);
drop policy if exists "users own row update" on public.users;
create policy "users own row update" on public.users for update using (auth.uid() = uid);
drop policy if exists "users own row insert" on public.users;
create policy "users own row insert" on public.users for insert with check (auth.uid() = uid);

drop policy if exists "materials readable" on public.materials;
create policy "materials readable" on public.materials for select using (true);
drop policy if exists "materials insert auth" on public.materials;
create policy "materials insert auth" on public.materials for insert with check (auth.uid() = "uploadedBy");
drop policy if exists "materials update uploader" on public.materials;
create policy "materials update uploader" on public.materials for update using (auth.uid() = "uploadedBy");

drop policy if exists "ratings readable" on public.material_ratings;
create policy "ratings readable" on public.material_ratings for select using (true);
drop policy if exists "ratings own write" on public.material_ratings;
create policy "ratings own write" on public.material_ratings for insert with check (auth.uid() = uid);
drop policy if exists "ratings own update" on public.material_ratings;
create policy "ratings own update" on public.material_ratings for update using (auth.uid() = uid);

drop policy if exists "notifications own row select" on public.notifications;
create policy "notifications own row select" on public.notifications for select using (auth.uid() = uid);
drop policy if exists "notifications own row update" on public.notifications;
create policy "notifications own row update" on public.notifications for update using (auth.uid() = uid);
drop policy if exists "notifications insert authenticated" on public.notifications;
create policy "notifications insert authenticated" on public.notifications for insert with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('materials', 'materials', true)
on conflict (id) do nothing;

drop policy if exists "materials bucket public read" on storage.objects;
create policy "materials bucket public read"
on storage.objects for select
using (bucket_id = 'materials');

drop policy if exists "materials bucket authenticated upload" on storage.objects;
create policy "materials bucket authenticated upload"
on storage.objects for insert
with check (bucket_id = 'materials' and auth.role() = 'authenticated');
