import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Send, Reply, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { sendMessage, getUserMessages, markMessageAsRead, Message } from "@/services/adminService";
import { Material } from "@/services/materialService";

interface MaterialMessagingProps {
  material: Material;
}

export const MaterialMessaging = ({ material }: MaterialMessagingProps) => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadMessages();
    }
  }, [isOpen, user, material.id]);

  const loadMessages = async () => {
    if (!user) return;
    
    try {
      let allMessages: Message[] = [];
      try {
        allMessages = await getUserMessages(user.id);
      } catch (error) {
        console.warn("Failed to load messages:", error);
        allMessages = [];
      }
      
      const materialMessages = allMessages.filter(msg => msg.materialId === material.id);
      setMessages(materialMessages);
      
      // Mark messages as read
      const unreadMessages = materialMessages.filter(msg => !msg.read && msg.receiverId === user.id);
      for (const msg of unreadMessages) {
        try {
          await markMessageAsRead(msg.id);
        } catch (error) {
          console.warn("Failed to mark message as read:", error);
        }
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]); // Set empty array to prevent crashes
    }
  };

  const handleSendMessage = async () => {
    if (!user || !profile || !newMessage.trim()) return;

    setLoading(true);
    try {
      const message = await sendMessage({
        senderId: user.id,
        receiverId: material.uploaderId,
        materialId: material.id,
        content: newMessage.trim(),
        type: 'material_message'
      });

      setMessages(prev => [message, ...prev]);
      setNewMessage("");
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (originalMessage: Message, replyContent: string) => {
    if (!user || !profile || !replyContent.trim()) return;

    try {
      const reply = await sendMessage({
        senderId: user.id,
        receiverId: originalMessage.senderId,
        materialId: material.id,
        content: replyContent.trim(),
        type: 'material_message'
      });

      setMessages(prev => [reply, ...prev]);
      toast.success("Reply sent successfully!");
    } catch (error) {
      toast.error("Failed to send reply");
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  const materialMessages = messages.filter(msg => msg.materialId === material.id);
  const unreadCount = materialMessages.filter(msg => !msg.read && msg.receiverId === user.id).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <MessageSquare className="h-4 w-4 mr-2" />
          Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages for "{material.title}"
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Send new message */}
          {user.id !== material.uploaderId && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Send message to uploader</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={loading || !newMessage.trim()}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          )}

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {materialMessages.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground">
                  Start a conversation about this material
                </p>
              </Card>
            ) : (
              materialMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  currentUserId={user.id}
                  onReply={handleReply}
                />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface MessageCardProps {
  message: Message;
  currentUserId: string;
  onReply: (message: Message, content: string) => void;
}

const MessageCard = ({ message, currentUserId, onReply }: MessageCardProps) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isOwnMessage = message.senderId === currentUserId;

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    
    setLoading(true);
    try {
      await onReply(message, replyContent);
      setReplyContent("");
      setShowReply(false);
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`p-4 ${isOwnMessage ? 'ml-8 bg-blue-50 dark:bg-blue-950' : 'mr-8'}`}>
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{message.senderName}</span>
            {isOwnMessage && <Badge variant="secondary" className="text-xs">You</Badge>}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-sm">{message.content}</p>
          
          {!isOwnMessage && (
            <div className="mt-2">
              {!showReply ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReply(true)}
                  className="text-xs"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              ) : (
                <div className="space-y-2 mt-2">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={loading || !replyContent.trim()}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowReply(false);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};