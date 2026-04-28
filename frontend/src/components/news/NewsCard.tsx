import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NewsPost, toggleSaveNews, checkIfSaved } from "@/services/newsService";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  ExternalLink,
  GraduationCap,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow, format, isPast } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface NewsCardProps {
  news: NewsPost;
}

const categoryConfig = {
  admission: { color: "bg-blue-500", label: "Admission", icon: GraduationCap },
  scholarship: { color: "bg-green-500", label: "Scholarship", icon: "💰" },
  event: { color: "bg-purple-500", label: "Event", icon: Calendar },
  deadline: { color: "bg-red-500", label: "Deadline", icon: AlertCircle },
  announcement: { color: "bg-orange-500", label: "Announcement", icon: "📢" }
};

export function NewsCard({ news }: NewsCardProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(news.savesCount);
  const [isLoading, setIsLoading] = useState(false);

  const config = categoryConfig[news.category];
  const hasDeadline = news.deadline && !isPast(new Date(news.deadline));
  const hasEvent = news.eventDate && !isPast(new Date(news.eventDate));

  useEffect(() => {
    if (user) {
      checkIfSaved(news.id, user.id).then(setIsSaved);
    }
  }, [news.id, user]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to save news");
      return;
    }

    setIsLoading(true);
    try {
      const saved = await toggleSaveNews(news.id, user.id);
      setIsSaved(saved);
      setSavesCount(prev => saved ? prev + 1 : prev - 1);
      toast.success(saved ? "News saved!" : "News unsaved");
    } catch (error) {
      toast.error("Failed to save news");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={`/news/${news.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        {news.imageUrl ? (
          <div className="relative h-48 overflow-hidden bg-secondary">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${config.color} text-white border-0 shadow-lg`}>
                {typeof config.icon === 'string' ? config.icon : <config.icon className="h-3 w-3 mr-1" />}
                {config.label}
              </Badge>
            </div>
            {news.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
                  ⭐ Featured
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <div className={`relative h-32 ${config.color} bg-opacity-10 flex items-center justify-center`}>
            <div className="text-6xl opacity-20">
              {typeof config.icon === 'string' ? config.icon : <config.icon className="h-16 w-16" />}
            </div>
            <div className="absolute top-3 left-3">
              <Badge className={`${config.color} text-white border-0 shadow-lg`}>
                {config.label}
              </Badge>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* University */}
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">{news.universityName}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h3>

          {/* Summary */}
          {news.summary && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {news.summary}
            </p>
          )}

          {/* Deadline/Event Date */}
          {hasDeadline && (
            <div className="flex items-center gap-2 mb-3 text-sm text-red-600 dark:text-red-400 font-bold">
              <Clock className="h-4 w-4" />
              <span>Deadline: {format(new Date(news.deadline!), 'MMM dd, yyyy')}</span>
            </div>
          )}

          {hasEvent && (
            <div className="flex items-center gap-2 mb-3 text-sm text-purple-600 dark:text-purple-400 font-bold">
              <Calendar className="h-4 w-4" />
              <span>Event: {format(new Date(news.eventDate!), 'MMM dd, yyyy')}</span>
            </div>
          )}

          {/* Tags */}
          {news.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {news.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{news.viewsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="h-3.5 w-3.5" />
                <span>{savesCount}</span>
              </div>
              <span>{formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}</span>
            </div>

            <div className="flex items-center gap-2">
              {news.externalLink && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(news.externalLink!, '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleSave}
                disabled={isLoading}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4 text-primary fill-current" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
