import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  Calculator, 
  Globe, 
  Upload, 
  Shield, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const { user, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1280);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) setCollapsed(true);
      else setCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAdmin = profile?.role === "admin";

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/materials", label: "Materials", icon: BookOpen },
    { to: "/freshman-courses", label: "Freshman Hub", icon: GraduationCap },
    { to: "/discussions", label: "Discussions", icon: MessageSquare },
    { to: "/global-chat", label: "Global Chat", icon: Globe },
    { to: "/gpa-calculator", label: "GPA Calculator", icon: Calculator },
    { to: "/upload", label: "Upload Material", icon: Upload },
    ...(isAdmin ? [{ to: "/admin", label: "Admin Panel", icon: Shield, admin: true }] : []),
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const width = collapsed ? "80px" : "280px";
    document.documentElement.style.setProperty('--sidebar-width', width);
  }, [collapsed]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  useEffect(() => {
    const handleToggle = () => setMobileOpen(prev => !prev);
    document.addEventListener('toggle-sidebar', handleToggle);
    return () => document.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

  if (!user) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 280,
          x: mobileOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        className={cn(
          "fixed top-0 left-0 h-screen bg-card border-r border-border z-50 flex flex-col transition-all duration-300 ease-in-out",
          mobileOpen ? "shadow-2xl" : "shadow-none"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">EduNexus</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mx-auto">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {!collapsed && (
            <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Navigation</p>
          )}
          
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed ? "mx-auto" : "")} />
                  {!collapsed && <span>{item.label}</span>}
                  {isActive && !collapsed && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                    />
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/50">
          {!collapsed && profile && (
            <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-muted-foreground">Level UP</span>
                  <span className="text-sm font-extrabold text-foreground">{profile.points} Points</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(profile.points % 100)}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          )}

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl px-4 py-3",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-bold">Sign Out</span>}
          </Button>
        </div>
      </motion.aside>
    </>
  );
}
