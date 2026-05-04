import { useRef } from "react";
import { Upload, Search, Star, BookMarked, Trophy, Users } from "lucide-react";
import { CarouselArrow } from "./CarouselArrow";
import { useLanguage } from "@/contexts/LanguageContext";

export const FeaturesSection = () => {
  const { t } = useLanguage();
  const featuresScrollRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Upload, title: t.home.feature1Title, desc: t.home.feature1Description },
    { icon: Search, title: t.home.feature2Title, desc: t.home.feature2Description },
    { icon: Star, title: t.home.feature3Title, desc: t.home.feature3Description },
    { icon: BookMarked, title: t.home.feature4Title, desc: t.home.feature4Description },
  ];

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
        <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-4xl">{t.home.featuresTitle}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground md:mt-3 md:text-base">
          {t.home.featuresSubtitle}
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
