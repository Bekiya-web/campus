import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function RatingStars({ value, onChange, size = 18, readOnly = false, className }: RatingStarsProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange?.(n)}
          className={cn(
            "transition-smooth",
            !readOnly && "hover:scale-110 cursor-pointer",
            readOnly && "cursor-default"
          )}
          aria-label={`Rate ${n} stars`}
        >
          <Star
            size={size}
            className={cn(
              "transition-smooth",
              n <= display ? "fill-accent text-accent" : "fill-none text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  );
}
