import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateUserProfile, type UserProfile } from "@/services/authService";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";

interface ProfileSettingsProps {
  profile: UserProfile;
  user: User | null;
}

export default function ProfileSettings({ profile, user }: ProfileSettingsProps) {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    department: profile?.department || "",
    year: profile?.year || "",
    bio: profile?.bio || "",
  });

  const [preferences, setPreferences] = useState({
    showEmail: profile?.show_email || false,
    publicProfile: profile?.public_profile ?? true,
    showActivity: true,
  });

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    if (!profileData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    
    setSaving(true);
    try {
      const updates: Record<string, string> = {
        name: profileData.name,
        department: profileData.department,
        year: profileData.year,
      };
      
      if (profileData.bio) {
        updates.bio = profileData.bio;
      }
      
      await updateUserProfile(profile.uid, updates);
      toast.success("Profile updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      const err = error as { message?: string };
      console.error("Profile update error:", err);
      
      if (err.message?.includes("Could not find") || err.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_bio_column.sql");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        public_profile: preferences.publicProfile,
        show_email: preferences.showEmail,
      });
      localStorage.setItem("edunexus_preferences", JSON.stringify(preferences));
      toast.success("Privacy settings saved!");
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as { message?: string };
      console.error("Preferences update error:", err);
      
      if (err.message?.includes("Could not find") || err.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_user_preferences.sql");
      } else {
        toast.error("Failed to save preferences. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

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
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edunexus-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is not yet implemented. Please contact support.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">{t.settings.profileInformation}</h2>
        <p className="text-sm text-muted-foreground">
          {t.settings.updatePersonalInfo}
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
              <h4 className="font-medium">{t.settings.publicProfile}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.allowOthersView}</p>
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
              <h4 className="font-medium">{t.settings.showActivity}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.displayActivity}</p>
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
              <h4 className="font-medium">{t.settings.showEmail}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.showEmailProfile}</p>
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
              <h4 className="font-medium">{t.settings.exportData}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.downloadCopy}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-medium text-destructive">{t.settings.deleteAccount}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.permanentlyDelete}</p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteAccount} className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
