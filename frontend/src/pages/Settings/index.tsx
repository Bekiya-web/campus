import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Bell, Shield, Palette, ArrowLeft, ChevronRight } from "lucide-react";
import ProfileSettings from "./components/ProfileSettings";
import NotificationSettings from "./components/NotificationSettings";
import SecuritySettings from "./components/SecuritySettings";
import PreferencesSettings from "./components/PreferencesSettings";

export default function Settings() {
  const { profile, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");

  const menuItems = [
    { id: "profile", label: t.settings.profile, icon: User, description: "Manage your personal information" },
    { id: "notifications", label: t.settings.notifications, icon: Bell, description: "Configure notification preferences" },
    { id: "security", label: t.settings.security, icon: Shield, description: "Password and security settings" },
    { id: "preferences", label: t.settings.preferences, icon: Palette, description: "Customize your experience" },
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
          <h1 className="text-2xl font-bold">{t.settings.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t.settings.managePassword}
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
            {activeSection === "profile" && <ProfileSettings profile={profile} user={user} />}
            {activeSection === "notifications" && <NotificationSettings profile={profile} user={user} />}
            {activeSection === "security" && <SecuritySettings />}
            {activeSection === "preferences" && <PreferencesSettings profile={profile} user={user} />}
          </main>
        </div>
      </div>
    </div>
  );
}
