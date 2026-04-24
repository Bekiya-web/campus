import { Link } from "react-router-dom";
import { Material } from "@/services/materialService";
import { RatingStars } from "./RatingStars";
import { Bookmark, BookmarkCheck, FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toggleBookmark } from "@/services/bookmarkService";
import { incrementDownload } from "@/services/materialService";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  material: Material;
  onBookmarkChange?: () => void;
}

export function MaterialCard({ material, onBookmarkChange }: Props) {
  const { user, profile, refreshProfile } = useAuth();
  const [bookmarked, setBookmarked] = useState(profile?.bookmarks?.includes(material.id) ?? false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to bookmark");
    try {
      const next = await toggleBookmark(user.id, material.id);
      setBookmarked(next);
      await refreshProfile();
      onBookmarkChange?.();
      toast.success(next ? "Bookmarked" : "Removed bookmark");
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try { 
      await incrementDownload(material.id); 
    } catch (error) {
      // Silently fail - download will still work
      console.error('Failed to increment download count:', error);
    }
    window.open(material.fileURL, "_blank");
  };

  return (
    <Link to={`/materials/${material.id}`} className="group block">
      <Card className="interactive-card h-full bg-card p-5 border-border">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft shrink-0">
            <FileText className="h-5 w-5 text-foreground" />
          </div>
          <button
            onClick={handleBookmark}
            className="text-muted-foreground hover:text-primary transition-smooth mt-0.5"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          >
            {bookmarked
              ? <BookmarkCheck className="h-5 w-5 fill-primary text-primary" />
              : <Bookmark className="h-5 w-5" />}
          </button>
        </div>

        <h3 className="font-bold text-base leading-snug line-clamp-2 mb-1 text-foreground group-hover:text-primary transition-smooth">
          {material.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {material.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge variant="secondary" className="text-xs font-semibold text-foreground">{material.course}</Badge>
          <Badge variant="outline" className="text-xs font-semibold text-foreground">{material.year}</Badge>
        </div>
        <div className="text-xs text-muted-foreground mb-3 line-clamp-1 font-medium">
          {material.department} · {material.universityName}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <RatingStars value={material.ratingAvg || 0} readOnly size={14} />
            <span className="text-xs text-muted-foreground font-medium">({material.ratingCount || 0})</span>
          </div>
          <Button
            size="sm" variant="ghost"
            onClick={handleDownload}
            className="h-8 px-2 text-muted-foreground hover:text-primary hover:bg-secondary"
            aria-label="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
