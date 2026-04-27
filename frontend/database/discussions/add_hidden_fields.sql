-- Add hidden and hideUntil fields to discussion_posts table for admin moderation

-- Add hidden column (default false)
alter table public.discussion_posts 
add column if not exists hidden boolean not null default false;

-- Add hideUntil column (nullable timestamp for temporary hiding)
alter table public.discussion_posts 
add column if not exists "hideUntil" timestamptz;

-- Add index for efficient filtering of hidden posts
create index if not exists idx_discussion_posts_hidden on public.discussion_posts(hidden);

-- Add comment for documentation
comment on column public.discussion_posts.hidden is 'Admin can hide posts from regular users';
comment on column public.discussion_posts."hideUntil" is 'Optional timestamp when post should become visible again. NULL means hidden indefinitely';
