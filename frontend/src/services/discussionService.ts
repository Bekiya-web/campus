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
  hidden?: boolean;
  hideUntil?: string | null;
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

export async function getDiscussionPosts(filters: { university?: string; department?: string; tag?: string; isAdmin?: boolean } = {}, limit = 20, offset = 0): Promise<DiscussionPost[]> {
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
  
  // Filter out hidden posts for non-admins
  if (!filters.isAdmin) {
    const now = new Date();
    return (data || []).filter(post => {
      if (!post.hidden) return true;
      if (post.hideUntil) {
        const hideUntilDate = new Date(post.hideUntil);
        return now > hideUntilDate; // Show if hide period has expired
      }
      return false; // Hidden indefinitely
    });
  }
  
  return data || [];
}

export async function getPostById(id: string, isAdmin = false): Promise<DiscussionPost | null> {
  const { data, error } = await supabase
    .from('discussion_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  
  // Check if post is hidden for non-admins
  if (data && !isAdmin && data.hidden) {
    if (data.hideUntil) {
      const now = new Date();
      const hideUntilDate = new Date(data.hideUntil);
      if (now <= hideUntilDate) {
        return null; // Still hidden
      }
    } else {
      return null; // Hidden indefinitely
    }
  }
  
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

// ── Admin Functions ──────────────────────────────────────────────────────────

export async function deleteDiscussionPost(postId: string): Promise<void> {
  // Delete all comments first
  const { error: commentsError } = await supabase
    .from('discussion_comments')
    .delete()
    .eq('postId', postId);
  
  if (commentsError) {
    console.error('Delete comments error:', commentsError);
    throw new Error(commentsError.message || 'Failed to delete comments');
  }

  // Delete all likes
  const { error: likesError } = await supabase
    .from('discussion_likes')
    .delete()
    .eq('postId', postId);
  
  if (likesError) {
    console.error('Delete likes error:', likesError);
    throw new Error(likesError.message || 'Failed to delete likes');
  }

  // Delete the post
  const { error } = await supabase
    .from('discussion_posts')
    .delete()
    .eq('id', postId);
  
  if (error) {
    console.error('Delete post error:', error);
    throw new Error(error.message || 'Failed to delete post');
  }
}

export async function hideDiscussionPost(postId: string, hideUntil?: Date): Promise<void> {
  const updateData: { hidden: boolean; hideUntil?: string | null } = { 
    hidden: true
  };
  
  if (hideUntil) {
    updateData.hideUntil = hideUntil.toISOString();
  } else {
    updateData.hideUntil = null;
  }
  
  const { error } = await supabase
    .from('discussion_posts')
    .update(updateData)
    .eq('id', postId);
  
  if (error) {
    console.error('Hide post error:', error);
    throw new Error(error.message || 'Failed to hide post');
  }
}

export async function unhideDiscussionPost(postId: string): Promise<void> {
  const { error } = await supabase
    .from('discussion_posts')
    .update({ 
      hidden: false,
      hideUntil: null
    })
    .eq('id', postId);
  
  if (error) {
    console.error('Unhide post error:', error);
    throw new Error(error.message || 'Failed to unhide post');
  }
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
