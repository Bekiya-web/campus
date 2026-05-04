import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
  Plus,
  Upload,
} from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import { StatsCards } from "@/components/admin/StatsCards";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { cn } from "@/lib/utils";
import { MaterialsManagement } from "@/components/admin/MaterialsManagement";
import { FeatureRequestsManagement } from "@/components/admin/FeatureRequestsManagement";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
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
          <h2 className="text-2xl font-bold mb-2">{t.admin.accessDenied}</h2>
          <p className="text-muted-foreground">{t.admin.noPermissionAdmin}</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2 text-muted-foreground">{t.admin.loadingAdmin}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-background">
      {/* Admin Sub-Sidebar */}
      <aside className="w-full lg:w-64 border-r border-border bg-card/50 backdrop-blur-sm p-6 space-y-6">
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.admin.adminMenu}</h2>
          <nav className="space-y-1">
            {[
              { id: "overview", label: t.admin.overview, icon: Activity },
              { id: "pending", label: t.admin.pendingReview, icon: Clock, count: pendingMaterials.length },
              { id: "users", label: t.admin.usersManagement, icon: Users },
              { id: "materials", label: t.admin.approvedContent, icon: FileText },
              { id: "requests", label: t.admin.featureRequests, icon: Shield },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.count ? (
                  <Badge className={cn(
                    "h-5 w-5 flex items-center justify-center p-0 text-[10px]",
                    activeTab === item.id ? "bg-primary-foreground text-primary" : "bg-orange-500"
                  )}>
                    {item.count}
                  </Badge>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-border/50">
          <Button variant="outline" onClick={refetch} className="w-full justify-start gap-2 h-11 rounded-xl">
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            {t.admin.syncData}
          </Button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('_', ' ')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t.admin.systemTools}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 font-bold">
                <Link to="/freshman-upload">
                  <Upload className="h-4 w-4 mr-2" />
                  {t.admin.uploadFreshmanMaterial}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="font-bold border-primary/20 text-primary">
                <Link to="/upload">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.admin.generalUpload}
                </Link>
              </Button>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <StatsCards
                systemStats={systemStats}
                usersCount={users.length}
                materialsCount={materials.length}
                requestsCount={featureRequests.length}
                messagesCount={0}
                onCardClick={setActiveTab}
              />
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 border-border bg-card/30">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    {t.admin.systemPulse}
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border/50">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'user' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                          {item.type === 'user' ? <UserPlus className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{formatDistanceToNow(item.date, { addSuffix: true })}</p>
                        </div>
                        {item.badge && <Badge variant="outline" className="text-[10px] uppercase font-bold">{item.badge}</Badge>}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border-border bg-card/30">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {t.admin.securityHealth}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="font-semibold">{t.admin.activeStudents}</span>
                      </div>
                      <span className="text-xl font-black text-primary">{users.filter(u => u.role !== 'admin').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-semibold">{t.admin.totalResources}</span>
                      </div>
                      <span className="text-xl font-black text-green-600">{materials.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span className="font-semibold">{t.admin.queueSize}</span>
                      </div>
                      <span className="text-xl font-black text-orange-600">{pendingMaterials.length}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="space-y-6">
              {pendingMaterials.length === 0 ? (
                <div className="py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                  <CheckCircle className="h-12 w-12 text-green-500/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">{t.admin.queueEmpty}</h3>
                  <p className="text-muted-foreground mt-1">{t.admin.noMaterialsReview}</p>
                </div>
              ) : (
                pendingMaterials.map((m) => (
                  <Card key={m.id} className="p-6 border-border hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20">{m.course}</Badge>
                          <Badge variant="outline">{m.year === '1' ? t.nav.freshmanHub.split(' ')[0] : `${t.auth.year} ${m.year}`}</Badge>
                        </div>
                        <h4 className="font-extrabold text-xl">{m.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">{m.description}</p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                            {m.uploaderName?.[0]}
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">{t.admin.uploadedBy} <span className="text-foreground">{m.uploaderName}</span></span>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <Button onClick={() => handleApproveMaterial(m.id)} className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 font-bold h-11 px-8">{t.admin.approve}</Button>
                        <Button variant="outline" onClick={() => handleRejectMaterial(m.id)} className="flex-1 md:flex-none text-red-600 border-red-200 hover:bg-red-50 font-bold h-11">{t.admin.reject}</Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === "users" && (
            <UsersManagement
              users={users}
              onRoleChange={handleRoleChange}
              onRestrictionChange={handleRestrictionChange}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === "materials" && (
            <MaterialsManagement
              materials={materials}
              onDeleteMaterial={handleDeleteMaterial}
            />
          )}

          {activeTab === "requests" && (
            <FeatureRequestsManagement
              featureRequests={featureRequests}
              onStatusChange={handleFeatureRequestStatusChange}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;