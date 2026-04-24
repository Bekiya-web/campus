interface UniLogoProps {
  abbr: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

export const UniLogo = ({ abbr, color, size = "md" }: UniLogoProps) => {
  const sizes = { 
    sm: "h-8 w-8 md:h-10 md:w-10 text-[8px] md:text-[10px]", 
    md: "h-10 w-10 md:h-14 md:w-14 text-[9px] md:text-xs", 
    lg: "h-10 w-10 md:h-16 md:w-16 text-[10px] md:text-sm" 
  };
  
  return (
    <div className={`${sizes[size]} rounded-xl md:rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center font-black text-white shadow-lg shrink-0 leading-none ring-1 md:ring-2 ring-white/20`}>
      {abbr}
    </div>
  );
};
