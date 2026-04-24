import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  getAllUsers, 
  updateUserRole, 
  deleteUser, 
  getSystemStats,
  getAllMaterials,
  deleteMaterial,
  getAllFeatureRequests,
  updateFeatureRequestStatus,
  getAllMessages,
  deleteMessage
} from "@/services/adminService";
import { UserProfile } from "@/services/authService";
import { Material } from "@/services/materialService";
import { FeatureRequest, Message, SystemStats } from "@/components/admin/types";

export function useAdminData() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('🔍 Loading admin data...');
      
      // Test database connection first
      console.log('🔌 Testing database connection...');
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      console.log('🔌 Database connection test:', { testData, testError });
      
      // Test if we can see any data at all
      const { data: rawUsers, error: rawUsersError } = await supabase
        .from('users')
        .select('*')
        .limit(5);
      
      console.log('👥 Raw users test:', { count: rawUsers?.length || 0, error: rawUsersError, sample: rawUsers?.[0] });
      
      const { data: rawMaterials, error: rawMaterialsError } = await supabase
        .from('materials')
        .select('*')
        .limit(5);
      
      console.log('📚 Raw materials test:', { count: rawMaterials?.length || 0, error: rawMaterialsError, sample: rawMaterials?.[0] });
      
      // Load data with proper error handling
      const [usersData, materialsData, requestsData, messagesData, statsData] = await Promise.allSettled([
        getAllUsers(),
        getAllMaterials(),
        getAllFeatureRequests(),
        getAllMessages(),
        getSystemStats()
      ]);
      
      // Handle users data
      if (usersData.status === 'fulfilled') {
        const loadedUsers = usersData.value || [];
        console.log('👥 Loaded users:', loadedUsers.length, loadedUsers);
        setUsers(loadedUsers);
      } else {
        console.error('❌ Failed to load users:', usersData.reason);
        setUsers([]);
      }
      
      // Handle materials data
      if (materialsData.status === 'fulfilled') {
        const loadedMaterials = materialsData.value || [];
        console.log('📚 Loaded materials:', loadedMaterials.length, loadedMaterials);
        setMaterials(loadedMaterials);
      } else {
        console.error('❌ Failed to load materials:', materialsData.reason);
        setMaterials([]);
      }
      
      // Handle feature requests data
      if (requestsData.status === 'fulfilled') {
        const loadedRequests = requestsData.value || [];
        console.log('🎯 Loaded requests:', loadedRequests.length, loadedRequests);
        setFeatureRequests(loadedRequests);
      } else {
        console.error('❌ Failed to load requests:', requestsData.reason);
        setFeatureRequests([]);
      }
      
      // Handle messages data
      if (messagesData.status === 'fulfilled') {
        const loadedMessages = messagesData.value || [];
        console.log('💬 Loaded messages:', loadedMessages.length, loadedMessages);
        setMessages(loadedMessages);
      } else {
        console.error('❌ Failed to load messages:', messagesData.reason);
        setMessages([]);
      }
      
      // Handle stats data - calculate from actual loaded data
      const finalUsers = usersData.status === 'fulfilled' ? (usersData.value || []) : [];
      const finalMaterials = materialsData.status === 'fulfilled' ? (materialsData.value || []) : [];
      const finalRequests = requestsData.status === 'fulfilled' ? (requestsData.value || []) : [];
      const finalMessages = messagesData.status === 'fulfilled' ? (messagesData.value || []) : [];
      
      if (statsData.status === 'fulfilled' && statsData.value) {
        console.log('📊 Loaded stats from service:', statsData.value);
        setSystemStats(statsData.value);
      } else {
        console.error('❌ Failed to load stats, calculating from data:', statsData.status === 'rejected' ? statsData.reason : 'No data');
        // Calculate stats from loaded data
        const calculatedStats = {
          totalUsers: finalUsers.length,
          totalMaterials: finalMaterials.length,
          totalDownloads: finalMaterials.reduce((sum, m) => sum + (m.downloadCount || 0), 0),
          totalMessages: finalMessages.length,
          totalFeatureRequests: finalRequests.length,
          activeUsers: finalUsers.length,
          newUsersThisWeek: 0,
          newMaterialsThisWeek: 0
        };
        console.log('📊 Calculated stats:', calculatedStats);
        setSystemStats(calculatedStats);
      }
      
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error("Failed to load some admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'student' | 'admin') => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.uid !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await deleteMaterial(materialId);
      setMaterials(materials.filter(m => m.id !== materialId));
      toast.success("Material deleted successfully");
    } catch (error) {
      toast.error("Failed to delete material");
    }
  };

  const handleFeatureRequestStatusChange = async (requestId: string, status: FeatureRequest['status']) => {
    try {
      await updateFeatureRequestStatus(requestId, status);
      setFeatureRequests(requests => 
        requests.map(r => r.id === requestId ? { ...r, status, updatedAt: new Date().toISOString() } : r)
      );
      toast.success(`Feature request ${status}`);
    } catch (error) {
      toast.error("Failed to update feature request");
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      setMessages(messages.filter(m => m.id !== messageId));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    users,
    materials,
    featureRequests,
    messages,
    systemStats,
    loading,
    handleRoleChange,
    handleDeleteUser,
    handleDeleteMaterial,
    handleFeatureRequestStatusChange,
    handleDeleteMessage,
    refetch: loadData
  };
}