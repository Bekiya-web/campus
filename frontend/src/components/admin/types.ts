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

export interface AdminData {
  users: any[];
  materials: any[];
  featureRequests: FeatureRequest[];
  messages: Message[];
  systemStats: SystemStats | null;
}