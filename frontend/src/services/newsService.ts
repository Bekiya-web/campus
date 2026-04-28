import { supabase } from "@/integrations/supabase/client";

export type NewsCategory = 'admission' | 'scholarship' | 'event' | 'deadline' | 'announcement';

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  category: NewsCategory;
  universityId: string;
  universityName: string;
  authorId: string | null;
  authorName: string | null;
  imageUrl: string | null;
  externalLink: string | null;
  deadline: string | null;
  eventDate: string | null;
  tags: string[];
  viewsCount: number;
  savesCount: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsFilters {
  category?: NewsCategory;
  university?: string;
  search?: string;
  featured?: boolean;
  hasDeadline?: boolean;
}

// ── Fetch News ───────────────────────────────────────────────────────────────

export async function getNewsPosts(filters: NewsFilters = {}, limit = 20, offset = 0): Promise<NewsPost[]> {
  let query = supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.university) {
    query = query.eq('universityId', filters.university);
  }

  if (filters.featured) {
    query = query.eq('featured', true);
  }

  if (filters.hasDeadline) {
    query = query.not('deadline', 'is', null);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getFeaturedNews(limit = 5): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('createdAt', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getNewsById(id: string): Promise<NewsPost | null> {
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUpcomingDeadlines(limit = 10): Promise<NewsPost[]> {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .not('deadline', 'is', null)
    .gte('deadline', now)
    .order('deadline', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getUpcomingEvents(limit = 10): Promise<NewsPost[]> {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .eq('category', 'event')
    .not('eventDate', 'is', null)
    .gte('eventDate', now)
    .order('eventDate', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// ── Save/Bookmark News ───────────────────────────────────────────────────────

export async function toggleSaveNews(newsId: string, userId: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from('saved_news')
    .select('*')
    .eq('newsId', newsId)
    .eq('userId', userId)
    .maybeSingle();

  if (existing) {
    // Unsave
    const { error } = await supabase
      .from('saved_news')
      .delete()
      .eq('newsId', newsId)
      .eq('userId', userId);
    if (error) throw error;
    return false;
  } else {
    // Save
    const { error } = await supabase
      .from('saved_news')
      .insert([{ newsId, userId }]);
    if (error) throw error;
    return true;
  }
}

export async function checkIfSaved(newsId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('saved_news')
    .select('*')
    .eq('newsId', newsId)
    .eq('userId', userId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}

export async function getSavedNews(userId: string): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('saved_news')
    .select('newsId')
    .eq('userId', userId);

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const newsIds = data.map(s => s.newsId);
  
  const { data: news, error: newsError } = await supabase
    .from('news_posts')
    .select('*')
    .in('id', newsIds)
    .eq('published', true)
    .order('createdAt', { ascending: false });

  if (newsError) throw newsError;
  return news || [];
}

// ── Track Views ──────────────────────────────────────────────────────────────

export async function trackNewsView(newsId: string, userId: string): Promise<void> {
  // Check if already viewed
  const { data: existing } = await supabase
    .from('news_views')
    .select('*')
    .eq('newsId', newsId)
    .eq('userId', userId)
    .maybeSingle();

  if (!existing) {
    // Only track first view
    const { error } = await supabase
      .from('news_views')
      .insert([{ newsId, userId }]);
    
    if (error && !error.message.includes('duplicate')) {
      console.error('Failed to track view:', error);
    }
  }
}

// ── Admin Functions ──────────────────────────────────────────────────────────

export async function createNewsPost(params: {
  title: string;
  content: string;
  summary?: string;
  category: NewsCategory;
  universityId: string;
  universityName: string;
  authorId: string;
  authorName: string;
  imageUrl?: string;
  externalLink?: string;
  deadline?: Date;
  eventDate?: Date;
  tags?: string[];
  featured?: boolean;
}): Promise<NewsPost> {
  const { data, error } = await supabase
    .from('news_posts')
    .insert([{
      title: params.title,
      content: params.content,
      summary: params.summary,
      category: params.category,
      universityId: params.universityId,
      universityName: params.universityName,
      authorId: params.authorId,
      authorName: params.authorName,
      imageUrl: params.imageUrl,
      externalLink: params.externalLink,
      deadline: params.deadline?.toISOString(),
      eventDate: params.eventDate?.toISOString(),
      tags: params.tags || [],
      featured: params.featured || false,
      published: true
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateNewsPost(id: string, updates: Partial<NewsPost>): Promise<NewsPost> {
  const { data, error } = await supabase
    .from('news_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNewsPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('news_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ── Realtime ─────────────────────────────────────────────────────────────────

export function subscribeToNews(onUpdate: (payload: { eventType: string; new: NewsPost; old: Record<string, unknown> }) => void) {
  return supabase
    .channel('news_posts_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'news_posts' }, onUpdate)
    .subscribe();
}
