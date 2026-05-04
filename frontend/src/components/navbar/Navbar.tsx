import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { logoutUser } from "@/services/authService";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, LayoutDashboard, Upload, BookOpen, Sun, Moon,
  Sparkles, Bot, Calculator, Menu, X, MessageSquare, Shield, Inbox, Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNotifications, markNotificationRead } from "@/services/notificationService";
import { cn } from "@/lib/utils";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { UserMenu } from "./UserMenu";
import { NotificationsMenu } from "./NotificationsMenu";
import { MobileMenu } from "./MobileMenu";
import { LanguageSelector } from "./LanguageSelector";
import { NavItem, NotificationDoc } from "@/types/navbar";

export function Navbar() {
  const { user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<NotificationDoc[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (user) fetchNotifications(user.id).then(setNotifs).catch(() => {});
    else setNotifs([]);
  }, [user]);

  const unread = notifs.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifs((prev) => prev.map((x) => x.id === id ? { ...x, read: true } : x));
  };

  const navItems: NavItem[] = [
    { to: "/", label: t.nav.home, icon: GraduationCap },
    { to: "/materials", label: t.nav.materials,  icon: BookOpen        },
    { to: "/gpa-calculator", label: t.nav.gpaCalculator, icon: Calculator },
    { to: "/#projects", label: t.nav.projects,   icon: Sparkles        },
  ];

  const navigateDashboard = () => {
    if (user) {
      navigate("/dashboard");
      return;
    }
    navigate("/login", { state: { from: { pathname: "/dashboard" } } });
  };

  return (
    <>
      {showBanner && <AnnouncementBanner onClose={() => setShowBanner(false)} />}

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/95 backdrop-blur-xl shadow-soft"
            : "border-border/60 bg-background/90 backdrop-blur-lg"
        )}
      >
        <div className={cn(
          "flex h-16 items-center justify-between gap-4",
          user ? "px-4 lg:px-8" : "container"
        )}>
          <div className="flex items-center gap-4 lg:gap-8">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground/60"
                onClick={() => document.dispatchEvent(new CustomEvent('toggle-sidebar'))}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className={cn(user && "lg:hidden")}>
              <Logo isLoggedIn={!!user} />
            </div>
            {!user && <DesktopNav navItems={navItems} />}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSelector />
            <Button
              variant="ghost" size="icon"
              onClick={toggleTheme}
              className="text-foreground/60 hover:text-foreground hover:bg-secondary rounded-full flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="h-[18px] w-[18px]" />
                : <Moon className="h-[18px] w-[18px]" />}
            </Button>

            {user ? (
              <>
                <NotificationsMenu 
                  notifications={notifs} 
                  unreadCount={unread} 
                  onMarkRead={handleMarkRead} 
                />
                <UserMenu 
                  userName={profile?.name} 
                  userPoints={profile?.points} 
                  onLogout={handleLogout} 
                />
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-foreground/80 hover:text-foreground hover:bg-secondary font-semibold"
                >
                  {t.nav.logIn}
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6"
                >
                  {t.common.getStarted}
                </Button>
              </div>
            )}

            {!user && (
              <div className="md:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 text-foreground/70 hover:text-foreground transition-smooth"
                  aria-label="Toggle menu"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {open && !user && (
          <MobileMenu
            navItems={navItems}
            isLoggedIn={!!user}
            onClose={() => setOpen(false)}
            onLogout={handleLogout}
            onNavigateDashboard={navigateDashboard}
          />
        )}
      </header>
    </>
  );
}
