import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PostFormProps {
  onSubmit: (data: { title: string; content: string; tags: string[] }) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function PostForm({ onSubmit, onCancel, isSubmitting }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await onSubmit({ title, content, tags });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground flex items-center gap-2">
          Title
          <span className="text-xs font-normal text-muted-foreground">(Be specific and clear)</span>
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., How to handle complex state in React?"
          className="bg-background/50 border-border focus:border-primary/50 text-lg font-bold py-6"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe your question or idea in detail..."
          className="bg-background/50 border-border focus:border-primary/50 min-h-[200px] resize-y"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-foreground">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <Badge key={tag} className="gap-1 bg-primary/10 text-primary border-primary/20">
              #{tag}
              <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags (press Enter)..."
          className="bg-background/50 border-border"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          Earn 5 points for every new discussion post!
        </p>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20"
          >
            {isSubmitting ? "Posting..." : "Create Post"}
            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
