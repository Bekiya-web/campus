import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createNewsPost, NewsCategory } from "@/services/newsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Loader2, Newspaper, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const categories: { value: NewsCategory; label: string; emoji: string }[] = [
  { value: 'admission', label: 'Admission', emoji: '🎓' },
  { value: 'scholarship', label: 'Scholarship', emoji: '💰' },
  { value: 'event', label: 'Event', emoji: '📅' },
  { value: 'deadline', label: 'Deadline', emoji: '⏰' },
  { value: 'announcement', label: 'Announcement', emoji: '📢' }
];

const universities = [
  { value: 'aau', label: 'Addis Ababa University' },
  { value: 'bahir-dar', label: 'Bahir Dar University' },
  { value: 'jimma', label: 'Jimma University' },
  { value: 'haramaya', label: 'Haramaya University' },
  { value: 'mekelle', label: 'Mekelle University' },
  { value: 'hawassa', label: 'Hawassa University' },
  { value: 'gondar', label: 'University of Gondar' },
  { value: 'arba-minch', label: 'Arba Minch University' },
  { value: 'aastu', label: 'Addis Ababa Science and Technology University' },
  { value: 'dbu', label: 'Debre Berhan University' },
  { value: 'dmu', label: 'Debre Markos University' },
  { value: 'wolkite', label: 'Wolkite University' },
  { value: 'wollo', label: 'Wollo University' },
  { value: 'dire-dawa', label: 'Dire Dawa University' },
  { value: 'aksum', label: 'Aksum University' }
];

const CreateNews = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '' as NewsCategory | '',
    universityId: '',
    universityName: '',
    imageUrl: '',
    externalLink: '',
    deadline: '',
    eventDate: '',
    tags: '',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !profile || profile.role !== 'admin') {
      toast.error("Only admins can create news");
      return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!formData.category) {
      toast.error("Category is required");
      return;
    }
    if (!formData.universityId) {
      toast.error("University is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await createNewsPost({
        title: formData.title,
        content: formData.content,
        summary: formData.summary || undefined,
        category: formData.category as NewsCategory,
        universityId: formData.universityId,
        universityName: formData.universityName,
        authorId: user.id,
        authorName: profile.name,
        imageUrl: formData.imageUrl || undefined,
        externalLink: formData.externalLink || undefined,
        deadline: formData.deadline ? new Date(formData.deadline) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
        tags: tagsArray,
        featured: formData.featured
      });

      toast.success("News posted successfully!");
      navigate("/news");
    } catch (error: any) {
      console.error('Create news error:', error);
      toast.error(error.message || "Failed to create news");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUniversityChange = (value: string) => {
    const university = universities.find(u => u.value === value);
    setFormData({
      ...formData,
      universityId: value,
      universityName: university?.label || ''
    });
  };

  // Check if user is admin
  if (profile?.role !== 'admin') {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Only admins can create news posts.</p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/news">Back to News</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Link 
        to="/news" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Create News Post</h1>
            <p className="text-muted-foreground">Share important updates with students</p>
          </div>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-bold">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., New Scholarship Opportunity for Graduate Students"
                className="text-lg h-12"
                required
              />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-base font-bold">
                Summary
              </Label>
              <Input
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Short description (shown on news cards)"
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">Optional: Brief summary for preview cards</p>
            </div>

            {/* Category & University */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-bold">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as NewsCategory })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university" className="text-base font-bold">
                  University <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.universityId} onValueChange={handleUniversityChange}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map(uni => (
                      <SelectItem key={uni.value} value={uni.value}>
                        {uni.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-bold">
                Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full news content..."
                className="min-h-[300px] text-base"
                required
              />
              <p className="text-xs text-muted-foreground">Full details of the news announcement</p>
            </div>

            {/* Image URL & External Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-base font-bold">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">Optional: Cover image URL</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalLink" className="text-base font-bold">
                  External Link
                </Label>
                <Input
                  id="externalLink"
                  type="url"
                  value={formData.externalLink}
                  onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                  placeholder="https://university.edu.et/announcement"
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">Optional: Link to official page</p>
              </div>
            </div>

            {/* Deadline & Event Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-base font-bold">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">For applications/registrations</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-base font-bold">
                  Event Date
                </Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">When the event takes place</p>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-bold">
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="scholarship, graduate, engineering (comma-separated)"
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">Comma-separated tags for categorization</p>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base font-bold">
                  Featured News
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show this news in the featured carousel
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/news")}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 font-bold gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Publish News
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateNews;
