import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface AnnouncementBannerProps {
  onClose: () => void;
}

export const AnnouncementBanner = ({ onClose }: AnnouncementBannerProps) => {
  return (
    <div className="bg-gradient-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      <div className="container relative z-10 py-2.5 px-2 sm:px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full max-w-full">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-hidden">
            <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
            <p className="text-xs sm:text-sm font-semibold truncate">
              <span className="hidden sm:inline">🎉 New: </span>
              <span className="hidden xs:inline">Upload materials and earn points — </span>
              <span className="xs:hidden">Upload & earn — </span>
              <span>completely free!</span>
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-background text-foreground hover:bg-background/90 h-7 px-2 sm:px-3 text-xs font-bold rounded-full whitespace-nowrap"
            >
              <Link to="/register">
                <span className="hidden xs:inline">Get Started</span>
                <span className="xs:hidden">Start</span>
              </Link>
            </Button>
            <button
              onClick={onClose}
              className="h-7 w-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
              aria-label="Close banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
