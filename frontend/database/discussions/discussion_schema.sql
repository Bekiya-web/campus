-- User-to-User Discussion System Schema

-- 1. Discussion Posts Table
create table if not exists public.discussion_posts (
  id uuid primary key default gen_random_uuid(),
  "authorId" uuid not null references public.users(uid) on delete cascade,
  "authorName" text not null,
  title text not null,
  content text not null,
  tags text[] default '{}',
  "likesCount" integer not null default 0,
  "commentsCount" integer not null default 0,
  "universityId" text,
  "department" text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- 2. Discussion Comments Table
create table if not exists public.discussion_comments (
  id uuid primary key default gen_random_uuid(),
  "postId" uuid not null references public.discussion_posts(id) on delete cascade,
  "authorId" uuid not null references public.users(uid) on delete cascade,
  "authorName" text not null,
  content text not null,
  "parentId" uuid references public.discussion_comments(id) on delete cascade,
  "createdAt" timestamptz not null default now()
);

-- 3. Discussion Likes Table
create table if not exists public.discussion_likes (
  "postId" uuid not null references public.discussion_posts(id) on delete cascade,
  "userId" uuid not null references public.users(uid) on delete cascade,
  primary key ("postId", "userId")
);

-- 4. Enable RLS
alter table public.discussion_posts enable row level security;
alter table public.discussion_comments enable row level security;
alter table public.discussion_likes enable row level security;

-- 5. RLS Policies

-- Posts
drop policy if exists "anyone_read_posts" on public.discussion_posts;
create policy "anyone_read_posts" on public.discussion_posts for select using (true);

drop policy if exists "auth_insert_posts" on public.discussion_posts;
create policy "auth_insert_posts" on public.discussion_posts for insert with check (auth.uid() = "authorId");

drop policy if exists "users_update_own_posts" on public.discussion_posts;
create policy "users_update_own_posts" on public.discussion_posts for update using (auth.uid() = "authorId" or is_admin());

drop policy if exists "users_delete_own_posts" on public.discussion_posts;
create policy "users_delete_own_posts" on public.discussion_posts for delete using (auth.uid() = "authorId" or is_admin());

-- Comments
drop policy if exists "anyone_read_comments" on public.discussion_comments;
create policy "anyone_read_comments" on public.discussion_comments for select using (true);

drop policy if exists "auth_insert_comments" on public.discussion_comments;
create policy "auth_insert_comments" on public.discussion_comments for insert with check (auth.uid() = "authorId");

drop policy if exists "users_delete_own_comments" on public.discussion_comments;
create policy "users_delete_own_comments" on public.discussion_comments for delete using (auth.uid() = "authorId" or is_admin());

-- Likes
drop policy if exists "anyone_read_likes" on public.discussion_likes;
create policy "anyone_read_likes" on public.discussion_likes for select using (true);

drop policy if exists "auth_manage_own_likes" on public.discussion_likes;
create policy "auth_manage_own_likes" on public.discussion_likes for all using (auth.uid() = "userId");

-- 6. Functions and Triggers for Counts

-- Function to handle likes count
create or replace function public.handle_discussion_like()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.discussion_posts set "likesCount" = "likesCount" + 1 where id = NEW."postId";
  elsif (TG_OP = 'DELETE') then
    update public.discussion_posts set "likesCount" = "likesCount" - 1 where id = OLD."postId";
  end if;
  return null;
end;
$$ language plpgsql security definer;

drop trigger if exists on_discussion_like on public.discussion_likes;
create trigger on_discussion_like
  after insert or delete on public.discussion_likes
  for each row execute function public.handle_discussion_like();

-- Function to handle comments count
create or replace function public.handle_discussion_comment()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.discussion_posts set "commentsCount" = "commentsCount" + 1 where id = NEW."postId";
  elsif (TG_OP = 'DELETE') then
    update public.discussion_posts set "commentsCount" = "commentsCount" - 1 where id = OLD."postId";
  end if;
  return null;
end;
$$ language plpgsql security definer;

drop trigger if exists on_discussion_comment on public.discussion_comments;
create trigger on_discussion_comment
  after insert or delete on public.discussion_comments
  for each row execute function public.handle_discussion_comment();

-- 7. Indexes
create index if not exists idx_discussion_posts_author on public.discussion_posts("authorId");
create index if not exists idx_discussion_posts_created_at on public.discussion_posts("createdAt");
create index if not exists idx_discussion_comments_post_id on public.discussion_comments("postId");
create index if not exists idx_discussion_comments_parent_id on public.discussion_comments("parentId");
