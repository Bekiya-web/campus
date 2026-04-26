import { DiscussionComment } from "@/services/discussionService";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Reply, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommentItemProps {
  comment: DiscussionComment;
  allComments: DiscussionComment[];
  onReply: (parentId: string, content: string) => Promise<void>;
  level?: number;
}

export function CommentItem({ comment, allComments, onReply, level = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const replies = allComments.filter(c => c.parentId === comment.id);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment.id, replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className={`flex flex-col ${level > 0 ? 'ml-8 mt-4 border-l-2 border-border/50 pl-4' : 'mt-6'}`}>
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-foreground">{comment.authorName}</span>
            <span className="text-[10px] text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsReplying(!isReplying)}
              className="h-7 px-2 text-[11px] font-bold text-muted-foreground hover:text-primary gap-1"
            >
              <Reply className="h-3 w-3" />
              Reply
            </Button>
          </div>

          <AnimatePresence>
            {isReplying && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex flex-col gap-2 p-3 bg-secondary/30 rounded-xl border border-border/50">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${comment.authorName}...`}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm min-h-[60px] resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsReplying(false)} className="h-8 text-xs">Cancel</Button>
                    <Button size="sm" onClick={handleReplySubmit} className="h-8 text-xs bg-primary text-primary-foreground font-bold px-4">Post Reply</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {replies.map(reply => (
        <CommentItem 
          key={reply.id} 
          comment={reply} 
          allComments={allComments} 
          onReply={onReply} 
          level={level + 1} 
        />
      ))}
    </div>
  );
}
