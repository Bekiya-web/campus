import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { updateUserProfile, type UserProfile } from "@/services/authService";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@supabase/supabase-js";

interface PreferencesSettingsProps {
  profile: UserProfile;
  user: User | null;
}

export default function PreferencesSettings({ profile, user }: PreferencesSettingsProps) {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    itemsPerPage: "10",
    showEmail: profile?.show_email || false,
    darkMode: profile?.dark_mode || false,
  });

  const handleSavePreferences = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, {
        dark_mode: preferences.darkMode,
        show_email: preferences.showEmail,
      });
      localStorage.setItem("edunexus_preferences", JSON.stringify(preferences));
      toast.success("Preferences saved!");
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">{t.settings.preferences}</h2>
        <p className="text-sm text-muted-foreground">
          {t.settings.selectLanguage}
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium">{t.settings.darkMode}</h4>
              <p className="text-sm text-muted-foreground">{t.settings.enableDarkTheme}</p>
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
              onChange={(e) => {
                const newLang = e.target.value;
                setPreferences({ ...preferences, language: newLang });
                localStorage.setItem('edunexus_language', newLang);
                toast.success('Language changed! Refresh the page to see changes.');
              }}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="en">English</option>
              <option value="om">Afaan Oromoo</option>
              <option value="am">አማርኛ (Amharic)</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              {t.settings.selectLanguage}
            </p>
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
              <h4 className="font-medium">{t.settings.showEmailProfile}</h4>
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
  );
}
