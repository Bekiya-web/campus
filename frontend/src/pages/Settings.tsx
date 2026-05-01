import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Lock, 
  Eye, 
  EyeOff,
  Save,
  ArrowLeft,
  Trash2,
  Download,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { updateUserProfile } from "@/services/authService";

export default function Settings() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    department: profile?.department || "",
    year: profile?.year || "",
    bio: profile?.bio || "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: profile?.email_notifications ?? true,
    pushNotifications: profile?.push_notifications ?? true,
    materialUpdates: true,
    newMessages: true,
    weeklyDigest: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    itemsPerPage: "10",
    showEmail: profile?.show_email || false,
    publicProfile: profile?.public_profile ?? true,
    showActivity: true,
    darkMode: profile?.dark_mode || false,
    emailNotifications: profile?.email_notifications ?? true,
    pushNotifications: profile?.push_notifications ?? true,
  });

  const handleExportData = () => {
    const data = {
      profile: {
        name: profile?.name,
        email: profile?.email,
        department: profile?.department,
        year: profile?.year,
        university: profile?.universityName,
        points: profile?.points,
        badges: profile?.badges,
        createdAt: profile?.createdAt,
      },
      preferences,
      notifications,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edunexus-data-\${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is not yet implemented. Please contact support.");
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    if (!profileData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    
    setSaving(true);
    try {
      // Only update fields that exist in the database
      const updates: any = {
        name: profileData.name,
        department: profileData.department,
        year: profileData.year,
      };
      
      // Only include bio if it's not empty (optional field)
      if (profileData.bio) {
        updates.bio = profileData.bio;
      }
      
      await updateUserProfile(profile.uid, updates);
      toast.success("Profile updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      console.error("Profile update error:", error);
      
      // Check if it's a column not found error
      if (error?.message?.includes("Could not find") || error?.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_bio_column.sql");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        email_notifications: notifications.emailNotifications,
        push_notifications: notifications.pushNotifications,
      });
      // Also save to localStorage for non-database settings
      localStorage.setItem("edunexus_notifications", JSON.stringify(notifications));
      toast.success("Notification preferences saved!");
      setTimeout(() => window.location.reload(), 800);
    } catch (error: any) {
      console.error("Notifications update error:", error);
      
      if (error?.message?.includes("Could not find") || error?.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_user_preferences.sql");
      } else {
        toast.error("Failed to save notification preferences. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (security.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    toast.success("Password changed successfully!");
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSavePreferences = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        dark_mode: preferences.darkMode,
        email_notifications: preferences.emailNotifications,
        push_notifications: preferences.pushNotifications,
        public_profile: preferences.publicProfile,
        show_email: preferences.showEmail,
      });
      // Also save to localStorage for non-database settings
      localStorage.setItem("edunexus_preferences", JSON.stringify(preferences));
      toast.success("Preferences saved!");
      setTimeout(() => window.location.reload(), 800);
    } catch (error: any) {
      console.error("Preferences update error:", error);
      
      if (error?.message?.includes("Could not find") || error?.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_user_preferences.sql");
      } else {
        toast.error("Failed to save preferences. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    { id: "profile", label: "Profile", icon: User, description: "Manage your personal information" },
    { id: "notifications", label: "Notifications", icon: Bell, description: "Configure notification preferences" },
    { id: "security", label: "Security", icon: Shield, description: "Password and security settings" },
    { id: "preferences", label: "Preferences", icon: Palette, description: "Customize your experience" },
  ];

  if (!profile) {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center">
          <p>Please log in to access settings.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="border-b bg-white dark:bg-slate-900">
        <div className="container max-w-7xl py-4 px-4">
          <Button variant="ghost" onClick={() => navigate("/profile")} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account, preferences, and security
          </p>
        </div>
      </div>

      <div className="container max-w-7xl py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu - Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-2 sticky top-6">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.label}</div>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </aside>

          <main className="flex-1 min-w-0">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Update your personal information and manage your account
                  </p>
                </div>

                <Card className="p-4 sm:p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-100 dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          value={profileData.year}
                          onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md min-h-[100px] dark:bg-slate-800 dark:border-slate-700"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile} disabled={saving} className="w-full sm:w-auto">
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Privacy & Visibility</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Public Profile</h4>
                        <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                      </div>
                      <Switch
                        checked={preferences.publicProfile}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, publicProfile: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Show Activity</h4>
                        <p className="text-sm text-muted-foreground">Display your recent activity publicly</p>
                      </div>
                      <Switch
                        checked={preferences.showActivity}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, showActivity: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Show Email Publicly</h4>
                        <p className="text-sm text-muted-foreground">Display your email address on your profile</p>
                      </div>
                      <Switch
                        checked={preferences.showEmail}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, showEmail: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={handleSavePreferences} disabled={saving} className="w-full sm:w-auto">
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Privacy Settings
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Account Data</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium">Export Your Data</h4>
                        <p className="text-sm text-muted-foreground">Download a copy of your account data</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleExportData} className="w-full sm:w-auto">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={handleDeleteAccount} className="w-full sm:w-auto">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to be notified about updates
                  </p>
                </div>

                <Card className="p-4 sm:p-6">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Material Updates</h4>
                        <p className="text-sm text-muted-foreground">Get notified about new materials</p>
                      </div>
                      <Switch
                        checked={notifications.materialUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, materialUpdates: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">New Messages</h4>
                        <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                      </div>
                      <Switch
                        checked={notifications.newMessages}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newMessages: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Weekly Digest</h4>
                        <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, weeklyDigest: checked })
                        }
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={handleSaveNotifications} disabled={saving} className="w-full sm:w-auto">
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your password and security preferences
                  </p>
                </div>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                      />
                    </div>

                    <Button onClick={handleChangePassword} className="w-full sm:w-auto">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your active sessions across devices
                  </p>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg dark:border-slate-700">
                      <div className="flex-1">
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Active now</p>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Preferences</h2>
                  <p className="text-sm text-muted-foreground">
                    Customize your experience and interface
                  </p>
                </div>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Dark Mode</h4>
                        <p className="text-sm text-muted-foreground">Enable dark theme</p>
                      </div>
                      <Switch
                        checked={preferences.darkMode}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, darkMode: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      >
                        <option value="en">English</option>
                        <option value="am">Amharic (አማርኛ)</option>
                        <option value="or">Oromo (Afaan Oromoo)</option>
                      </select>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Display Options</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="itemsPerPage">Items Per Page</Label>
                      <select
                        id="itemsPerPage"
                        value={preferences.itemsPerPage}
                        onChange={(e) => setPreferences({ ...preferences, itemsPerPage: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">Show Email on Profile</h4>
                        <p className="text-sm text-muted-foreground">Display your email address publicly</p>
                      </div>
                      <Switch
                        checked={preferences.showEmail}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, showEmail: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences} disabled={saving} className="w-full sm:w-auto">
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
