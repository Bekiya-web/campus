import { supabase } from "@/integrations/supabase/client";

export interface DiscussionPost {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  universityId: string | null;
  department: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  parentId: string | null;
  createdAt: string;
}

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getDiscussionPosts(filters: { university?: string; department?: string; tag?: string } = {}, limit = 20, offset = 0): Promise<DiscussionPost[]> {
  let q = supabase
    .from('discussion_posts')
    .select('*')
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.university) q = q.eq('universityId', filters.university);
  if (filters.department) q = q.eq('department', filters.department);
  if (filters.tag) q = q.contains('tags', [filters.tag]);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function getPostById(id: string): Promise<DiscussionPost | null> {
  const { data, error } = await supabase
    .from('discussion_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createDiscussionPost(params: {
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  tags?: string[];
  universityId?: string;
  department?: string;
}): Promise<DiscussionPost> {
  const { data, error } = await supabase
    .from('discussion_posts')
    .insert([{
      authorId: params.authorId,
      authorName: params.authorName,
      title: params.title,
      content: params.content,
      tags: params.tags || [],
      universityId: params.universityId,
      department: params.department
    }])
    .select()
    .single();

  if (error) throw error;

  // ── Notifications ────────────────────────────────────────────────────────
  try {
    // 1. Notify author
    await supabase.from('notifications').insert({
      uid: params.authorId,
      type: 'discussion_created',
      title: '🚀 Post Published!',
      body: `Your discussion "${params.title}" is now live.`,
      read: false
    });

    // 2. Notify others in the same department/uni
    if (params.universityId && params.department) {
      const { data: colleagues } = await supabase
        .from('users')
        .select('uid')
        .eq('university', params.universityId)
        .eq('department', params.department)
        .neq('uid', params.authorId);

      if (colleagues?.length) {
        const batch = colleagues.map(c => ({
          uid: c.uid,
          type: 'new_discussion',
          title: '💬 New Discussion',
          body: `${params.authorName} started a new discussion: "${params.title}"`,
          read: false
        }));
        await supabase.from('notifications').insert(batch);
      }
    }
  } catch (notifErr) {
    console.error("Failed to send notifications:", notifErr);
  }

  return data;
}

// ── Comments ─────────────────────────────────────────────────────────────────

export async function getPostComments(postId: string): Promise<DiscussionComment[]> {
  const { data, error } = await supabase
    .from('discussion_comments')
    .select('*')
    .eq('postId', postId)
    .order('createdAt', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addDiscussionComment(params: {
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  parentId?: string;
}): Promise<DiscussionComment> {
  const { data, error } = await supabase
    .from('discussion_comments')
    .insert([{
      postId: params.postId,
      authorId: params.authorId,
      authorName: params.authorName,
      content: params.content,
      parentId: params.parentId
    }])
    .select()
    .single();

  if (error) throw error;

  // ── Notifications for Comment ──────────────────────────────────────────
  try {
    const { data: post } = await supabase
      .from('discussion_posts')
      .select('authorId, title')
      .eq('id', params.postId)
      .single();

    if (post && post.authorId !== params.authorId) {
      await supabase.from('notifications').insert({
        uid: post.authorId,
        type: 'new_comment',
        title: '💬 New Comment',
        body: `${params.authorName} commented on your post: "${post.title}"`,
        read: false
      });
    }
  } catch (notifErr) {
    console.error("Failed to send comment notification:", notifErr);
  }

  return data;
}

// ── Likes ────────────────────────────────────────────────────────────────────

export async function togglePostLike(postId: string, userId: string): Promise<boolean> {
  // Check if already liked
  const { data: existing } = await supabase
    .from('discussion_likes')
    .select('*')
    .eq('postId', postId)
    .eq('userId', userId)
    .maybeSingle();

  if (existing) {
    // Unlike
    const { error } = await supabase
      .from('discussion_likes')
      .delete()
      .eq('postId', postId)
      .eq('userId', userId);
    if (error) throw error;
    return false;
  } else {
    // Like
    const { error } = await supabase
      .from('discussion_likes')
      .insert([{ postId, userId }]);
    if (error) throw error;
    return true;
  }
}

export async function checkIfLiked(postId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('discussion_likes')
    .select('*')
    .eq('postId', postId)
    .eq('userId', userId)
    .maybeSingle();
  if (error) return false;
  return !!data;
}

// ── Realtime ─────────────────────────────────────────────────────────────────

export function subscribeToPosts(onUpdate: (payload: { eventType: string; new: DiscussionPost; old: Record<string, unknown> }) => void) {
  return supabase
    .channel('discussion_posts_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'discussion_posts' }, onUpdate)
    .subscribe();
}

export function subscribeToPostComments(postId: string, onUpdate: (payload: { eventType: string; new: DiscussionComment; old: Record<string, unknown> }) => void) {
  return supabase
    .channel(`post_comments_${postId}`)
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'discussion_comments',
      filter: `postId=eq.${postId}`
    }, onUpdate)
    .subscribe();
}
