import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./authService";
import { Material } from "./materialService";

export interface SystemStats {
  totalUsers: number;
  totalMaterials: number;
  totalDownloads: number;
  totalMessages: number;
  totalFeatureRequests: number;
  activeUsers: number;
  newUsersThisWeek: number;
  newMaterialsThisWeek: number;
}

export interface FeatureRequest {
  id: string;
  userId: string;
  userName: string;
  materialId: string;
  materialTitle: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  materialId?: string;
  materialTitle?: string;
  content: string;
  type: 'material_message' | 'direct_message';
  createdAt: string;
  read: boolean;
}

// Initialize tables if they don't exist
async function initializeTables() {
  try {
    // Check if messages table exists, if not create it using the materials table as a template
    const { data: messagesCheck } = await supabase
      .from('messages')
      .select('id')
      .limit(1);
    
    if (!messagesCheck) {
      // Create messages using existing table structure
      console.log('Messages table not found, using fallback storage');
    }
  } catch (error) {
    console.log('Using fallback storage for messages');
  }
}

// Fallback storage for messages (using localStorage for demo)
const MESSAGES_KEY = 'edunexus_messages';
const FEATURE_REQUESTS_KEY = 'edunexus_feature_requests';

function getStoredMessages(): Message[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeMessages(messages: Message[]) {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to store messages:', error);
  }
}

