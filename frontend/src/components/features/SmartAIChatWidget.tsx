import { useMemo, useState } from "react";
import { Bot, SendHorizontal, X, Sparkles, Minimize2 } from "lucide-react";
import { buildReply } from "@/services/smartAI";
import { QuickReplies } from "@/components/chat/QuickReplies";

type ChatMessageType = {
  role: "user" | "assistant";
  text: string;
  type?: "calculation" | "theory" | "general";
};

export function SmartAIChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      text: "Hello! I'm your EduNexus AI assistant. I'm here to help you navigate the platform, find study materials, calculate your GPA, and understand our rewards system. How can I help you today?",
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Outer ring animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 animate-ping opacity-75" />
          
          {/* Main button */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-violet-500/50">
            <Bot className="w-8 h-8 text-white" strokeWidth={2.5} />
            
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>
      </button>
    );
  }

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 hover:shadow-violet-500/20 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">AI Assistant</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Click to expand</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[440px] max-w-[calc(100vw-3rem)]">
      <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Modern Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
                <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
              
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-semibold text-xs shadow-md">
                  You
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <QuickReplies onReplyClick={sendMessage} />
        </div>

        {/* Modern Input Area */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI Assistant..."
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none text-sm transition-all"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              {input && (
                <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                  Press Enter to send
                </div>
              )}
            </div>
            
            <button
              onClick={() => sendMessage(input)}
              disabled={disabled}
              className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                disabled
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
              aria-label="Send message"
            >
              <SendHorizontal className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Sparkles className="w-3 h-3" />
            <span>Powered by EduNexus AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
