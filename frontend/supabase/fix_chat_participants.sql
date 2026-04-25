-- Fix for Chat Participants Column
-- Run this if you get a "Failed to initialize chat" or "participants column not found" error.

-- 1. Add participants column if it doesn't exist
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='chat_rooms' and column_name='participants') then
    alter table public.chat_rooms add column "participants" uuid[] default null;
  end if;
end $$;

-- 2. Update type check to include 'direct'
alter table public.chat_rooms drop constraint if exists chat_rooms_type_check;
alter table public.chat_rooms add constraint chat_rooms_type_check check (type in ('global', 'university', 'direct'));

-- 3. Make courseId nullable for direct messages
alter table public.chat_rooms alter column "courseId" drop not null;

-- 4. Enable Realtime for the new tables (IMPORTANT)
-- This ensures messages show up instantly
begin;
  -- remove existing publication if any
  drop publication if exists supabase_realtime;
  -- create publication
  create publication supabase_realtime for table chat_messages, chat_rooms;
commit;
