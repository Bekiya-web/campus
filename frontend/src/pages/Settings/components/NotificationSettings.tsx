import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { updateUserProfile, type UserProfile } from "@/services/authService";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";

interface NotificationSettingsProps {
  profile: UserProfile;
  user: User | null;
}

export default function NotificationSettings({ profile, user }: NotificationSettingsProps) {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNotifications: profile?.email_notifications ?? true,
    pushNotifications: profile?.push_notifications ?? true,
    materialUpdates: true,
    newMessages: true,
    weeklyDigest: false,
  });

  const handleSaveNotifications = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        email_notifications: notifications.emailNotifications,
        push_notifications: notifications.pushNotifications,
      });
      localStorage.setItem("edunexus_notifications", JSON.stringify(notifications));
      toast.success("Notification preferences saved!");
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      const err = error as { message?: string };
      console.error("Notifications update error:", err);
      
      if (err.message?.includes("Could not find") || err.message?.includes("column")) {
        toast.error("Database schema needs updating. Please run the migration SQL.");
        console.error("❌ Run: frontend/database/schema/add_user_preferences.sql");
      } else {
        toast.error("Failed to save notification preferences. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">{t.settings.notificationPreferences}</h2>
        <p className="text-sm text-muted-foreground">
          {t.settings.chooseNotifications}
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium">{t.settings.emailNotifications}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.newMaterials}</p>
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
              <h4 className="font-medium">{t.settings.pushNotifications}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.newMaterials}</p>
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
              <h4 className="font-medium">{t.settings.materialUpdates}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.newMaterials}</p>
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
              <h4 className="font-medium">{t.settings.newMessages}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.newMaterials}</p>
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
              <h4 className="font-medium">{t.settings.weeklyDigest}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.newMaterials}</p>
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
  );
}
