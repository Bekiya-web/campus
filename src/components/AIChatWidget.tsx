import { useMemo, useState } from "react";
import { Bot, MessageCircleMore, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const quickReplies = [
  "How can I upload my material?",
  "How do points and badges work?",
  "How can I find materials faster?",
];

function buildReply(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("upload")) {
    return "Open Upload from the top menu, fill in title/course/university, then submit your file. You earn points when your upload helps others.";
  }
  if (q.includes("point") || q.includes("badge")) {
    return "You collect points by uploading quality notes and helping classmates. Higher contributions unlock badges and better profile visibility.";
  }
  if (q.includes("search") || q.includes("find")) {
    return "Use the Materials page filters (university, department, year, course) to quickly narrow results and save useful items for later.";
  }
  if (q.includes("chat") || q.includes("community")) {
    return "Use the chat space to exchange information, ask about exams, and coordinate study groups with students from your university.";
  }
  return "I can help with uploads, materials search, points, and study guidance. Ask a specific question and I will give you a focused answer.";
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I am your AI campus assistant. Ask me about materials, uploads, points, or study support.",
    },
  ]);

  const disabled = useMemo(() => input.trim().length === 0, [input]);

  const sendMessage = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    setMessages((prev) => [...prev, { role: "user", text: cleaned }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: buildReply(cleaned) }]);
    }, 350);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[92vw] max-w-sm rounded-2xl border border-border bg-card p-4 shadow-elegant">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Bot className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Campus Assistant</p>
                <p className="text-xs text-muted-foreground">Instant answers for students</p>
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

          <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-border bg-background p-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-secondary text-foreground"
                    : "ml-auto max-w-[85%] bg-gradient-primary text-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
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
      ) : (
        <Button onClick={() => setOpen(true)} className="btn-yellow rounded-full px-5 font-semibold shadow-elegant">
          <MessageCircleMore className="mr-2 h-4 w-4" />
          AI Chat
        </Button>
      )}
    </div>
  );
}
