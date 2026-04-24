import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

interface LogoProps {
  isLoggedIn: boolean;
}

export const Logo = ({ isLoggedIn }: LogoProps) => {
  return (
    <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2.5 group shrink-0">
      <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft transition-smooth">
        <GraduationCap className="h-5 w-5 text-white" />
      </div>
      <span className="font-extrabold text-lg tracking-tight text-foreground">EduNexus</span>
    </Link>
  );
};
