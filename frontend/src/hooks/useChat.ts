import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { 
  getUserMessages, 
  sendMessage as sendMessageService, 
  markMessageAsRead, 
  getAllUsers,
  Message 
} from "@/services/adminService";
import { UserProfile } from "@/services/authService";

interface ChatUser extends UserProfile {
  lastMessage?: Message;
  unreadCount: number;
  isOnline?: boolean;
}

export function useChat(userId: string | undefined) {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      const allUsers = await getAllUsers();
      const currentUserMessages = await getUserMessages(userId || '');
      
      // Transform users into chat users with message info
      const chatUsers: ChatUser[] = allUsers
        .filter(u => u.uid !== userId) // Exclude current user
        .map(user => {
          const userMessages = currentUserMessages.filter(
            msg => msg.senderId === user.uid || msg.receiverId === user.uid
          );
          
          const lastMessage = userMessages.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0];
          
          const unreadCount = userMessages.filter(
            msg => msg.receiverId === userId && !msg.read
          ).length;
          
          return {
            ...user,
            lastMessage,
            unreadCount,
            isOnline: Math.random() > 0.5 // Mock online status
          };
        })
        .sort((a, b) => {
          // Sort by last message time, then by name
          if (a.lastMessage && b.lastMessage) {
            return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
          }
          if (a.lastMessage) return -1;
          if (b.lastMessage) return 1;
          return (a.name || '').localeCompare(b.name || '');
        });
      
      setUsers(chatUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error("Failed to load chat users");
    }
  }, [userId]);

  const loadMessages = useCallback(async () => {
    if (!selectedUser || !userId) return;
    
    try {
      const allMessages = await getUserMessages(userId);
      const conversationMessages = allMessages.filter(
        msg => 
          (msg.senderId === userId && msg.receiverId === selectedUser.uid) ||
          (msg.senderId === selectedUser.uid && msg.receiverId === userId)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      
      setMessages(conversationMessages);
      
      // Mark messages as read
      const unreadMessages = conversationMessages.filter(
        msg => msg.receiverId === userId && !msg.read
      );
      
      for (const msg of unreadMessages) {
        await markMessageAsRead(msg.id);
      }
      
      // Update user's unread count
      setUsers(prev => prev.map(u => 
        u.uid === selectedUser.uid ? { ...u, unreadCount: 0 } : u
      ));
      
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error("Failed to load messages");
    }
  }, [selectedUser, userId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !userId) return;
    
    try {
      const message = await sendMessageService({
        senderId: userId,
        receiverId: selectedUser.uid,
        content: newMessage.trim(),
        type: 'direct_message'
      });
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Update user's last message
      setUsers(prev => prev.map(u => 
        u.uid === selectedUser.uid 
          ? { ...u, lastMessage: message }
          : u
      ));
      
      toast.success("Message sent successfully");
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error("Failed to send message");
    }
  };

  const selectUser = (user: ChatUser) => {
    setSelectedUser(user);
    setMessages([]); // Clear messages while loading
  };

  useEffect(() => {
    if (userId) {
      loadUsers();
    }
  }, [userId, loadUsers]);

  useEffect(() => {
    if (selectedUser) {
      loadMessages();
    }
  }, [selectedUser, userId, loadMessages]);

  useEffect(() => {
    if (userId) {
      setLoading(false);
    }
  }, [userId]);

  return {
    users,
    selectedUser,
    messages,
    newMessage,
    loading,
    setNewMessage,
    selectUser,
    sendMessage,
    refetch: loadUsers
  };
}