import { useMemo, useState } from "react";
import { Bot, MessageCircleMore, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildReply } from "@/services/smartAI";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { QuickReplies } from "@/components/chat/QuickReplies";

type ChatMessageType = {
  role: "user" | "assistant";
  text: string;
  type?: "calculation" | "theory" | "general";
};

export function SmartAIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      text: "Hello! I'm your smart AI assistant. I can understand natural language and help with calculations, computer science, study tips, and platform guidance. Just ask me anything naturally!",
      type: "general"
    },
  ]);

  const disabled = useMemo(() => input.trim().length === 0, [input]);

  const sendMessage = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    setMessages((prev) => [...prev, { role: "user", text: cleaned }]);
    setInput("");

    setTimeout(() => {
      const response = buildReply(cleaned);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: response.text,
        type: response.type
      }]);
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setOpen(true)} 
          className="btn-yellow rounded-full px-5 font-semibold shadow-elegant"
        >
          <MessageCircleMore className="mr-2 h-4 w-4" />
          Smart AI
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-[92vw] max-w-md rounded-2xl border border-border bg-card p-4 shadow-elegant">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-blue-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Smart AI Assistant</p>
              <p className="text-xs text-muted-foreground">Natural language understanding</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Close AI assistant"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 space-y-3 overflow-y-auto rounded-xl border border-border bg-background p-3">
          {messages.map((message, index) => (
            <ChatMessage key={`${message.role}-${index}`} message={message} index={index} />
          ))}
        </div>

        <QuickReplies onReplyClick={sendMessage} />

        <div className="mt-3 flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything naturally..."
            onKeyDown={handleKeyDown}
          />
          <Button
            className="btn-yellow h-10 w-10 p-0"
            disabled={disabled}
            onClick={() => sendMessage(input)}
            aria-label="Send message"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}