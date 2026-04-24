import { Badge } from "@/components/ui/badge";

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  type?: "calculation" | "theory" | "general";
};

interface ChatMessageProps {
  message: ChatMessage;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const getMessageBadge = (type?: string) => {
    switch (type) {
      case "calculation":
        return <Badge variant="secondary" className="text-xs mb-1">🧮 Math</Badge>;
      case "theory":
        return <Badge variant="outline" className="text-xs mb-1">📚 Theory</Badge>;
      default:
        return <Badge variant="default" className="text-xs mb-1">💡 General</Badge>;
    }
  };

  return (
    <div
      key={`${message.role}-${index}`}
      className={`${
        message.role === "assistant" ? "flex flex-col" : "ml-auto max-w-[85%]"
      }`}
    >
      {message.role === "assistant" && message.type && (
        <div className="flex items-center gap-1 mb-1">
          {getMessageBadge(message.type)}
        </div>
      )}
      <div
        className={`rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
          message.role === "assistant"
            ? "bg-secondary text-foreground"
            : "bg-gradient-to-r from-green-600 to-blue-600 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}