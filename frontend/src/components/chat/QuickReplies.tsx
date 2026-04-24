interface QuickRepliesProps {
  onReplyClick: (reply: string) => void;
}

const quickReplies = [
  "What is 25% of 80?",
  "How do I calculate GPA?",
  "Explain sorting algorithms",
  "What is Big O notation?",
  "Help me with quadratic equations",
  "Study tips for exams",
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