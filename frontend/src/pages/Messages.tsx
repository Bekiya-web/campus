import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Send, 
  Reply, 
  Clock, 
  User,
  Plus,
  Inbox
} from "lucide-react";
import { toast } from "sonner";
import { 
  getUserMessages, 
  sendMessage, 
  markMessageAsRead, 
  getAllUsers,
  Message 
} from "@/services/adminService";
import { UserProfile } from "@/services/authService";

const Messages = () => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMessages();
      loadUsers();
    }
  }, [user]);

  const loadMessages = async () => {
    if (!user) return;
    
    try {
      const userMessages = await getUserMessages(user.id);
      setMessages(userMessages.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers.filter(u => u.uid !== user?.id));
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleMarkAsRead = async (message: Message) => {
    if (message.read || message.receiverId !== user?.id) return;
    
    try {
      await markMessageAsRead(message.id);
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const handleReply = async (originalMessage: Message, content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      await sendMessage({
        senderId: user.id,
        receiverId: originalMessage.senderId,
        content: content.trim(),
        type: 'direct_message'
      });
      
      toast.success("Reply sent successfully");
      loadMessages(); // Refresh messages
    } catch (error) {
      console.error('Failed to send reply:', error);
      toast.error("Failed to send reply");
    }
  };

  if (!user) {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground">You need to be signed in to access messages.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading messages...</span>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read && m.receiverId === user.id).length;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Inbox className="h-8 w-8 text-blue-600" />
              Messages
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">View and manage your messages</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use the Chat page for real-time messaging with other users.
                </p>
                <Button 
                  onClick={() => window.location.href = '/chat'}
                  className="w-full"
                >
                  Go to Chat
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Your Messages</h2>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Messages</h3>
                    <p className="text-muted-foreground">
                      You haven't received any messages yet. Start a conversation in the Chat section!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <Card 
                      key={message.id} 
                      className={`p-4 cursor-pointer transition-colors ${
                        !message.read && message.receiverId === user.id
                          ? "border-blue-500 bg-blue-50/50"
                          : "hover:bg-secondary/50"
                      } ${
                        selectedMessage?.id === message.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => {
                        setSelectedMessage(message);
                        handleMarkAsRead(message);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {message.senderName?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">
                              {message.senderId === user.id ? `To: ${message.receiverName}` : `From: ${message.senderName}`}
                            </p>
                            <div className="flex items-center gap-2">
                              {!message.read && message.receiverId === user.id && (
                                <Badge variant="destructive" className="text-xs">New</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {message.type === 'material_message' ? 'Material' : 'Direct'}
                              </Badge>
                            </div>
                          </div>
                          {message.materialTitle && (
                            <p className="text-sm text-muted-foreground mb-1">
                              Re: {message.materialTitle}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            {selectedMessage ? (
              <div className="p-4 h-full flex flex-col">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {selectedMessage.senderName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {selectedMessage.senderId === user.id 
                          ? `To: ${selectedMessage.receiverName}` 
                          : `From: ${selectedMessage.senderName}`
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {selectedMessage.materialTitle && (
                    <Badge variant="outline" className="mb-2">
                      Re: {selectedMessage.materialTitle}
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 mb-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
                
                {selectedMessage.senderId !== user.id && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="sm">
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reply to {selectedMessage.senderName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-3 bg-secondary rounded-lg">
                          <p className="text-sm text-muted-foreground">Original message:</p>
                          <p className="text-sm mt-1">{selectedMessage.content}</p>
                        </div>
                        <Input
                          placeholder="Type your reply..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const target = e.target as HTMLInputElement;
                              handleReply(selectedMessage, target.value);
                              target.value = '';
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground">
                          Press Enter to send or use the Chat page for real-time messaging.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a Message</h3>
                  <p className="text-muted-foreground">
                    Choose a message from the list to view details
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;