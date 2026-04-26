import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDiscussionPosts, createDiscussionPost, DiscussionPost, subscribeToPosts } from "@/services/discussionService";
import { DiscussionCard } from "@/components/discussions/DiscussionCard";
import { PostForm } from "@/components/discussions/PostForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Plus, Search, Filter, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Discussions = () => {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getDiscussionPosts();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load discussions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const subscription = subscribeToPosts((payload) => {
      if (payload.eventType === 'INSERT') {
        setPosts(prev => [payload.new as DiscussionPost, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new as DiscussionPost : p));
      } else if (payload.eventType === 'DELETE') {
        setPosts(prev => prev.filter(p => p.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchPosts]);

  const handleCreatePost = async (data: { title: string; content: string; tags: string[] }) => {
    if (!user || !profile) {
      toast.error("You must be logged in to post");
      return;
    }

    setIsSubmitting(true);
    try {
      const newPost = await createDiscussionPost({
        authorId: user.id,
        authorName: profile.name,
        title: data.title,
        content: data.content,
        tags: data.tags,
        universityId: profile.university,
        department: profile.department
      });
      
      // Manually add to state for immediate visibility
      setPosts(prev => {
        if (prev.find(p => p.id === newPost.id)) return prev;
        return [newPost, ...prev];
      });

      toast.success("Discussion posted successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-foreground flex items-center gap-3">
            <MessageSquare className="h-10 w-10 text-primary" />
            Discussions
          </h1>
          <p className="text-muted-foreground text-lg">
            Share knowledge, ask questions, and support your fellow students.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-xl shadow-primary/20 gap-2">
              <Plus className="h-5 w-5" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-background/95 backdrop-blur-xl border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                Start a Discussion
              </DialogTitle>
            </DialogHeader>
            <PostForm 
              onSubmit={handleCreatePost} 
              onCancel={() => setIsDialogOpen(false)} 
              isSubmitting={isSubmitting} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions, questions, or tags..." 
            className="pl-11 h-12 bg-card/50 border-border focus:ring-primary/20 text-lg shadow-sm"
          />
        </div>
        <Button variant="outline" className="h-12 px-6 gap-2 border-border bg-card/50">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading discussions...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground">
            <Search className="h-10 w-10 opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">No discussions found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any discussions matching your search. Be the first to start one!
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="font-bold border-primary text-primary hover:bg-primary/5">
            Start a new discussion
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <DiscussionCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Discussions;
