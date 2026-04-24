import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { NotificationDoc } from "./types";

interface NotificationsMenuProps {
  notifications: NotificationDoc[];
  unreadCount: number;
  onMarkRead: (id: string) => void;
}

export const NotificationsMenu = ({ notifications, unreadCount, onMarkRead }: NotificationsMenuProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground/60 hover:text-foreground hover:bg-secondary">
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="text-foreground font-semibold">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0
          ? <div className="px-3 py-6 text-center text-sm text-muted-foreground">No notifications yet</div>
          : notifications.slice(0, 8).map((n) => (
              <DropdownMenuItem
                key={n.id}
                onClick={() => {
                  onMarkRead(n.id);
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
  );
};
