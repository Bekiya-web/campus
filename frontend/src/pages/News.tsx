import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  getNewsPosts, 
  getFeaturedNews, 
  NewsPost, 
  NewsCategory,
  subscribeToNews 
} from "@/services/newsService";
import { NewsCard } from "@/components/news/NewsCard";
import { FeaturedNewsCarousel } from "@/components/news/FeaturedNewsCarousel";
import { NewsFilters } from "@/components/news/NewsFilters";
import { Button } from "@/components/ui/button";
import { Newspaper, Plus, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const News = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsPost[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<NewsCategory | 'all'>('all');
  const [university, setUniversity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = profile?.role === 'admin';

  const fetchNews = useCallback(async () => {
    try {
      const filters: Record<string, string> = {};
      if (category !== 'all') filters.category = category;
      if (university !== 'all') filters.university = university;
      if (searchQuery) filters.search = searchQuery;

      const [newsData, featuredData] = await Promise.all([
        getNewsPosts(filters, 50),
        getFeaturedNews(5)
      ]);

      setNews(newsData);
      setFeaturedNews(featuredData);
    } catch (error) {
      toast.error("Failed to load news");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [category, university, searchQuery]);

  useEffect(() => {
    fetchNews();
    
    const subscription = subscribeToNews((payload) => {
      if (payload.eventType === 'INSERT') {
        setNews(prev => [payload.new as NewsPost, ...prev]);
        if (payload.new.featured) {
          setFeaturedNews(prev => [payload.new as NewsPost, ...prev].slice(0, 5));
        }
      } else if (payload.eventType === 'UPDATE') {
        setNews(prev => prev.map(n => n.id === payload.new.id ? payload.new as NewsPost : n));
        setFeaturedNews(prev => prev.map(n => n.id === payload.new.id ? payload.new as NewsPost : n));
      } else if (payload.eventType === 'DELETE') {
        setNews(prev => prev.filter(n => n.id !== payload.old.id));
        setFeaturedNews(prev => prev.filter(n => n.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchNews]);

  return (
    <div className="container py-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-foreground flex items-center gap-3">
            <Newspaper className="h-10 w-10 text-primary" />
            {t.news.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with admissions, scholarships, events, and deadlines
          </p>
        </div>

        {isAdmin && (
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-xl shadow-primary/20 gap-2">
            <Link to="/news/create">
              <Plus className="h-5 w-5" />
              {t.admin.createNews}
            </Link>
          </Button>
        )}
      </div>

      {/* Featured News Carousel */}
      {featuredNews.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h2 className="text-2xl font-bold">{t.news.featured}</h2>
          </div>
          <FeaturedNewsCarousel news={featuredNews} />
        </div>
      )}

      {/* Filters */}
      <NewsFilters
        category={category}
        university={university}
        searchQuery={searchQuery}
        onCategoryChange={setCategory}
        onUniversityChange={setUniversity}
        onSearchChange={setSearchQuery}
      />

      {/* News Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">{t.common.loading}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground">
            <Newspaper className="h-10 w-10 opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{t.news.noNews}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any news matching your filters. Try adjusting your search.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {news.map((newsItem) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NewsCard news={newsItem} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default News;
