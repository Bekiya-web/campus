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

export interface SystemStats {
  totalUsers: number;
  totalMaterials: number;
  totalDownloads: number;
  totalFeatureRequests: number;
  activeUsers: number;
  newUsersThisWeek: number;
  newMaterialsThisWeek: number;
}

export interface AdminData {
  users: any[];
  materials: any[];
  featureRequests: FeatureRequest[];
  systemStats: SystemStats | null;
}

export interface UserPermission {
  id: string;
  userId: string;
  permission: 'read' | 'write' | 'delete' | 'admin';
  resource: 'materials' | 'users' | 'system';
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
}

export interface AdminAction {
  id: string;
  adminId: string;
  adminName: string;
  action: 'create' | 'update' | 'delete' | 'permission_grant' | 'permission_revoke';
  resource: 'user' | 'material' | 'permission';
  resourceId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface UserStatus {
  userId: string;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  reason?: string;
  suspendedUntil?: string;
  modifiedBy: string;
  modifiedAt: string;
}