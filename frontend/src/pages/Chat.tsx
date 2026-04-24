import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { ChatUserList } from "@/components/chat/ChatUserList";
import { ChatMessages } from "@/components/chat/ChatMessages";

const Chat = () => {
  const { user } = useAuth();
  const {
    users,
    selectedUser,
    messages,
    newMessage,
    loading,
    setNewMessage,
    selectUser,
    sendMessage
  } = useChat(user?.id);

  if (!user) {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-muted-foreground">You need to be signed in to access the chat.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading chat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          Chat
        </h1>
        <p className="text-muted-foreground mt-1">Connect with other students and share knowledge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChatUserList
            users={users}
            selectedUser={selectedUser}
            onUserSelect={selectUser}
          />
        </div>
        
        <div className="lg:col-span-2">
          <ChatMessages
            selectedUser={selectedUser}
            messages={messages}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            currentUserId={user.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;