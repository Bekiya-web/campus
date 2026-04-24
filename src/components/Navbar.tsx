import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { logoutUser } from "@/services/authService";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, LayoutDashboard, Upload, BookOpen, User, LogOut,
  Menu, X, Bell, Sun, Moon, Sparkles, Bot, Calculator,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNotifications, markNotificationRead, NotificationDoc } from "@/services/notificationService";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
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

  const navItems = user
    ? [
        { to: "/", label: "Home", icon: GraduationCap },
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/materials", label: "Materials",  icon: BookOpen        },
        { to: "/gpa-calculator", label: "GPA Calculator", icon: Calculator },
        { to: "/upload",    label: "Upload",      icon: Upload          },
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
      {/* Modern announcement banner */}
      {showBanner && (
        <div className="bg-gradient-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          <div className="container relative z-10 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
              <p className="text-sm font-semibold truncate">
                <span className="hidden sm:inline">🎉 New: </span>
                Upload materials and earn points — completely free!
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                asChild
                size="sm"
                className="bg-background text-foreground hover:bg-background/90 h-7 px-3 text-xs font-bold rounded-full"
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <button
                onClick={() => setShowBanner(false)}
                className="h-7 w-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur-xl shadow-soft"
          : "border-border/60 bg-background/90 backdrop-blur-lg"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft transition-smooth">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-foreground">Campus Helper</span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              onClick={(e) => {
                if (it.to === "/#projects") {
                  e.preventDefault();
                  if (location.pathname !== "/") {
                    navigate("/#projects");
                    return;
                  }
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <it.icon className="h-4 w-4" /> {it.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right side ── */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
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
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-foreground/60 hover:text-foreground hover:bg-secondary">
                    <Bell className="h-[18px] w-[18px]" />
                    {unread > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="text-foreground font-semibold">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifs.length === 0
                    ? <div className="px-3 py-6 text-center text-sm text-muted-foreground">No notifications yet</div>
                    : notifs.slice(0, 8).map((n) => (
                        <DropdownMenuItem
                          key={n.id}
                          onClick={async () => {
                            await markNotificationRead(n.id);
                            setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x));
                            if (n.materialId) navigate(`/materials/${n.materialId}`);
                          }}
                          className="flex flex-col items-start gap-0.5 py-2.5"
                        >
                          <div className="flex items-center gap-2 w-full">
                            {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                            <span className="font-semibold text-sm text-foreground">{n.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground line-clamp-1 pl-3.5">{n.body}</span>
                        </DropdownMenuItem>
                      ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground hover:bg-secondary px-2.5">
                    <div className="h-7 w-7 rounded-full bg-gradient-primary text-foreground flex items-center justify-center text-xs font-bold shadow-soft">
                      {profile?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm font-semibold">{profile?.name?.split(" ")[0] ?? "Profile"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="text-foreground font-semibold">{profile?.points ?? 0} points</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="text-foreground cursor-pointer">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

        {/* ── Mobile controls ── */}
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

      {/* ── Mobile menu ── */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-3 flex flex-col gap-1">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={(e) => {
                  setOpen(false);
                  if (it.to === "/#projects") {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      navigate("/#projects");
                      return;
                    }
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-smooth",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                <it.icon className="h-4 w-4" /> {it.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => { setOpen(false); navigate("/profile"); }}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-left text-foreground/70 hover:text-foreground hover:bg-secondary transition-smooth"
                >
                  <User className="h-4 w-4" /> Profile
                </button>
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-left text-destructive hover:bg-destructive/10 transition-smooth"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="ghost"
                  className="flex-1 text-foreground font-semibold"
                  onClick={() => { setOpen(false); navigateDashboard(); }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-foreground font-semibold"
                  onClick={() => { setOpen(false); navigate("/login"); }}
                >
                  Log in
                </Button>
                <Button
                  className="flex-1 btn-yellow font-semibold"
                  onClick={() => { setOpen(false); navigate("/register"); }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );
}
