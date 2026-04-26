import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navbar";

interface DesktopNavProps {
  navItems: NavItem[];
}

export const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
  );
};
