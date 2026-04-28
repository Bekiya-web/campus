import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createNewsPost, NewsCategory } from "@/services/newsService";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Loader2, Newspaper, Plus, Upload, X, Image as ImageIcon } from "lucide-react";
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
      // Upload image if selected
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      await createNewsPost({
        title: formData.title,
        content: formData.content,
        summary: formData.summary || undefined,
        category: formData.category as NewsCategory,
        universityId: formData.universityId,
        universityName: formData.universityName,
        authorId: user.id,
        authorName: profile.name,
        imageUrl: imageUrl || undefined,
        externalLink: formData.externalLink || undefined,
        deadline: formData.deadline ? new Date(formData.deadline) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
        tags: tags,
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

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) return;
    
    if (tags.includes(trimmedTag)) {
      toast.error("Tag already added");
      return;
    }

    if (tags.length >= 10) {
      toast.error("Maximum 10 tags allowed");
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, imageUrl: "" });
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.imageUrl || null;

    setIsUploadingImage(true);
    try {
      // Sanitize filename
      const sanitizedFileName = imageFile.name
        .replace(/[^\w\s.-]/g, '')
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_');

      const path = `news-images/${Date.now()}_${sanitizedFileName}`;

      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(path, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("materials")
        .getPublicUrl(path);

      return publicUrlData.publicUrl;
    } catch (error: any) {
      console.error('Image upload error:', error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setIsUploadingImage(false);
    }
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

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-base font-bold">
                Cover Image
              </Label>
              
              {imagePreview || formData.imageUrl ? (
                <div className="relative">
                  <div className="relative h-64 rounded-lg overflow-hidden border-2 border-border">
                    <img 
                      src={imagePreview || formData.imageUrl} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="block border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Click to upload image</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium">
                        <Upload className="h-4 w-4" />
                        Choose Image
                      </div>
                    </div>
                  </label>
                </div>
              )}
              
              {/* Or paste URL */}
              <div className="pt-2">
                <Label htmlFor="imageUrl" className="text-sm text-muted-foreground">
                  Or paste image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    if (e.target.value) {
                      setImagePreview("");
                      setImageFile(null);
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="h-10 mt-1"
                  disabled={!!imageFile}
                />
              </div>
            </div>

            {/* External Link */}
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
              <div className="space-y-3">
                {/* Tag Input */}
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Type a tag and press Enter"
                    className="h-12"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                    className="h-12 px-6"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                {/* Tag Display */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-secondary/20 rounded-lg">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-sm px-3 py-1.5 gap-2"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  Add tags to categorize your news (e.g., scholarship, graduate, engineering)
                </p>
              </div>
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
                disabled={isSubmitting || isUploadingImage}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="flex-1 bg-primary hover:bg-primary/90 font-bold gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isUploadingImage ? 'Uploading Image...' : 'Publishing...'}
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
