interface QuickRepliesProps {
  onReplyClick: (reply: string) => void;
}

const quickReplies = [
  "How do I upload materials?",
  "How do I calculate GPA?",
  "How to earn points?",
  "Where are my bookmarks?",
  "How does approval work?",
  "How to chat with others?",
];

export function QuickReplies({ onReplyClick }: QuickRepliesProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {quickReplies.map((reply) => (
        <button
          key={reply}
          onClick={() => onReplyClick(reply)}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}