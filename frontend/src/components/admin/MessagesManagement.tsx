import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MessageSquare, Trash2 } from "lucide-react";
import { Message } from "@/types/admin";

interface MessagesManagementProps {
  messages: Message[];
  onDeleteMessage: (messageId: string) => void;
}

export function MessagesManagement({ messages, onDeleteMessage }: MessagesManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(message => 
    message.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.receiverName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Messages Management</h2>
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Messages Found</h3>
            <p className="text-muted-foreground">
              {messages.length === 0 
                ? "No messages have been sent in the system yet." 
                : "No messages match your current search criteria."
              }
            </p>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={message.type === 'material_message' ? 'default' : 'secondary'}>
                      {message.type === 'material_message' ? 'Material' : 'Direct'}
                    </Badge>
                    {!message.read && <Badge variant="destructive">Unread</Badge>}
                  </div>
                  <p className="text-sm">
                    <strong>{message.senderName}</strong> → <strong>{message.receiverName}</strong>
                  </p>
                  {message.materialTitle && (
                    <p className="text-xs text-muted-foreground">
                      Re: {message.materialTitle}
                    </p>
                  )}
                  <p className="text-sm mt-2">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Message</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this message? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteMessage(message.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
}