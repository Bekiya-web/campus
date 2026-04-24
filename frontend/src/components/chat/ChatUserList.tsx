import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Users, Circle } from "lucide-react";
import { UserProfile } from "@/services/authService";
import { Message } from "@/services/adminService";

interface ChatUser extends UserProfile {
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

interface ChatUserListProps {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  onUserSelect: (user: ChatUser) => void;
}

export function ChatUserList({ users, selectedUser, onUserSelect }: ChatUserListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Users className="h-5 w-5" />
          Chat Users
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {users.length === 0 ? "No users available for chat" : "No users match your search"}
              </p>
            </div>
          ) : (
            filteredUsers.map((chatUser) => (
              <div
                key={chatUser.uid}
                onClick={() => onUserSelect(chatUser)}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  selectedUser?.uid === chatUser.uid
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {chatUser.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {chatUser.isOnline && (
                      <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chatUser.name}</p>
                      {chatUser.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {chatUser.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chatUser.lastMessage?.content || "No messages yet"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chatUser.universityName} • {chatUser.department}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}