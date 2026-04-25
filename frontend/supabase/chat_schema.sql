-- Global Course Chat System Schema
-- This script sets up the tables for Course-Based Chat rooms

-- 1. Universities Table (if not exists)
create table if not exists public.universities (
  id text primary key, -- Use 'aau', 'jimma' etc. from frontend data
  name text not null unique,
  location text,
  "createdAt" timestamptz not null default now()
);

-- 2. Courses Table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  department text not null,
  description text,
  "createdAt" timestamptz not null default now()
);

-- 3. Chat Rooms Table
create table if not exists public.chat_rooms (
  id uuid primary key default gen_random_uuid(),
  "courseId" uuid references public.courses(id) on delete cascade,
  "universityId" text references public.universities(id) on delete cascade,
  type text not null check (type in ('global', 'university', 'direct')),
  name text, -- Optional for DMs
  "participants" uuid[] default null, -- For direct messages [user1_id, user2_id]
  "createdAt" timestamptz not null default now(),
  unique("courseId", "universityId", type)
);

-- 4. Chat Messages Table
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  "roomId" uuid not null references public.chat_rooms(id) on delete cascade,
  "senderId" uuid not null references public.users(uid) on delete cascade,
  "senderName" text not null,
  content text not null,
  "fileUrl" text,
  "fileName" text,
  "fileType" text,
  "messageType" text not null default 'text' check ("messageType" in ('text', 'image', 'file')),
  "isQuestion" boolean not null default false,
  "isAnswer" boolean not null default false,
  "replyToId" uuid references public.chat_messages(id) on delete set null,
  reactions jsonb not null default '{}'::jsonb,
  "isPinned" boolean not null default false,
  "createdAt" timestamptz not null default now()
);

-- 5. Enable RLS
alter table public.universities enable row level security;
alter table public.courses enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_messages enable row level security;

-- 6. RLS Policies

-- Universities & Courses: Readable by everyone
drop policy if exists "anyone_read_universities" on public.universities;
create policy "anyone_read_universities" on public.universities for select using (true);

drop policy if exists "anyone_read_courses" on public.courses;
create policy "anyone_read_courses" on public.courses for select using (true);

-- Allow authenticated users to create courses (needed for auto-creation)
drop policy if exists "auth_insert_courses" on public.courses;
create policy "auth_insert_courses" on public.courses for insert with check (auth.role() = 'authenticated');

-- Allow admins to delete courses
drop policy if exists "admins_delete_courses" on public.courses;
create policy "admins_delete_courses" on public.courses for delete using (is_admin());

-- Chat Rooms: Readable by everyone
drop policy if exists "anyone_read_chat_rooms" on public.chat_rooms;
create policy "anyone_read_chat_rooms" on public.chat_rooms for select using (true);

-- Allow authenticated users to create rooms (needed for auto-creation & DMs)
drop policy if exists "auth_insert_chat_rooms" on public.chat_rooms;
create policy "auth_insert_chat_rooms" on public.chat_rooms for insert with check (auth.role() = 'authenticated');

-- Chat Messages:
-- Anyone can read messages
drop policy if exists "anyone_read_chat_messages" on public.chat_messages;
create policy "anyone_read_chat_messages" on public.chat_messages for select using (true);

-- Authenticated users can insert messages if not restricted
drop policy if exists "auth_insert_chat_messages" on public.chat_messages;
create policy "auth_insert_chat_messages" on public.chat_messages for insert 
with check (
  auth.uid() = "senderId" AND 
  (select "canChat" from public.users where uid = auth.uid()) = true
);

-- Users can delete their own messages
drop policy if exists "users_delete_own_messages" on public.chat_messages;
create policy "users_delete_own_messages" on public.chat_messages for delete 
using (auth.uid() = "senderId" or is_admin());

-- Users can update their own messages (for pinning/reactions/edits)
drop policy if exists "users_update_own_messages" on public.chat_messages;
create policy "users_update_own_messages" on public.chat_messages for update 
using (auth.uid() = "senderId" or is_admin());

-- 7. Indexes for performance
create index if not exists idx_chat_messages_room_id on public.chat_messages("roomId");
create index if not exists idx_chat_messages_created_at on public.chat_messages("createdAt");
create index if not exists idx_chat_rooms_course_id on public.chat_rooms("courseId");
