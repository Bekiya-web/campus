import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getPostById, 
  getPostComments, 
  addDiscussionComment, 
  DiscussionPost, 
  DiscussionComment,
  togglePostLike,
  checkIfLiked,
  subscribeToPostComments,
  deleteDiscussionPost,
  hideDiscussionPost,
  unhideDiscussionPost
} from "@/services/discussionService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommentItem } from "@/components/discussions/CommentItem";
import { 
  ChevronLeft, ThumbsUp, MessageSquare, Clock, User, 
  Share2, MoreVertical, Send, Sparkles, Loader2, Trash2, EyeOff, Eye
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DiscussionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [post, setPost] = useState<DiscussionPost | null>(null);
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
  // Admin controls state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showHideDialog, setShowHideDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [hideDuration, setHideDuration] = useState<string>(""); // in hours
  
  const isAdmin = profile?.role === 'admin';

  const fetchPostAndComments = useCallback(async () => {
    if (!id) return;
    try {
      const [postData, commentsData] = await Promise.all([
        getPostById(id, isAdmin),
        getPostComments(id)
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (error) {
      toast.error("Failed to load discussion");
    } finally {
      setLoading(false);
    }
  }, [id, isAdmin]);

  useEffect(() => {
    if (id) {
      fetchPostAndComments();
      const subscription = subscribeToPostComments(id, (payload) => {
        if (payload.eventType === 'INSERT') {
          setComments(prev => [...prev, payload.new as DiscussionComment]);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [id, fetchPostAndComments]);

  useEffect(() => {
    if (id && user) {
      checkIfLiked(id, user.id).then(setIsLiked);
    }
  }, [id, user]);

  const handleLike = async () => {
    if (!user || !id || !post) {
      toast.error("Please login to like posts");
      return;
    }
    try {
      const liked = await togglePostLike(id, user.id);
      setIsLiked(liked);
      setPost({
        ...post,
        likesCount: liked ? post.likesCount + 1 : post.likesCount - 1
      });
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handlePostComment = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!commentInput.trim() || !id || !user || !profile) return;

    // Check if user is restricted from commenting
    if (profile.canComment === false) {
      toast.error("You have been restricted from commenting by an administrator.");
      return;
    }

    setIsSubmittingComment(true);
    try {
      const newComment = await addDiscussionComment({
        postId: id,
        authorId: user.id,
        authorName: profile.name,
        content: commentInput
      });
      
      // Manually add to state for immediate visibility
      setComments(prev => {
        if (prev.find(c => c.id === newComment.id)) return prev;
        return [...prev, newComment];
      });

      setCommentInput("");
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!id || !user || !profile) return;
    
    // Check if user is restricted from commenting
    if (profile.canComment === false) {
      toast.error("You have been restricted from commenting by an administrator.");
      return;
    }
    
    try {
      const newReply = await addDiscussionComment({
        postId: id,
        authorId: user.id,
        authorName: profile.name,
        content,
        parentId
      });

      // Manually add to state
      setComments(prev => {
        if (prev.find(c => c.id === newReply.id)) return prev;
        return [...prev, newReply];
      });

      toast.success("Reply posted!");
    } catch (error) {
      toast.error("Failed to post reply");
    }
  };

  // Admin Actions
  const handleDeletePost = async () => {
    if (!id || !isAdmin) return;
    
    setIsDeleting(true);
    try {
      await deleteDiscussionPost(id);
      toast.success("Discussion post deleted successfully");
      navigate("/discussions");
    } catch (error) {
      toast.error("Failed to delete post");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleHidePost = async () => {
    if (!id || !isAdmin || !post) return;
    
    setIsHiding(true);
    try {
      let hideUntil: Date | undefined;
      
      if (hideDuration && parseInt(hideDuration) > 0) {
        hideUntil = new Date();
        hideUntil.setHours(hideUntil.getHours() + parseInt(hideDuration));
      }
      
      await hideDiscussionPost(id, hideUntil);
      
      setPost({
        ...post,
        hidden: true,
        hideUntil: hideUntil ? hideUntil.toISOString() : null
      });
      
      toast.success(hideUntil 
        ? `Post hidden for ${hideDuration} hours` 
        : "Post hidden indefinitely"
      );
    } catch (error: any) {
      console.error('Hide post error:', error);
      const errorMessage = error?.message || 'Failed to hide post';
      
      if (errorMessage.includes('column') && errorMessage.includes('does not exist')) {
        toast.error("Database not updated. Please run the migration SQL first. Check console for details.");
        console.error('❌ MIGRATION REQUIRED: Run the SQL in frontend/database/discussions/complete_migration.sql');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsHiding(false);
      setShowHideDialog(false);
      setHideDuration("");
    }
  };

  const handleUnhidePost = async () => {
    if (!id || !isAdmin || !post) return;
    
    try {
      await unhideDiscussionPost(id);
      setPost({
        ...post,
        hidden: false,
        hideUntil: null
      });
      toast.success("Post is now visible to all users");
    } catch (error) {
      toast.error("Failed to unhide post");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading discussion...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Discussion not found</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/discussions">Back to discussions</Link>
        </Button>
      </div>
    );
  }

  const rootComments = comments.filter(c => !c.parentId);

  return (
    <div className="container py-8 max-w-4xl">
      <Link 
        to="/discussions" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Discussions
      </Link>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                #{tag}
              </Badge>
            ))}
            {isAdmin && post.hidden && (
              <Badge variant="destructive" className="bg-orange-600 text-white">
                <EyeOff className="h-3 w-3 mr-1" />
                Hidden {post.hideUntil && `until ${new Date(post.hideUntil).toLocaleString()}`}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{post.authorName}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  {post.department && (
                    <>
                      <span>•</span>
                      <span>{post.department}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
              
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {post.hidden ? (
                      <DropdownMenuItem onClick={handleUnhidePost} className="text-green-600 focus:text-green-600">
                        <Eye className="h-4 w-4 mr-2" />
                        Unhide Post
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => setShowHideDialog(true)} className="text-orange-600 focus:text-orange-600">
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Post
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600 focus:text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <Button 
              variant={isLiked ? "default" : "outline"} 
              onClick={handleLike}
              className={`gap-2 font-bold ${isLiked ? 'bg-blue-600 hover:bg-blue-700' : 'hover:border-blue-500 hover:text-blue-500'}`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-bold">{comments.length} Comments</span>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <section className="pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Join the Conversation
          </h2>

          <Card className="p-4 bg-secondary/20 border-border mb-10">
            <form onSubmit={handlePostComment} className="space-y-4">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts or provide a solution..."
                className="w-full bg-background/50 border-border rounded-xl p-4 text-sm focus:ring-primary/20 focus:border-primary/50 min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  disabled={isSubmittingComment || !commentInput.trim()} 
                  className="bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
                >
                  {isSubmittingComment ? "Posting..." : "Post Comment"}
                  {!isSubmittingComment && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-2">
            {rootComments.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No comments yet. Be the first to reply!
              </div>
            ) : (
              rootComments.map(comment => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  allComments={comments} 
                  onReply={handleReply} 
                />
              ))
            )}
          </div>
        </section>
      </motion.article>

      {/* Admin Dialogs */}
      {isAdmin && (
        <>
          {/* Delete Confirmation Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Discussion Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this post? This action cannot be undone. 
                  All comments and likes will also be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeletePost} disabled={isDeleting}>
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Hide Post Dialog */}
          <Dialog open={showHideDialog} onOpenChange={setShowHideDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hide Discussion Post</DialogTitle>
                <DialogDescription>
                  Hide this post from regular users. You can set a duration or hide it indefinitely.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Hide Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="0"
                    placeholder="Leave empty for indefinite"
                    value={hideDuration}
                    onChange={(e) => setHideDuration(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to hide indefinitely. Enter hours (e.g., 24 for 1 day, 168 for 1 week)
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setShowHideDialog(false);
                  setHideDuration("");
                }} disabled={isHiding}>
                  Cancel
                </Button>
                <Button onClick={handleHidePost} disabled={isHiding} className="bg-orange-600 hover:bg-orange-700">
                  {isHiding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Hiding...
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Post
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default DiscussionDetail;