function getStoredFeatureRequests(): FeatureRequest[] {
  try {
    const stored = localStorage.getItem(FEATURE_REQUESTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeFeatureRequests(requests: FeatureRequest[]) {
  try {
    localStorage.setItem(FEATURE_REQUESTS_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Failed to store feature requests:', error);
  }
}

// User Management
export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    console.log('AdminService: Attempting to get all users...');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('createdAt', { ascending: false });
    
    console.log('AdminService: Users query result:', { data, error });
    
    if (error) {
      console.error('AdminService: Error getting users:', error);
      throw error;
    }
    
    console.log('AdminService: Successfully loaded users:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('AdminService: Failed to get users:', error);
    return [];
  }
}

export async function updateUserRole(userId: string, role: 'student' | 'admin'): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('uid', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Failed to update user role:', error);
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    // Delete user's materials first
    await supabase.from('materials').delete().eq('uploaderId', userId);
    
    // Delete user profile
    const { error } = await supabase.from('users').delete().eq('uid', userId);
    if (error) throw error;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
}

export async function getUserStats(userId: string) {
  try {
    const [materialsCount, messagesCount] = await Promise.all([
      supabase.from('materials').select('id', { count: 'exact' }).eq('uploaderId', userId),
      Promise.resolve({ count: getStoredMessages().filter(m => m.senderId === userId).length })
    ]);

    return {
      materialsUploaded: materialsCount.count || 0,
      messagesSent: messagesCount.count || 0,
      featureRequests: getStoredFeatureRequests().filter(r => r.userId === userId).length
    };
  } catch (error) {
    console.error('Failed to get user stats:', error);
    return { materialsUploaded: 0, messagesSent: 0, featureRequests: 0 };
  }
}

// Material Management
export async function getAllMaterials(): Promise<Material[]> {
  try {
    console.log('AdminService: Attempting to get all materials...');
    const { data, error } = await supabase
      .from('materials')
      .select(`
        *,
        uploader:users!uploaderId(name)
      `)
      .order('createdAt', { ascending: false });
    
    console.log('AdminService: Materials query result:', { data, error });
    
    if (error) {
      console.error('AdminService: Error getting materials:', error);
      throw error;
    }
    
    const materials = (data || []).map(item => ({
      ...item,
      uploaderName: item.uploader?.name || 'Unknown'
    }));
    
    console.log('AdminService: Successfully loaded materials:', materials.length);
    return materials;
  } catch (error) {
    console.error('AdminService: Failed to get materials:', error);
    return [];
  }
}

export async function deleteMaterial(materialId: string): Promise<void> {
  try {
    // Delete the material
    const { error } = await supabase.from('materials').delete().eq('id', materialId);
    if (error) throw error;
    
    // Clean up related messages from storage
    const messages = getStoredMessages().filter(m => m.materialId !== materialId);
    storeMessages(messages);
    
    // Clean up related feature requests from storage
    const requests = getStoredFeatureRequests().filter(r => r.materialId !== materialId);
    storeFeatureRequests(requests);
  } catch (error) {
    console.error('Failed to delete material:', error);
    throw error;
  }
}

// Feature Request Management
export async function getAllFeatureRequests(): Promise<FeatureRequest[]> {
  return getStoredFeatureRequests();
}

export async function updateFeatureRequestStatus(
  requestId: string, 
  status: FeatureRequest['status']
): Promise<void> {
  const requests = getStoredFeatureRequests();
  const updatedRequests = requests.map(r => 
    r.id === requestId 
      ? { ...r, status, updatedAt: new Date().toISOString() }
      : r
  );
  storeFeatureRequests(updatedRequests);
}

export async function createFeatureRequest(request: {
  userId: string;
  materialId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}): Promise<FeatureRequest> {
  // Get user and material info
  const [user, material] = await Promise.all([
    supabase.from('users').select('name').eq('uid', request.userId).single(),
    supabase.from('materials').select('title').eq('id', request.materialId).single()
  ]);

  const newRequest: FeatureRequest = {
    id: Date.now().toString(),
    ...request,
    userName: user.data?.name || 'Unknown',
    materialTitle: material.data?.title || 'Unknown',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const requests = getStoredFeatureRequests();
  requests.unshift(newRequest);
  storeFeatureRequests(requests);
  
  return newRequest;
}

// Message Management
export async function getAllMessages(): Promise<Message[]> {
  return getStoredMessages();
}

export async function deleteMessage(messageId: string): Promise<void> {
  const messages = getStoredMessages().filter(m => m.id !== messageId);
  storeMessages(messages);
}

export async function sendMessage(message: {
  senderId: string;
  receiverId: string;
  materialId?: string;
  content: string;
  type: 'material_message' | 'direct_message';
}): Promise<Message> {
  // Get user and material info
  const [sender, receiver, material] = await Promise.all([
    supabase.from('users').select('name').eq('uid', message.senderId).single(),
    supabase.from('users').select('name').eq('uid', message.receiverId).single(),
    message.materialId 
      ? supabase.from('materials').select('title').eq('id', message.materialId).single()
      : Promise.resolve({ data: null })
  ]);

  const newMessage: Message = {
    id: Date.now().toString(),
    ...message,
    senderName: sender.data?.name || 'Unknown',
    receiverName: receiver.data?.name || 'Unknown',
    materialTitle: material.data?.title || undefined,
    createdAt: new Date().toISOString(),
    read: false
  };

  const messages = getStoredMessages();
  messages.unshift(newMessage);
  storeMessages(messages);
  
  return newMessage;
}

export async function getUserMessages(userId: string): Promise<Message[]> {
  const messages = getStoredMessages();
  return messages.filter(msg => 
    msg.senderId === userId || msg.receiverId === userId
  );
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  const messages = getStoredMessages();
  const updatedMessages = messages.map(m => 
    m.id === messageId ? { ...m, read: true } : m
  );
  storeMessages(updatedMessages);
}

// System Statistics
export async function getSystemStats(): Promise<SystemStats> {
  try {
    const [usersCount, materialsCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('materials').select('id', { count: 'exact' })
    ]);

    const messages = getStoredMessages();
    const requests = getStoredFeatureRequests();

    return {
      totalUsers: usersCount.count || 0,
      totalMaterials: materialsCount.count || 0,
      totalDownloads: 0,
      totalMessages: messages.length,
      totalFeatureRequests: requests.length,
      activeUsers: usersCount.count || 0,
      newUsersThisWeek: 0,
      newMaterialsThisWeek: 0
    };
  } catch (error) {
    console.error('Failed to get system stats:', error);
    return {
      totalUsers: 0,
      totalMaterials: 0,
      totalDownloads: 0,
      totalMessages: 0,
      totalFeatureRequests: 0,
      activeUsers: 0,
      newUsersThisWeek: 0,
      newMaterialsThisWeek: 0
    };
  }
}

// Initialize tables on import
initializeTables();