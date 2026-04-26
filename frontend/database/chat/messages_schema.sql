-- Run this script in your Supabase SQL Editor to create tables for Messages and Feature Requests

-- 0. Create a function to securely check if the current user is an admin
create or replace function public.is_admin()
returns boolean
language sql security definer set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where uid = auth.uid() and role = 'admin'
  );
$$;

-- 1. Create Messages Table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  "senderId" uuid not null references public.users(uid) on delete cascade,
  "senderName" text not null,
  "receiverId" uuid not null references public.users(uid) on delete cascade,
  "receiverName" text not null,
  "materialId" uuid references public.materials(id) on delete set null,
  "materialTitle" text,
  content text not null,
  type text not null check (type in ('material_message', 'direct_message')),
  read boolean not null default false,
  "createdAt" timestamptz not null default now()
);

-- 2. Create Feature Requests Table
create table if not exists public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references public.users(uid) on delete cascade,
  "userName" text not null,
  "materialId" uuid references public.materials(id) on delete set null,
  "materialTitle" text,
  title text not null,
  description text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'implemented')),
  priority text not null check (priority in ('low', 'medium', 'high')),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- 3. Enable Row Level Security (RLS)
alter table public.messages enable row level security;
alter table public.feature_requests enable row level security;

-- 4. Messages Policies
-- Users can read messages sent TO them or BY them
drop policy if exists "users read own messages" on public.messages;
create policy "users read own messages" on public.messages for select 
using (auth.uid() = "senderId" or auth.uid() = "receiverId" or is_admin());

-- Users can insert messages if they are the sender
drop policy if exists "users insert messages" on public.messages;
create policy "users insert messages" on public.messages for insert 
with check (auth.uid() = "senderId");

-- Users can update (mark as read) if they are the receiver
drop policy if exists "users update messages" on public.messages;
create policy "users update messages" on public.messages for update 
using (auth.uid() = "receiverId" or is_admin());

-- Users can delete their own messages
drop policy if exists "users delete messages" on public.messages;
create policy "users delete messages" on public.messages for delete 
using (auth.uid() = "senderId" or auth.uid() = "receiverId" or is_admin());

-- 5. Feature Requests Policies
-- Anyone can read feature requests
drop policy if exists "anyone read feature requests" on public.feature_requests;
create policy "anyone read feature requests" on public.feature_requests for select 
using (true);

-- Authenticated users can insert feature requests
drop policy if exists "users insert feature requests" on public.feature_requests;
create policy "users insert feature requests" on public.feature_requests for insert 
with check (auth.uid() = "userId");

-- Only Admins can update feature requests (e.g., status)
drop policy if exists "admins update feature requests" on public.feature_requests;
create policy "admins update feature requests" on public.feature_requests for update 
using (is_admin());

-- Only Admins or the creator can delete feature requests
drop policy if exists "delete feature requests" on public.feature_requests;
create policy "delete feature requests" on public.feature_requests for delete 
using (auth.uid() = "userId" or is_admin());
