import { supabase } from "@/integrations/supabase/client";

export interface ChatRoom {
  id: string;
  courseId: string | null;
  universityId: string | null;
  type: 'global' | 'university' | 'direct';
  name: string | null;
  participants: string[] | null;
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  description: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  messageType: 'text' | 'image' | 'file';
  isQuestion: boolean;
  isAnswer: boolean;
  replyToId?: string;
  reactions: Record<string, string[]>; // emoji -> userIds[]
  isPinned: boolean;
  createdAt: string;
}

// ── Chat Rooms ───────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase.from('courses').select('*').order('name');
  if (error) throw error;
  return data || [];
}

export async function getUniversities(): Promise<University[]> {
  const { data, error } = await supabase.from('universities').select('*').order('name');
  if (error) throw error;
  return data || [];
}

export async function getOrCreateCourseByCode(code: string, name?: string): Promise<Course> {
  const { data: existing } = await supabase
    .from('courses')
    .select('*')
    .or(`code.eq."${code}",name.eq."${code}"`)
    .maybeSingle();

  if (existing) return existing as Course;

  const { data: created, error } = await supabase
    .from('courses')
    .insert([{
      code,
      name: name || code,
      department: 'General',
      description: 'Auto-created course discussion'
    }])
    .select()
    .single();

  if (error) throw error;
  return created as Course;
}

export async function getRoomsForCourse(courseId: string): Promise<ChatRoom[]> {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('courseId', courseId);
  if (error) throw error;
  return data || [];
}

export async function getOrCreateGlobalRoom(courseId: string): Promise<ChatRoom> {
  const { data: existing } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('courseId', courseId)
    .eq('type', 'global')
    .maybeSingle();

  if (existing) return existing as ChatRoom;

  const { data: created, error } = await supabase
    .from('chat_rooms')
    .insert([{
      courseId,
      type: 'global',
      name: 'Global Discussion'
    }])
    .select()
    .single();

  if (error) throw error;
  return created as ChatRoom;
}

export async function getDMRooms(userId: string): Promise<ChatRoom[]> {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('type', 'direct')
    .contains('participants', [userId]);
  if (error) throw error;
  return data || [];
}

export async function getOrCreateDMRoom(user1Id: string, user2Id: string): Promise<ChatRoom> {
  // Check if room exists
  const { data: existing } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('type', 'direct')
    .contains('participants', [user1Id, user2Id])
    .maybeSingle();

  if (existing) return existing as ChatRoom;

  // Create new
  const { data: created, error } = await supabase
    .from('chat_rooms')
    .insert([{
      type: 'direct',
      participants: [user1Id, user2Id],
    }])
    .select()
    .single();

  if (error) throw error;
  return created as ChatRoom;
}

// ── Messages ─────────────────────────────────────────────────────────────────

export async function getMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('roomId', roomId)
    .order('createdAt', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data || []) as ChatMessage[];
}

export async function sendChatMessage(params: {
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  messageType?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  isQuestion?: boolean;
  replyToId?: string;
}): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{
      roomId: params.roomId,
      senderId: params.senderId,
      senderName: params.senderName,
      content: params.content,
      messageType: params.messageType || 'text',
      fileUrl: params.fileUrl,
      fileName: params.fileName,
      isQuestion: params.isQuestion || false,
      replyToId: params.replyToId,
    }])
    .select()
    .single();

  if (error) throw error;
  return data as ChatMessage;
}

export async function toggleReaction(messageId: string, userId: string, emoji: string) {
  const { data: msg } = await supabase.from('chat_messages').select('reactions').eq('id', messageId).single();
  if (!msg) return;

  const reactions = { ...(msg.reactions as Record<string, string[]>) };
  if (!reactions[emoji]) reactions[emoji] = [];

  if (reactions[emoji].includes(userId)) {
    reactions[emoji] = reactions[emoji].filter(id => id !== userId);
  } else {
    reactions[emoji].push(userId);
  }

  const { error } = await supabase.from('chat_messages').update({ reactions }).eq('id', messageId);
  if (error) throw error;
}

export async function togglePin(messageId: string, isPinned: boolean) {
  const { error } = await supabase.from('chat_messages').update({ isPinned }).eq('id', messageId);
  if (error) throw error;
}

export async function deleteMessage(messageId: string) {
  const { error } = await supabase.from('chat_messages').delete().eq('id', messageId);
  if (error) throw error;
}

export async function deleteCourse(courseId: string) {
  const { error } = await supabase.from('courses').delete().eq('id', courseId);
  if (error) throw error;
}

// ── Realtime Subscription ────────────────────────────────────────────────────

export function subscribeToRoom(roomId: string, onMessage: (msg: ChatMessage) => void) {
  return supabase
    .channel(`room:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `roomId=eq.${roomId}`,
      },
      (payload) => onMessage(payload.new as ChatMessage)
    )
    .subscribe();
}
