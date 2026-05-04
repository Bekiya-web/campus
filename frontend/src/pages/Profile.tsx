import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { fetchMaterialsByIds, fetchMaterialsByUser, Material } from "@/services/materialService";
import { updateUserProfile } from "@/services/authService";
import { MaterialCard } from "@/components/common/MaterialCard";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Loader2,
  GraduationCap,
  Edit3,
  Camera,
  MapPin,
  Calendar,
  BookOpen,
  Star,
  Activity,
  Settings,
  Shield,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Profile = () => {
  const { profile, user } = useAuth();
  const { t } = useLanguage();
  const [uploads, setUploads] = useState<Material[]>([]);
  const [bookmarks, setBookmarks] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: profile?.name || "",
    department: profile?.department || "",
    year: profile?.year || "",
    bio: profile?.bio || "",
  });

  const [settings, setSettings] = useState({
    darkMode: profile?.dark_mode || false,
    emailNotifications: profile?.email_notifications ?? true,
    pushNotifications: profile?.push_notifications ?? true,
    publicProfile: profile?.public_profile ?? true,
    showEmail: profile?.show_email || false,
  });

  useEffect(() => {
    if (!profile) return;
    setEditData({
      name: profile.name || "",
      department: profile.department || "",
      year: profile.year || "",
      bio: profile.bio || "",
    });
    setSettings({
      darkMode: profile.dark_mode || false,
      emailNotifications: profile.email_notifications ?? true,
      pushNotifications: profile.push_notifications ?? true,
      publicProfile: profile.public_profile ?? true,
      showEmail: profile.show_email || false,
    });
    Promise.all([
      fetchMaterialsByUser(profile.uid),
      fetchMaterialsByIds(profile.bookmarks || []),
    ]).then(([u, b]) => {
      setUploads(u);
      setBookmarks(b);
    }).finally(() => setLoading(false));
  }, [profile]);

  // Build real activity feed from uploads and bookmarks
  const recentActivities = [
    ...uploads.map((u) => ({
      id: `up_${u.id}`,
      type: "upload" as const,
      date: new Date(u.createdAt),
      title: u.title,
    })),
    ...bookmarks.map((b) => ({
      id: `bk_${b.id}`,
      type: "bookmark" as const,
      date: new Date(b.createdAt),
      title: b.title,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      // Only update fields that exist in the database
      const updates: Record<string, string> = {
        name: editData.name,
        department: editData.department,
        year: editData.year,
      };
      
      // Only include bio if it's not empty (optional field)
      if (editData.bio) {
        updates.bio = editData.bio;
      }
      
      await updateUserProfile(profile.uid, updates);
      toast.success(t.messages.profileUpdated);
      setEditMode(false);
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as { message?: string };
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile");
      
      // Check if it's a column not found error
      if (error?.message?.includes("Could not find") || error?.message?.includes("column")) {
        toast.error("Database schema needs updating. Please contact admin.");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        dark_mode: settings.darkMode,
        email_notifications: settings.emailNotifications,
        push_notifications: settings.pushNotifications,
        public_profile: settings.publicProfile,
        show_email: settings.showEmail,
      });
      toast.success(t.messages.settingsSaved);
      setSettingsOpen(false);
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as { message?: string };
      console.error("Settings update error:", err);
      toast.error(err.message || "Failed to update settings");
      
      if (error?.message?.includes("Could not find") || error?.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_user_preferences.sql");
      } else {
        toast.error("Failed to save settings. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const getNextLevelPoints = (currentPoints: number) => {
    const levels = [0, 100, 250, 500, 1000, 2000, 5000];
    const idx = levels.findIndex((l) => currentPoints < l);
    return idx === -1 ? 10000 : levels[idx];
  };

  const getCurrentLevel = (points: number) => {
    if (points >= 5000) return { level: 6, name: "Expert Scholar", color: "from-purple-500 to-pink-500" };
    if (points >= 2000) return { level: 5, name: "Master Student", color: "from-blue-500 to-purple-500" };
    if (points >= 1000) return { level: 4, name: "Advanced Learner", color: "from-green-500 to-blue-500" };
    if (points >= 500) return { level: 3, name: "Active Contributor", color: "from-yellow-500 to-green-500" };
    if (points >= 250) return { level: 2, name: "Rising Star", color: "from-orange-500 to-yellow-500" };
    if (points >= 100) return { level: 1, name: "Beginner", color: "from-red-500 to-orange-500" };
    return { level: 0, name: "Newcomer", color: "from-gray-400 to-gray-500" };
  };

  if (!profile) return null;

  const currentLevel = getCurrentLevel(profile.points);
  const nextLevelPoints = getNextLevelPoints(profile.points);
  const progressPercentage = Math.min(((profile.points % 1000) / 1000) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-6xl py-4 sm:py-8 px-2 sm:px-4 space-y-8"
    >
      {/* Hero Profile Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className={`h-48 rounded-t-3xl bg-gradient-to-r ${currentLevel.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
              <Camera className="h-4 w-4 mr-2" />
              {t.profile.changeCover}
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="relative -mt-16 mx-2 sm:mx-4 p-4 sm:p-8 shadow-2xl border-white/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 w-full max-w-full">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className={`text-3xl font-bold text-white bg-gradient-to-r ${currentLevel.color}`}>
                    {profile.name[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0 shadow-lg">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words max-w-full">{profile.name}</h1>
                  {profile.role === "admin" && (
                    <Badge className="bg-red-500 text-white flex-shrink-0">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 break-all text-sm sm:text-base">{profile.email}</p>
                {profile.bio && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 italic break-words">"{profile.bio}"</p>
                )}

                {/* Level Badge */}
                <div className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r ${currentLevel.color} text-white font-semibold mb-4 text-xs sm:text-sm`}>
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{t.profile.level} {currentLevel.level} — {currentLevel.name}</span>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{profile.universityName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <GraduationCap className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{profile.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{profile.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: Award, label: t.profile.points, value: profile.points, colors: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800", text: "text-blue-600 dark:text-blue-400", num: "text-blue-900 dark:text-blue-100", sub: "text-blue-700 dark:text-blue-300" },
                { icon: BookOpen, label: t.profile.uploads, value: uploads.length, colors: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800", text: "text-green-600 dark:text-green-400", num: "text-green-900 dark:text-green-100", sub: "text-green-700 dark:text-green-300" },
                { icon: Star, label: t.profile.bookmarks, value: bookmarks.length, colors: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-800", text: "text-purple-600 dark:text-purple-400", num: "text-purple-900 dark:text-purple-100", sub: "text-purple-700 dark:text-purple-300" },
                { icon: Trophy, label: t.profile.badges, value: profile.badges?.length || 0, colors: "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800", text: "text-orange-600 dark:text-orange-400", num: "text-orange-900 dark:text-orange-100", sub: "text-orange-700 dark:text-orange-300" },
              ].map(({ icon: Icon, label, value, colors, text, num, sub }) => (
                <motion.div key={label} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className={`p-3 sm:p-4 text-center bg-gradient-to-br ${colors} shadow-sm`}>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${text} mx-auto mb-2`} />
                    <div className={`text-xl sm:text-2xl font-bold ${num}`}>{value}</div>
                    <div className={`text-xs sm:text-sm ${sub} truncate`}>{label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{t.profile.progressToNext}</span>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{profile.points} / {nextLevelPoints} pts</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 break-words">
              {nextLevelPoints - profile.points} {t.profile.morePoints}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-full">
            {/* Edit Profile Dialog */}
            <Dialog open={editMode} onOpenChange={setEditMode}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto sm:flex-1 min-w-0">
                  <Edit3 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{t.profile.editProfile}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{t.profile.editProfile}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">{t.auth.fullName}</Label>
                    <Input id="edit-name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="edit-bio">{t.profile.bio}</Label>
                    <Input id="edit-bio" placeholder="Tell us about yourself..." value={editData.bio} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="edit-department">{t.auth.department}</Label>
                    <Input id="edit-department" value={editData.department} onChange={(e) => setEditData({ ...editData, department: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="edit-year">{t.auth.year}</Label>
                    <Select value={editData.year} onValueChange={(value) => setEditData({ ...editData, year: value })}>
                      <SelectTrigger id="edit-year">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} className="flex-1" disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      {t.common.save}
                    </Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>{t.common.cancel}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto sm:flex-1 min-w-0">
                  <Settings className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{t.settings.title}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Account Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Appearance</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <Switch 
                        id="dark-mode" 
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <Switch 
                        id="email-notif" 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notif">Push Notifications</Label>
                      <Switch 
                        id="push-notif" 
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Privacy</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <Switch 
                        id="public-profile" 
                        checked={settings.publicProfile}
                        onCheckedChange={(checked) => setSettings({ ...settings, publicProfile: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-email">Show Email Publicly</Label>
                      <Switch 
                        id="show-email" 
                        checked={settings.showEmail}
                        onCheckedChange={(checked) => setSettings({ ...settings, showEmail: checked })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleSaveSettings} disabled={saving}>
                      {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Save Settings
                    </Button>
                    <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      {/* Badges Section */}
      {profile.badges && profile.badges.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            {t.profile.achievements}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {profile.badges.map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-center shadow-sm"
              >
                <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">{badge}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="uploads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 gap-1 h-auto p-1">
          <TabsTrigger value="uploads" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm min-w-0">
            <BookOpen className="h-4 w-4 flex-shrink-0" />
            <span className="truncate w-full text-center sm:text-left">
              {t.profile.myUploads} ({uploads.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm min-w-0">
            <Star className="h-4 w-4 flex-shrink-0" />
            <span className="truncate w-full text-center sm:text-left">
              {t.profile.myBookmarks} ({bookmarks.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 text-xs sm:text-sm min-w-0">
            <Activity className="h-4 w-4 flex-shrink-0" />
            <span className="truncate w-full text-center sm:text-left">
              {t.profile.activity}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uploads" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">{t.profile.myUploads}</h3>
              <Button size="sm" onClick={() => window.location.href = "/upload"}>
                <BookOpen className="h-4 w-4 mr-2" />
                {t.materials.uploadMaterial}
              </Button>
            </div>
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : uploads.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.profile.noUploads}</h4>
                <p className="text-gray-500 mb-4">{t.profile.uploadFirst}</p>
                <Button onClick={() => window.location.href = "/upload"}>{t.profile.uploadFirst}</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploads.map((material) => (
                  <div key={material.id} className="relative">
                    {material.status === 'pending' && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-300">
                          <Clock className="h-3 w-3" /> Pending Review
                        </span>
                      </div>
                    )}
                    {material.status === 'rejected' && (
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-300">
                          ✕ Rejected
                        </span>
                      </div>
                    )}
                    <MaterialCard material={material} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">{t.profile.myBookmarks}</h3>
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : bookmarks.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.profile.noBookmarks}</h4>
                <p className="text-gray-500 mb-4">{t.profile.bookmarkMaterials}</p>
                <Button variant="outline" onClick={() => window.location.href = "/materials"}>{t.materials.title}</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">{t.profile.recentActivity}</h3>
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.profile.noActivity}</h4>
                <p className="text-gray-500">{t.profile.startActivity}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      activity.type === "upload"
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-purple-50 dark:bg-purple-900/20"
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "upload"
                          ? "bg-blue-100 dark:bg-blue-800"
                          : "bg-purple-100 dark:bg-purple-800"
                      }`}
                    >
                      {activity.type === "upload" ? (
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium dark:text-white truncate">
                        {activity.type === "upload" ? t.profile.uploaded : t.profile.bookmarked}:{" "}
                        <span className="font-semibold">{activity.title}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Profile;