import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const CarouselArrow = ({ 
  direction, 
  onClick, 
  disabled = false,
  className = "",
  ariaLabel 
}: CarouselArrowProps) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group opacity-60 hover:opacity-100 active:opacity-100 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      aria-label={ariaLabel || `${direction === 'left' ? 'Previous' : 'Next'} item`}
    >
      <div className="relative">
        {/* Outer glow ring - animated pulse */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-40 group-disabled:opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125" />
        
        {/* Secondary glow layer */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 group-disabled:opacity-0 blur-xl transition-opacity duration-300" />
        
        {/* Button with multiple layers */}
        <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-white/95 via-blue-50/95 to-slate-100/95 dark:from-slate-800/95 dark:via-slate-850/95 dark:to-slate-900/95 border-2 border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.8)] group-hover:scale-110 group-disabled:scale-100 transition-all duration-300 backdrop-blur-sm">
          {/* Inner shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-500" />
          
          {/* Icon with gradient on hover */}
          <Icon className="relative h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-disabled:text-slate-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" strokeWidth={3.5} />
        </div>
        
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/30 group-disabled:border-transparent transition-all duration-500 scale-110" />
      </div>
    </button>
  );
};
