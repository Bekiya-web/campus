import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  RefreshCw,
  Users,
  FileText,
  Activity,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import { StatsCards } from "@/components/admin/StatsCards";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { MaterialsManagement } from "@/components/admin/MaterialsManagement";
import { FeatureRequestsManagement } from "@/components/admin/FeatureRequestsManagement";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const {
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
    refetch,
  } = useAdminData();

  const recentActivity = [
    ...users.map((u) => ({
      id: `user_${u.uid}`,
      type: "user" as const,
      label: `${u.name} registered`,
      date: new Date(u.createdAt || ""),
      badge: u.role === "admin" ? "Admin" : "Student",
    })),
    ...materials.map((m) => ({
      id: `mat_${m.id}`,
      type: "material" as const,
      label: `"${m.title}" approved`,
      date: new Date(m.createdAt),
      badge: null as string | null,
    })),
    ...pendingMaterials.map((m) => ({
      id: `pend_${m.id}`,
      type: "pending" as const,
      label: `"${m.title}" awaiting review`,
      date: new Date(m.createdAt),
      badge: "Pending",
    })),
  ]
    .filter((a) => !isNaN(a.date.getTime()))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  if (!user || profile?.role !== "admin") {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center border-red-100 bg-red-50/50">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2 text-muted-foreground">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="container py-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage users, content, and system settings</p>
        </div>
        <Button variant="outline" onClick={refetch}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <StatsCards
        systemStats={systemStats}
        usersCount={users.length}
        materialsCount={materials.length}
        requestsCount={featureRequests.length}
        messagesCount={0}
        onCardClick={setActiveTab}
      />

      <AnimatePresence>
        {pendingMaterials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card
              className="p-4 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveTab("pending")}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-orange-800 dark:text-orange-200">
                    {pendingMaterials.length} Material{pendingMaterials.length > 1 ? "s" : ""} Awaiting Review
                  </p>
                </div>
                <Badge className="bg-orange-500 text-white">{pendingMaterials.length}</Badge>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Review
            {pendingMaterials.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 text-white text-xs font-bold">
                {pendingMaterials.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="materials">Approved ({materials.length})</TabsTrigger>
          <TabsTrigger value="requests">Feature Requests ({featureRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.type === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {item.type === 'user' ? <UserPlus className="h-4 w-4 text-blue-600" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                  <span>Total Students</span>
                  <span className="font-bold">{users.filter(u => u.role !== 'admin').length}</span>
                </div>
                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                  <span>Approved Materials</span>
                  <span className="font-bold">{materials.length}</span>
                </div>
                <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                  <span>Pending Review</span>
                  <span className="font-bold">{pendingMaterials.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {pendingMaterials.map((m) => (
              <Card key={m.id} className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{m.title}</h4>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="secondary">{m.uploaderName}</Badge>
                      <Badge variant="secondary">{m.course}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleApproveMaterial(m.id)} className="bg-green-600 hover:bg-green-700">Approve</Button>
                    <Button variant="outline" onClick={() => handleRejectMaterial(m.id)} className="text-red-600 border-red-200">Reject</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UsersManagement
            users={users}
            onRoleChange={handleRoleChange}
            onRestrictionChange={handleRestrictionChange}
            onDeleteUser={handleDeleteUser}
          />
        </TabsContent>

        <TabsContent value="materials">
          <MaterialsManagement
            materials={materials}
            onDeleteMaterial={handleDeleteMaterial}
          />
        </TabsContent>

        <TabsContent value="requests">
          <FeatureRequestsManagement
            featureRequests={featureRequests}
            onStatusChange={handleFeatureRequestStatusChange}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboard;