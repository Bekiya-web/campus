import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Bot, MessageCircleMore, SendHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export const ProjectsSection = () => {
  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsScrollRef.current) {
      const scrollAmount = projectsScrollRef.current.clientWidth * 0.85;
      projectsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="border-b border-border bg-background py-14 md:py-20">
      <div className="container">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">Projects & Community</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Modern initiatives connecting students, AI support, and collaborative learning.
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => scrollProjects('left')}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white dark:bg-slate-800 border-2 border-border shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-500 transition-all duration-200 -ml-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => scrollProjects('right')}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white dark:bg-slate-800 border-2 border-border shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-500 transition-all duration-200 -mr-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          <div ref={projectsScrollRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-3">
            <div className="min-w-[85%] snap-start interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:min-w-0 md:rounded-2xl md:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <MessageCircleMore className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-extrabold md:text-2xl">Student Chat</h3>
              <p className="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
                Connect with classmates, share resources, ask for exam tips, and organize course discussions.
              </p>
              <Button className="btn-yellow mt-4 md:mt-6">
                <SendHorizontal className="h-4 w-4" />
                Open chat experience
              </Button>
            </div>
            <div className="min-w-[85%] snap-start interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:min-w-0 md:rounded-2xl md:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <Bot className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-extrabold md:text-2xl">AI Agent Assistant</h3>
              <p className="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
                Ask questions about courses, how to upload materials, and study planning. The AI assistant is available instantly.
              </p>
              <p className="mt-2 text-xs text-muted-foreground md:mt-3 md:text-sm">Use the floating AI chat button in the bottom right corner.</p>
            </div>
            <div className="min-w-[85%] snap-start interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:min-w-0 md:rounded-2xl md:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-extrabold md:text-2xl">Campus Projects</h3>
              <p className="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
                Explore university-led project showcases, collaborative innovations, and knowledge-sharing programs.
              </p>
              <Button asChild variant="outline" className="mt-4 md:mt-6">
                <Link to="/materials">Explore project resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
