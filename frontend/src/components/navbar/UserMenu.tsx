import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

interface UserMenuProps {
  userName?: string;
  userPoints?: number;
  onLogout: () => void;
}

export const UserMenu = ({ userName, userPoints, onLogout }: UserMenuProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground hover:bg-secondary px-2.5">
          <div className="h-7 w-7 rounded-full bg-gradient-primary text-foreground flex items-center justify-center text-xs font-bold shadow-soft">
            {userName?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span className="text-sm font-semibold">{userName?.split(" ")[0] ?? "Profile"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-foreground font-semibold">{userPoints ?? 0} points</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")} className="text-foreground cursor-pointer">
          <User className="h-4 w-4 mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")} className="text-foreground cursor-pointer">
          <Settings className="h-4 w-4 mr-2" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
