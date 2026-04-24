import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Bug, RefreshCw, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAdminData } from "@/hooks/useAdminData";
import { StatsCards } from "@/components/admin/StatsCards";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { MaterialsManagement } from "@/components/admin/MaterialsManagement";
import { FeatureRequestsManagement } from "@/components/admin/FeatureRequestsManagement";
import { MessagesManagement } from "@/components/admin/MessagesManagement";
import { createTestData, checkDatabaseTables } from "@/utils/testData";

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  
  const {
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
    refetch
  } = useAdminData();

  const handleCreateTestData = async () => {
    toast.info("Creating test data...");
    const success = await createTestData();
    if (success) {
      toast.success("Test data created! Refreshing...");
      refetch();
    } else {
      toast.error("Failed to create test data");
    }
  };

  const handleCheckDatabase = async () => {
    toast.info("Checking database...");
    const result = await checkDatabaseTables();
    if (result) {
      console.log('📊 Database check result:', result);
      const usersMsg = result.usersTable.exists 
        ? `Users: ${result.usersTable.count} records${result.usersTable.error ? ` (Error: ${result.usersTable.error})` : ''}`
        : `Users table error: ${result.usersTable.error}`;
      
      const materialsMsg = result.materialsTable.exists 
        ? `Materials: ${result.materialsTable.count} records${result.materialsTable.error ? ` (Error: ${result.materialsTable.error})` : ''}`
        : `Materials table error: ${result.materialsTable.error}`;
      
      toast.success(`Database check complete. ${usersMsg}, ${materialsMsg}`);
    } else {
      toast.error("Database check failed - see console for details");
    }
  };

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage users, content, and system settings</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCheckDatabase}>
              <Bug className="h-4 w-4 mr-2" />
              Check DB
            </Button>
            <Button variant="outline" onClick={handleCreateTestData}>
              <Plus className="h-4 w-4 mr-2" />
              Test Data
            </Button>
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <StatsCards
        systemStats={systemStats}
        usersCount={users.length}
        materialsCount={materials.length}
        requestsCount={featureRequests.length}
        messagesCount={messages.length}
        onCardClick={setActiveTab}
      />

      {/* Debug Info */}
      <Card className="mb-6 p-4 bg-yellow-50 border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">🐛 Debug Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Users Loaded:</span> {users.length}
            {users.length > 0 && <div className="text-xs text-muted-foreground">Sample: {users[0]?.name}</div>}
          </div>
          <div>
            <span className="font-medium">Materials Loaded:</span> {materials.length}
            {materials.length > 0 && <div className="text-xs text-muted-foreground">Sample: {materials[0]?.title}</div>}
          </div>
          <div>
            <span className="font-medium">Requests:</span> {featureRequests.length}
          </div>
          <div>
            <span className="font-medium">Messages:</span> {messages.length}
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Check browser console for detailed logs. Use buttons above to test database connection and create sample data.
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="materials">Materials ({materials.length})</TabsTrigger>
          <TabsTrigger value="requests">Requests ({featureRequests.length})</TabsTrigger>
          <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <UsersManagement
            users={users}
            onRoleChange={handleRoleChange}
            onDeleteUser={handleDeleteUser}
          />
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <MaterialsManagement
            materials={materials}
            onDeleteMaterial={handleDeleteMaterial}
          />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <FeatureRequestsManagement
            featureRequests={featureRequests}
            onStatusChange={handleFeatureRequestStatusChange}
          />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <MessagesManagement
            messages={messages}
            onDeleteMessage={handleDeleteMessage}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;