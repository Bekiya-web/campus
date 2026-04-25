import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./authService";
import { Material } from "./materialService";
import { createDirectNotification } from "./notificationService";

export interface SystemStats {
  totalUsers: number;
  totalMaterials: number;
  totalDownloads: number;
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

// ─── User Management ──────────────────────────────────────────────────────────

export async function getAllUsers(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) {
    console.error('getAllUsers error:', error);
    return [];
  }
  return (data ?? []) as UserProfile[];
}

export async function updateUserRole(userId: string, role: 'student' | 'admin'): Promise<void> {
  const { error } = await supabase.from('users').update({ role }).eq('uid', userId);
  if (error) throw error;
}

export async function updateUserRestrictions(userId: string, restrictions: {
  canUpload?: boolean;
  canChat?: boolean;
  canRate?: boolean;
  isBanned?: boolean;
}): Promise<void> {
  const { error } = await supabase.from('users').update(restrictions).eq('uid', userId);
  if (error) throw error;
}

export async function deleteUser(userId: string): Promise<void> {
  await supabase.from('materials').delete().eq('uploadedBy', userId);
  const { error } = await supabase.from('users').delete().eq('uid', userId);
  if (error) throw error;
}

export async function getUserStats(userId: string) {
  const [materialsCount, requestsCount] = await Promise.all([
    supabase.from('materials').select('id', { count: 'exact', head: true }).eq('uploadedBy', userId),
    supabase.from('feature_requests').select('id', { count: 'exact', head: true }).eq('userId', userId),
  ]);
  return {
    materialsUploaded: materialsCount.count ?? 0,
    featureRequests: requestsCount.count ?? 0,
  };
}

// ─── Material Management ──────────────────────────────────────────────────────

export async function getAllMaterials(): Promise<Material[]> {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) {
    console.error('getAllMaterials error:', error);
    return [];
  }
  return (data ?? []) as Material[];
}

export async function updateMaterial(materialId: string, updates: Partial<Material>): Promise<void> {
  const { error } = await supabase.from('materials').update(updates).eq('id', materialId);
  if (error) throw error;
}

export async function deleteMaterial(materialId: string): Promise<void> {
  const { error } = await supabase.from('materials').delete().eq('id', materialId);
  if (error) throw error;
}

export async function getPendingMaterials(): Promise<Material[]> {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .eq('status', 'pending')
    .order('createdAt', { ascending: false });
  if (error) { console.error('getPendingMaterials error:', error); return []; }
  return (data ?? []) as Material[];
}

export async function approveMaterial(materialId: string): Promise<void> {
  const { error } = await supabase
    .from('materials')
    .update({ status: 'approved' })
    .eq('id', materialId);
  if (error) throw error;

  const { data: mat } = await supabase
    .from('materials')
    .select('uploadedBy, title')
    .eq('id', materialId)
    .single();
  if (!mat) return;

  await createDirectNotification({
    uid: mat.uploadedBy,
    type: 'material_approved',
    title: '✅ Material Approved!',
    body: `Your material "${mat.title}" has been approved and is now publicly visible.`,
    materialId,
  });
}

export async function rejectMaterial(materialId: string, reason?: string): Promise<void> {
  const { error } = await supabase
    .from('materials')
    .update({ status: 'rejected' })
    .eq('id', materialId);
  if (error) throw error;

  const { data: mat } = await supabase
    .from('materials')
    .select('uploadedBy, title')
    .eq('id', materialId)
    .single();
  if (!mat) return;

  await createDirectNotification({
    uid: mat.uploadedBy,
    type: 'material_rejected',
    title: '❌ Material Not Approved',
    body: reason
      ? `Your material "${mat.title}" was rejected: ${reason}`
      : `Your material "${mat.title}" was not approved by the admin.`,
    materialId,
  });
}

// ─── Feature Request Management ───────────────────────────────────────────────

export async function getAllFeatureRequests(): Promise<FeatureRequest[]> {
  const { data, error } = await supabase
    .from('feature_requests')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) { console.error('getAllFeatureRequests error:', error); return []; }
  return (data ?? []) as FeatureRequest[];
}

export async function updateFeatureRequestStatus(
  requestId: string,
  status: FeatureRequest['status']
): Promise<void> {
  const { error } = await supabase
    .from('feature_requests')
    .update({ status, updatedAt: new Date().toISOString() })
    .eq('id', requestId);
  if (error) throw error;
}

export async function createFeatureRequest(request: {
  userId: string;
  materialId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}): Promise<FeatureRequest> {
  const [user, material] = await Promise.all([
    supabase.from('users').select('name').eq('uid', request.userId).single(),
    supabase.from('materials').select('title').eq('id', request.materialId).single(),
  ]);
  const payload = {
    ...request,
    userName: user.data?.name ?? 'Unknown',
    materialTitle: material.data?.title ?? 'Unknown',
    status: 'pending',
  };
  const { data, error } = await supabase.from('feature_requests').insert([payload]).select().single();
  if (error) throw error;
  return data as FeatureRequest;
}

// ─── System Statistics ────────────────────────────────────────────────────────

export async function getSystemStats(): Promise<SystemStats> {
  try {
    const [usersRes, materialsRes, requestsRes] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('materials').select('id', { count: 'exact', head: true }),
      supabase.from('feature_requests').select('id', { count: 'exact', head: true }),
    ]);
    return {
      totalUsers: usersRes.count ?? 0,
      totalMaterials: materialsRes.count ?? 0,
      totalDownloads: 0,
      totalFeatureRequests: requestsRes.count ?? 0,
      activeUsers: usersRes.count ?? 0,
      newUsersThisWeek: 0,
      newMaterialsThisWeek: 0,
    };
  } catch (error) {
    console.error('getSystemStats error:', error);
    return {
      totalUsers: 0, totalMaterials: 0, totalDownloads: 0,
      totalFeatureRequests: 0, activeUsers: 0,
      newUsersThisWeek: 0, newMaterialsThisWeek: 0,
    };
  }
}