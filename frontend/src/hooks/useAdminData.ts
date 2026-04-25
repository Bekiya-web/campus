import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  getAllUsers, 
  updateUserRole, 
  updateUserRestrictions,
  deleteUser, 
  getSystemStats,
  getAllMaterials,
  getPendingMaterials,
  approveMaterial,
  rejectMaterial,
  deleteMaterial,
  getAllFeatureRequests,
  updateFeatureRequestStatus,
  FeatureRequest,
  SystemStats
} from "@/services/adminService";
import { UserProfile } from "@/services/authService";
import { Material } from "@/services/materialService";

export function useAdminData() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [pendingMaterials, setPendingMaterials] = useState<Material[]>([]);
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        getAllUsers(),
        getAllMaterials(),
        getPendingMaterials(),
        getAllFeatureRequests(),
        getSystemStats()
      ]);
      
      const [usersRes, materialsRes, pendingRes, requestsRes, statsRes] = results;

      // Type-safe extraction of values
      const finalUsers = usersRes.status === 'fulfilled' ? usersRes.value : [];
      const finalMaterials = materialsRes.status === 'fulfilled' ? materialsRes.value : [];
      const finalPending = pendingRes.status === 'fulfilled' ? pendingRes.value : [];
      const finalRequests = requestsRes.status === 'fulfilled' ? requestsRes.value : [];
      const finalStats = statsRes.status === 'fulfilled' ? statsRes.value : null;

      setUsers(finalUsers);
      setMaterials(finalMaterials);
      setPendingMaterials(finalPending);
      setFeatureRequests(finalRequests);

      if (finalStats) {
        setSystemStats(finalStats);
      } else {
        // Fallback stats calculation
        setSystemStats({
          totalUsers: finalUsers.length,
          totalMaterials: finalMaterials.length + finalPending.length,
          totalDownloads: finalMaterials.reduce((sum, m) => sum + (m.downloadCount || 0), 0),
          totalFeatureRequests: finalRequests.length,
          activeUsers: finalUsers.length,
          newUsersThisWeek: 0,
          newMaterialsThisWeek: 0,
        });
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
      setUsers(prev => prev.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleRestrictionChange = async (userId: string, restrictions: Partial<UserProfile>) => {
    try {
      await updateUserRestrictions(userId, restrictions);
      setUsers(prev => prev.map(u => u.uid === userId ? { ...u, ...restrictions } : u));
      toast.success("User restrictions updated");
    } catch (error) {
      toast.error("Failed to update user restrictions");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.uid !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await deleteMaterial(materialId);
      setMaterials(prev => prev.filter(m => m.id !== materialId));
      toast.success("Material deleted successfully");
    } catch (error) {
      toast.error("Failed to delete material");
    }
  };

  const handleFeatureRequestStatusChange = async (requestId: string, status: FeatureRequest['status']) => {
    try {
      await updateFeatureRequestStatus(requestId, status);
      setFeatureRequests(prev => 
        prev.map(r => r.id === requestId ? { ...r, status, updatedAt: new Date().toISOString() } : r)
      );
      toast.success(`Feature request ${status}`);
    } catch (error) {
      toast.error("Failed to update feature request");
    }
  };

  const handleApproveMaterial = async (materialId: string) => {
    try {
      await approveMaterial(materialId);
      const mat = pendingMaterials.find(m => m.id === materialId);
      if (mat) {
        setPendingMaterials(prev => prev.filter(m => m.id !== materialId));
        setMaterials(prev => [{ ...mat, status: 'approved' as const }, ...prev]);
      }
      toast.success('✅ Material approved!');
    } catch (error) {
      toast.error('Failed to approve material');
    }
  };

  const handleRejectMaterial = async (materialId: string, reason?: string) => {
    try {
      await rejectMaterial(materialId, reason);
      setPendingMaterials(prev => prev.filter(m => m.id !== materialId));
      toast.success('Material rejected.');
    } catch (error) {
      toast.error('Failed to reject material');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    users,
    materials,
    pendingMaterials,
    featureRequests,
    systemStats,
    loading,
    handleRoleChange,
    handleRestrictionChange,
    handleDeleteUser,
    handleDeleteMaterial,
    handleApproveMaterial,
    handleRejectMaterial,
    handleFeatureRequestStatusChange,
    refetch: loadData
  };
}