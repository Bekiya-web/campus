import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Smartphone, 
  Lock, 
  LogOut, 
  Save,
  Globe,
  Mail,
  University,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { updateUserProfile } from "@/services/authService";

const Settings = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    chat: true,
    approvals: true,
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserProfile(user.id, formData);
      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account, preferences, and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-slate-100 dark:bg-slate-800">
              <User className="h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Bell className="h-4 w-4" /> Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Shield className="h-4 w-4" /> Security
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Globe className="h-4 w-4" /> Preferences
            </Button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 space-y-8">
            {/* Profile Section */}
            <Card className="p-6 border-slate-200 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                  {profile?.role === 'admin' ? 'Administrator' : 'Student Account'}
                </Badge>
              </div>
              
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Public Profile
              </h2>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                      {profile?.name?.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 opacity-50">
                        <Label>Email Address</Label>
                        <div className="flex items-center gap-2 p-2 bg-slate-50 border rounded-md text-sm">
                          <Mail className="h-4 w-4" /> {profile?.email}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-[100px] p-3 rounded-md border bg-background"
                        placeholder="Tell others about your academic interests..."
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Academic Info (Read Only) */}
            <Card className="p-6 bg-slate-50/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <University className="h-5 w-5 text-blue-600" />
                Academic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">University</p>
                  <p className="font-semibold text-sm">{profile?.universityName}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">Department</p>
                  <p className="font-semibold text-sm">{profile?.department}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border shadow-sm">
                  <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">Year</p>
                  <p className="font-semibold text-sm">{profile?.year} Year</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-1">
                <Lock className="h-3 w-3" /> To change academic info, please contact support.
              </p>
            </Card>

            {/* Appearance Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                Appearance
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Adjust how EduNexus looks on your device.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-4 w-4 mr-1" /> Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-4 w-4 mr-1" /> Dark
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notifications Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notification Settings
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive weekly digests and important updates.</p>
                  </div>
                  <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({...notifications, email: v})} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold">Chat Mentions</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone replies to you in Global Chat.</p>
                  </div>
                  <Switch checked={notifications.chat} onCheckedChange={(v) => setNotifications({...notifications, chat: v})} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 text-blue-600">
                    <p className="font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Material Approvals
                    </p>
                    <p className="text-sm text-blue-600/70">Get notified when your uploaded materials are approved.</p>
                  </div>
                  <Switch checked={notifications.approvals} onCheckedChange={(v) => setNotifications({...notifications, approvals: v})} />
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 border-red-100 bg-red-50/20">
              <h2 className="text-xl font-bold mb-6 text-red-600 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Danger Zone
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Account Privacy</p>
                  <p className="text-sm text-muted-foreground">Log out from all devices or request data deletion.</p>
                </div>
                <Button variant="outline" className="text-red-600 border-red-200">
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
