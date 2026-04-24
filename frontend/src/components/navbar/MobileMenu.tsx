import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";

interface MobileMenuProps {
  navItems: NavItem[];
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigateDashboard: () => void;
}

export const MobileMenu = ({ navItems, isLoggedIn, onClose, onLogout, onNavigateDashboard }: MobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="md:hidden border-t border-border bg-background animate-fade-in">
      <div className="container py-3 flex flex-col gap-1">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            onClick={(e) => {
              onClose();
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
        {isLoggedIn ? (
          <>
            <button
              onClick={() => { onClose(); navigate("/profile"); }}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-left text-foreground/70 hover:text-foreground hover:bg-secondary transition-smooth"
            >
              <User className="h-4 w-4" /> Profile
            </button>
            <button
              onClick={() => { onClose(); onLogout(); }}
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
              onClick={() => { onClose(); onNavigateDashboard(); }}
            >
              Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-foreground font-semibold"
              onClick={() => { onClose(); navigate("/login"); }}
            >
              Log in
            </Button>
            <Button
              className="flex-1 btn-yellow font-semibold"
              onClick={() => { onClose(); navigate("/register"); }}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
