import { useRef } from "react";
import { Shield } from "lucide-react";
import { CarouselArrow } from "./CarouselArrow";

const steps = [
  { title: "Sign up free", desc: "Pick your university, department, and year." },
  { title: "Browse or upload", desc: "Find materials for your courses or contribute your own." },
  { title: "Earn & learn", desc: "Collect points and badges as you help others succeed." },
];

export const HowItWorksSection = () => {
  const stepsScrollRef = useRef<HTMLDivElement>(null);

  const scrollSteps = (direction: 'left' | 'right') => {
    if (stepsScrollRef.current) {
      const scrollAmount = stepsScrollRef.current.clientWidth * 0.85;
      stepsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="border-b border-border bg-background py-14 md:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-bold">
            <Shield className="h-3.5 w-3.5 text-primary" /> HOW IT WORKS
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:mt-4 md:text-4xl">Up and running in 3 steps</h2>
        </div>
        
        {/* Mobile: Carousel with Navigation Arrows */}
        <div className="relative md:hidden">
          <CarouselArrow
            direction="left"
            onClick={() => scrollSteps('left')}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Previous step"
          />

          <CarouselArrow
            direction="right"
            onClick={() => scrollSteps('right')}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Next step"
          />

          <div ref={stepsScrollRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar px-2">
            {steps.map((s, i) => (
              <div key={s.title} className="min-w-[84%] snap-start interactive-card rounded-xl border border-border bg-card p-4 shadow-card transition-smooth">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-foreground">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="interactive-card rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-foreground">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
