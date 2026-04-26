import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCircle, XCircle, Clock, BookOpen, CheckCheck } from "lucide-react";
import { NotificationDoc } from "@/types/navbar";
import { markAllNotificationsRead } from "@/services/notificationService";

interface NotificationsMenuProps {
  notifications: NotificationDoc[];
  unreadCount: number;
  onMarkRead: (id: string) => void;
}

const typeIcon = (type: string) => {
  if (type === "material_approved") return <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />;
  if (type === "material_rejected") return <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />;
  if (type === "pending_material") return <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />;
  return <BookOpen className="h-4 w-4 text-blue-500 flex-shrink-0" />;
};

const typeColor = (type: string) => {
  if (type === "material_approved") return "bg-green-50 dark:bg-green-900/20 border-l-2 border-green-400";
  if (type === "material_rejected") return "bg-red-50 dark:bg-red-900/20 border-l-2 border-red-400";
  if (type === "pending_material") return "bg-orange-50 dark:bg-orange-900/20 border-l-2 border-orange-400";
  return "";
};

export const NotificationsMenu = ({ notifications, unreadCount, onMarkRead }: NotificationsMenuProps) => {
  const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    if (!notifications.length) return;
    const uid = notifications[0]?.uid;
    if (uid) {
      try { await markAllNotificationsRead(uid); } catch (e) { console.error("Failed to mark all as read:", e); }
    }
    notifications.forEach((n) => { if (!n.read) onMarkRead(n.id); });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-foreground/60 hover:text-foreground hover:bg-secondary">
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0 text-foreground font-semibold">
            Notifications {unreadCount > 0 && <span className="ml-1 text-xs text-muted-foreground">({unreadCount} unread)</span>}
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-blue-600" onClick={handleMarkAllRead}>
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <Bell className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-30" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0, 10).map((n) => (
            <DropdownMenuItem
              key={n.id}
              onClick={() => {
                onMarkRead(n.id);
                if (n.materialId) navigate(`/materials/${n.materialId}`);
              }}
              className={`flex items-start gap-3 py-3 px-3 cursor-pointer rounded-md mx-1 my-0.5 ${typeColor(n.type)} ${!n.read ? "font-medium" : "opacity-75"}`}
            >
              {typeIcon(n.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                  <span className="text-sm font-semibold text-foreground truncate">{n.title}</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{n.body}</span>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  {new Date(n.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        )}
        {notifications.length > 10 && (
          <div className="px-3 py-2 text-center border-t">
            <p className="text-xs text-muted-foreground">{notifications.length - 10} more notifications</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
