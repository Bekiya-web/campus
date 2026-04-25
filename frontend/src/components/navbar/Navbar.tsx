import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
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
import { NavItem, NotificationDoc } from "./types";

export function Navbar() {
  const { user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  const navItems: NavItem[] = user
    ? [
        { to: "/", label: "Home", icon: GraduationCap },
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/materials", label: "Materials",  icon: BookOpen        },
        { to: "/gpa-calculator", label: "GPA Calculator", icon: Calculator },
        { to: "/global-chat", label: "Global Chat", icon: Globe },
        { to: "/upload",    label: "Upload",      icon: Upload          },
        ...(profile?.role === 'admin' ? [{ to: "/admin", label: "Admin", icon: Shield }] : []),
        { to: "/#projects", label: "Projects",    icon: Sparkles        },
      ]
    : [
        { to: "/", label: "Home", icon: GraduationCap },
        { to: "/materials", label: "Materials",  icon: BookOpen        },
        { to: "/gpa-calculator", label: "GPA Calculator", icon: Calculator },
        { to: "/#projects", label: "Projects",   icon: Sparkles        },
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
        <div className="container flex h-16 items-center justify-between gap-4">
          <Logo isLoggedIn={!!user} />
          <DesktopNav navItems={navItems} />

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost" size="icon"
              onClick={toggleTheme}
              className="text-foreground/60 hover:text-foreground hover:bg-secondary"
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
              <>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="hidden lg:inline-flex items-center gap-1.5 text-foreground font-semibold"
                >
                  <Bot className="h-4 w-4" />
                  AI Assistant
                </Button>
                <Button
                  variant="outline"
                  onClick={navigateDashboard}
                  className="hidden lg:inline-flex items-center gap-1.5 text-foreground font-semibold"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-foreground/80 hover:text-foreground hover:bg-secondary font-semibold"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="btn-yellow font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-1">
            <Button
              variant="ghost" size="icon"
              onClick={toggleTheme}
              className="text-foreground/60 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-foreground/70 hover:text-foreground transition-smooth"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
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
