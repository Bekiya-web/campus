import { useRef } from "react";
import { Upload, Search, Star, BookMarked, Trophy, Users } from "lucide-react";
import { CarouselArrow } from "./CarouselArrow";

const features = [
  { icon: Upload, title: "Upload & Share", desc: "Share notes, past exams, and study materials in seconds." },
  { icon: Search, title: "Smart Search", desc: "Filter by university, department, year, and course." },
  { icon: Star, title: "Community Rated", desc: "Student ratings surface the most helpful materials." },
  { icon: BookMarked, title: "Save for Later", desc: "Bookmark materials and access them on any device." },
  { icon: Trophy, title: "Earn Recognition", desc: "Get points and badges for contributing resources." },
  { icon: Users, title: "Built for Ethiopia", desc: "Tailored to 30+ Ethiopian universities and their courses." },
];

export const FeaturesSection = () => {
  const featuresScrollRef = useRef<HTMLDivElement>(null);

  const scrollFeatures = (direction: 'left' | 'right') => {
    if (featuresScrollRef.current) {
      const scrollAmount = featuresScrollRef.current.clientWidth * 0.85;
      featuresScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="border-b border-border bg-background py-14 md:py-20">
      <div className="container">
        <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-4xl">Platform features</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground md:mt-3 md:text-base">
          Modern tools for discovery, contribution, and collaboration.
        </p>
        
        {/* Mobile: Carousel with Navigation Arrows */}
        <div className="relative md:hidden mt-8">
          <CarouselArrow
            direction="left"
            onClick={() => scrollFeatures('left')}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Previous feature"
          />

          <CarouselArrow
            direction="right"
            onClick={() => scrollFeatures('right')}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Next feature"
          />

          <div ref={featuresScrollRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar px-2">
            {features.map((f) => (
              <div key={f.title} className="group min-w-[85%] snap-start interactive-card rounded-xl border border-border bg-card p-4 shadow-card transition-smooth">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-5 mt-8">
          {features.map((f) => (
            <div key={f.title} className="group interactive-card rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <f.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
