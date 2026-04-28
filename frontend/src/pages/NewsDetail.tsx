import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getNewsById, 
  toggleSaveNews, 
  checkIfSaved, 
  trackNewsView,
  deleteNewsPost,
  NewsPost 
} from "@/services/newsService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  GraduationCap,
  Share2,
  Trash2,
  Edit,
  Loader2
} from "lucide-react";
import { format, isPast } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categoryConfig = {
  admission: { color: "bg-blue-500", label: "Admission" },
  scholarship: { color: "bg-green-500", label: "Scholarship" },
  event: { color: "bg-purple-500", label: "Event" },
  deadline: { color: "bg-red-500", label: "Deadline" },
  announcement: { color: "bg-orange-500", label: "Announcement" }
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [news, setNews] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const data = await getNewsById(id);
        if (!data) {
          toast.error("News not found");
          navigate("/news");
          return;
        }
        setNews(data);
        setSavesCount(data.savesCount);

        // Track view
        if (user) {
          trackNewsView(id, user.id);
        }

        // Check if saved
        if (user) {
          const saved = await checkIfSaved(id, user.id);
          setIsSaved(saved);
        }
      } catch (error) {
        toast.error("Failed to load news");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, user, navigate]);

  const handleSave = async () => {
    if (!user || !id) {
      toast.error("Please login to save news");
      return;
    }

    try {
      const saved = await toggleSaveNews(id, user.id);
      setIsSaved(saved);
      setSavesCount(prev => saved ? prev + 1 : prev - 1);
      toast.success(saved ? "News saved!" : "News unsaved");
    } catch (error) {
      toast.error("Failed to save news");
    }
  };

  const handleDelete = async () => {
    if (!id || !isAdmin) return;

    setIsDeleting(true);
    try {
      await deleteNewsPost(id);
      toast.success("News deleted successfully");
      navigate("/news");
    } catch (error) {
      toast.error("Failed to delete news");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        text: news?.summary || news?.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading news...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">News not found</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/news">Back to News</Link>
        </Button>
      </div>
    );
  }

  const config = categoryConfig[news.category];
  const hasDeadline = news.deadline && !isPast(new Date(news.deadline));
  const hasEvent = news.eventDate && !isPast(new Date(news.eventDate));

  return (
    <div className="container py-8 max-w-4xl">
      <Link 
        to="/news" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </Link>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header Image */}
        {news.imageUrl && (
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={`${config.color} text-white border-0 shadow-lg`}>
            {config.label}
          </Badge>
          {news.featured && (
            <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
              ⭐ Featured
            </Badge>
          )}
          {news.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-foreground leading-tight">
          {news.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border/50">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="h-5 w-5" />
            <span className="font-bold">{news.universityName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{news.viewsCount} views</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Bookmark className="h-4 w-4" />
            <span>{savesCount} saves</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{format(new Date(news.createdAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>

        {/* Deadline/Event Alert */}
        {(hasDeadline || hasEvent) && (
          <Card className="p-6 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <div className="space-y-2">
              {hasDeadline && (
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                  <Clock className="h-6 w-6" />
                  <div>
                    <p className="font-bold text-lg">Application Deadline</p>
                    <p className="text-2xl font-extrabold">{format(new Date(news.deadline!), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
              )}
              {hasEvent && (
                <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                  <Calendar className="h-6 w-6" />
                  <div>
                    <p className="font-bold text-lg">Event Date</p>
                    <p className="text-2xl font-extrabold">{format(new Date(news.eventDate!), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {news.content}
          </p>
        </div>

        {/* External Link */}
        {news.externalLink && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg mb-1">Official Announcement</p>
                <p className="text-sm text-muted-foreground">Visit the official page for more details</p>
              </div>
              <Button asChild className="gap-2">
                <a href={news.externalLink} target="_blank" rel="noopener noreferrer">
                  Visit Page
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
          <Button 
            variant={isSaved ? "default" : "outline"} 
            onClick={handleSave}
            className="gap-2 font-bold"
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {isSaved ? 'Saved' : 'Save for Later'}
          </Button>

          <Button variant="outline" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          {isAdmin && (
            <>
              <Button variant="outline" asChild className="gap-2">
                <Link to={`/news/edit/${news.id}`}>
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </Button>

              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </div>
      </motion.article>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete News Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this news post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsDetail;
