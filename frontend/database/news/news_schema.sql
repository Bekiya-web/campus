-- University News & Updates System Schema

-- 1. News Posts Table
CREATE TABLE IF NOT EXISTS public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT, -- Short description for cards
  category TEXT NOT NULL, -- 'admission', 'scholarship', 'event', 'deadline', 'announcement'
  "universityId" TEXT NOT NULL, -- Which university this news is from
  "universityName" TEXT NOT NULL,
  "authorId" UUID REFERENCES public.users(uid) ON DELETE SET NULL,
  "authorName" TEXT,
  "imageUrl" TEXT, -- Optional cover image
  "externalLink" TEXT, -- Link to official announcement
  deadline TIMESTAMPTZ, -- For deadlines and events
  "eventDate" TIMESTAMPTZ, -- For events
  tags TEXT[] DEFAULT '{}',
  "viewsCount" INTEGER NOT NULL DEFAULT 0,
  "savesCount" INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false, -- Featured/pinned news
  published BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Saved News Table (User bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_news (
  "userId" UUID NOT NULL REFERENCES public.users(uid) ON DELETE CASCADE,
  "newsId" UUID NOT NULL REFERENCES public.news_posts(id) ON DELETE CASCADE,
  "savedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY ("userId", "newsId")
);

-- 3. News Views Table (Track who viewed what)
CREATE TABLE IF NOT EXISTS public.news_views (
  "userId" UUID NOT NULL REFERENCES public.users(uid) ON DELETE CASCADE,
  "newsId" UUID NOT NULL REFERENCES public.news_posts(id) ON DELETE CASCADE,
  "viewedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY ("userId", "newsId")
);

-- 4. Enable RLS
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_views ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- News Posts
DROP POLICY IF EXISTS "anyone_read_published_news" ON public.news_posts;
CREATE POLICY "anyone_read_published_news" ON public.news_posts 
  FOR SELECT USING (published = true OR is_admin());

DROP POLICY IF EXISTS "admin_insert_news" ON public.news_posts;
CREATE POLICY "admin_insert_news" ON public.news_posts 
  FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admin_update_news" ON public.news_posts;
CREATE POLICY "admin_update_news" ON public.news_posts 
  FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "admin_delete_news" ON public.news_posts;
CREATE POLICY "admin_delete_news" ON public.news_posts 
  FOR DELETE USING (is_admin());

-- Saved News
DROP POLICY IF EXISTS "users_read_own_saved" ON public.saved_news;
CREATE POLICY "users_read_own_saved" ON public.saved_news 
  FOR SELECT USING (auth.uid() = "userId");

DROP POLICY IF EXISTS "users_manage_own_saved" ON public.saved_news;
CREATE POLICY "users_manage_own_saved" ON public.saved_news 
  FOR ALL USING (auth.uid() = "userId");

-- News Views
DROP POLICY IF EXISTS "users_read_own_views" ON public.news_views;
CREATE POLICY "users_read_own_views" ON public.news_views 
  FOR SELECT USING (auth.uid() = "userId");

DROP POLICY IF EXISTS "users_manage_own_views" ON public.news_views;
CREATE POLICY "users_manage_own_views" ON public.news_views 
  FOR ALL USING (auth.uid() = "userId");

-- 6. Functions and Triggers

-- Function to handle saves count
CREATE OR REPLACE FUNCTION public.handle_news_save()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.news_posts SET "savesCount" = "savesCount" + 1 WHERE id = NEW."newsId";
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE public.news_posts SET "savesCount" = "savesCount" - 1 WHERE id = OLD."newsId";
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_news_save ON public.saved_news;
CREATE TRIGGER on_news_save
  AFTER INSERT OR DELETE ON public.saved_news
  FOR EACH ROW EXECUTE FUNCTION public.handle_news_save();

-- Function to handle views count
CREATE OR REPLACE FUNCTION public.handle_news_view()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.news_posts SET "viewsCount" = "viewsCount" + 1 WHERE id = NEW."newsId";
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_news_view ON public.news_views;
CREATE TRIGGER on_news_view
  AFTER INSERT ON public.news_views
  FOR EACH ROW EXECUTE FUNCTION public.handle_news_view();

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION public.update_news_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_news_timestamp ON public.news_posts;
CREATE TRIGGER update_news_timestamp
  BEFORE UPDATE ON public.news_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_news_timestamp();

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_news_posts_category ON public.news_posts(category);
CREATE INDEX IF NOT EXISTS idx_news_posts_university ON public.news_posts("universityId");
CREATE INDEX IF NOT EXISTS idx_news_posts_created_at ON public.news_posts("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_news_posts_deadline ON public.news_posts(deadline);
CREATE INDEX IF NOT EXISTS idx_news_posts_featured ON public.news_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_saved_news_user ON public.saved_news("userId");
CREATE INDEX IF NOT EXISTS idx_news_views_user ON public.news_views("userId");

-- 8. Comments
COMMENT ON TABLE public.news_posts IS 'University news, announcements, scholarships, and events';
COMMENT ON COLUMN public.news_posts.category IS 'admission, scholarship, event, deadline, announcement';
COMMENT ON COLUMN public.news_posts.featured IS 'Featured/pinned news shown at top';
COMMENT ON COLUMN public.news_posts.deadline IS 'Application or registration deadline';
COMMENT ON COLUMN public.news_posts."eventDate" IS 'When the event takes place';
