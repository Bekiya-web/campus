import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { UNIVERSITIES } from "@/data/universities";
import { UniLogo } from "./UniLogo";
import { CarouselArrow } from "./CarouselArrow";

export const UniversitiesSection = () => {
  const universitiesScrollRef = useRef<HTMLDivElement>(null);
  const allUnisScrollRef = useRef<HTMLDivElement>(null);
  const topUnis = UNIVERSITIES.filter((u) => u.tier === "top");
  const otherUnis = UNIVERSITIES.filter((u) => u.tier !== "top");
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = topUnis.length;

  const scrollUniversities = (direction: 'left' | 'right') => {
    if (universitiesScrollRef.current) {
      const cardWidth = 220;
      const newSlide = direction === 'left' 
        ? Math.max(0, currentSlide - 1)
        : Math.min(totalSlides - 1, currentSlide + 1);
      
      setCurrentSlide(newSlide);
      universitiesScrollRef.current.scrollTo({
        left: newSlide * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index: number) => {
    if (universitiesScrollRef.current) {
      const cardWidth = 220;
      setCurrentSlide(index);
      universitiesScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollAllUnis = (direction: 'left' | 'right') => {
    if (allUnisScrollRef.current) {
      const scrollAmount = allUnisScrollRef.current.clientWidth * 0.5;
      allUnisScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollContainer = universitiesScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const cardWidth = 220;
      const scrollLeft = scrollContainer.scrollLeft;
      const newSlide = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(newSlide);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="border-b border-border bg-background py-14 md:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-bold">
            <MapPin className="h-3.5 w-3.5 text-primary" /> NATIONWIDE
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:mt-4 md:text-4xl">Featured universities</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Click any university to explore their materials
          </p>
          <p className="md:hidden mt-2 text-xs text-muted-foreground flex items-center justify-center gap-1">
            <ChevronLeft className="h-3 w-3 animate-pulse" />
            Swipe to explore
            <ChevronRight className="h-3 w-3 animate-pulse" />
          </p>
        </div>

        {/* Featured Universities Carousel */}
        <div className="relative">
          {/* Mobile: Centered Carousel */}
          <div className="md:hidden relative px-4">
            <button
              onClick={() => scrollUniversities('left')}
              disabled={currentSlide === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 group disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous university"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-40 group-disabled:opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 group-disabled:opacity-0 blur-xl transition-opacity duration-300" />
                <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-white via-blue-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.8)] group-hover:scale-110 group-disabled:scale-100 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-500" />
                  <ChevronLeft className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-disabled:text-slate-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" strokeWidth={3.5} />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/30 group-disabled:border-transparent transition-all duration-500 scale-110" />
              </div>
            </button>

            <button
              onClick={() => scrollUniversities('right')}
              disabled={currentSlide === totalSlides - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 group disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next university"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-40 group-disabled:opacity-0 blur-2xl transition-all duration-500 group-hover:scale-125 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 group-disabled:opacity-0 blur-xl transition-opacity duration-300" />
                <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-white via-blue-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.8)] group-hover:scale-110 group-disabled:scale-100 transition-all duration-300 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-500" />
                  <ChevronRight className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-disabled:text-slate-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" strokeWidth={3.5} />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/30 group-disabled:border-transparent transition-all duration-500 scale-110" />
              </div>
            </button>

            <div className="overflow-hidden py-4">
              <div 
                ref={universitiesScrollRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                style={{ scrollPaddingLeft: 'calc(50% - 110px)' }}
              >
                {topUnis.map((u) => (
                  <Link 
                    key={u.id} 
                    to={`/materials?university=${u.id}`}
                    className="group snap-center flex-shrink-0 flex flex-col items-center first:ml-[calc(50%-110px)] last:mr-[calc(50%-110px)]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
                      <div className="relative interactive-card rounded-3xl border-2 border-border bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-10 shadow-2xl transition-all duration-500 hover:border-blue-400 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] hover:scale-105 w-44 h-44 flex items-center justify-center group-hover:-translate-y-3">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-500" />
                        {u.logo ? (
                          <img 
                            src={u.logo} 
                            alt={u.name} 
                            className="relative z-10 h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
                          />
                        ) : (
                          <div className="relative z-10">
                            <UniLogo abbr={u.abbr} color={u.color} size="lg" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 text-center max-w-[176px]">
                      <p className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{u.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <MapPin className="h-3 w-3" />
                        {u.city}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="text-sm font-semibold text-muted-foreground">
                <span className="text-blue-600 text-base">{currentSlide + 1}</span>
                <span className="mx-1">/</span>
                <span>{totalSlides}</span>
              </div>
              <div className="flex justify-center gap-2">
                {topUnis.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2.5 bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-blue-400 hover:scale-125'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topUnis.map((u) => (
              <Link 
                key={u.id} 
                to={`/materials?university=${u.id}`}
                className="group"
              >
                <div className="interactive-card rounded-2xl border-2 border-border bg-gradient-to-br from-card to-card/50 p-6 shadow-card transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:scale-[1.02]">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-xl bg-white dark:bg-slate-800 p-3 shadow-md flex items-center justify-center mb-4">
                      {u.logo ? (
                        <img src={u.logo} alt={u.name} className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <UniLogo abbr={u.abbr} color={u.color} size="lg" />
                      )}
                    </div>
                    <h3 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">{u.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {u.city}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Universities */}
        <h3 className="mt-10 text-center text-lg font-bold md:mt-12 md:text-xl">All universities</h3>
        
        <div className="relative md:hidden mt-5">
          <CarouselArrow
            direction="left"
            onClick={() => scrollAllUnis('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Previous universities"
          />

          <CarouselArrow
            direction="right"
            onClick={() => scrollAllUnis('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            ariaLabel="Next universities"
          />

          <div ref={allUnisScrollRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar px-11">
            {otherUnis.map((u) => (
              <Link 
                key={u.id} 
                to={`/materials?university=${u.id}`}
                className="group min-w-[48%] snap-start interactive-card rounded-xl border border-border bg-card p-3 transition-smooth hover:border-blue-500 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  {u.logo ? (
                    <img src={u.logo} alt={u.name} className="h-9 w-9 object-contain group-hover:scale-110 transition-smooth" />
                  ) : (
                    <UniLogo abbr={u.abbr} color={u.color} size="md" />
                  )}
                </div>
                <p className="mt-1.5 line-clamp-1 text-center text-[10px] text-muted-foreground">{u.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 md:gap-4 lg:grid-cols-8 mt-5">
          {otherUnis.map((u) => (
            <Link 
              key={u.id} 
              to={`/materials?university=${u.id}`}
              className="group interactive-card rounded-xl border border-border bg-card p-3 transition-smooth hover:border-blue-500 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-center">
                {u.logo ? (
                  <img src={u.logo} alt={u.name} className="h-12 w-12 object-contain group-hover:scale-110 transition-smooth" />
                ) : (
                  <UniLogo abbr={u.abbr} color={u.color} size="md" />
                )}
              </div>
              <p className="mt-1.5 line-clamp-1 text-center text-xs text-muted-foreground">{u.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
