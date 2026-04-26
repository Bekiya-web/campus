import { DiscussionPost } from "@/services/discussionService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface DiscussionCardProps {
  post: DiscussionPost;
}

export function DiscussionCard({ post }: DiscussionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/discussions/${post.id}`}>
        <Card className="p-6 h-full border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md bg-card/50 backdrop-blur-sm group">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">{post.authorName}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              {post.department && (
                <Badge variant="secondary" className="ml-auto text-[10px] bg-secondary/50 text-secondary-foreground font-semibold">
                  {post.department}
                </Badge>
              )}
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
              {post.content}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags?.map(tag => (
                <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 border-primary/20 text-primary">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border/50 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <ThumbsUp className="h-4 w-4 group-hover:text-blue-500 transition-colors" />
                <span>{post.likesCount}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <MessageSquare className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
