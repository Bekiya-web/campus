import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { value: "30+",   label: "Universities"  },
  { value: "33",    label: "Departments"   },
  { value: "100%",  label: "Free forever"  },
  { value: "24/7",  label: "Access"        },
];

export const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 mesh-bg -z-10" />
      <div className="container py-12 md:py-28">
        <div className="grid gap-7 md:gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[11px] font-semibold md:px-4 md:py-1.5 md:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              One modern platform for Ethiopian universities
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:mt-5 md:text-6xl">
              Your campus study hub,
              <span className="text-gradient"> All IN ONE</span>.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base md:mt-5 md:text-lg">
              Discover and share materials from 30+ universities with a professional modern interface, AI support,
              and community collaboration.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row md:mt-8 md:gap-3">
              <Button asChild size="lg" className="btn-yellow h-11 rounded-full px-6 text-sm font-semibold md:h-11 md:px-8 md:text-base">
                <Link to={user ? "/dashboard" : "/register"}>
                  {user ? "Go to dashboard" : "Start for free"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-6 text-sm font-semibold md:h-11 md:px-8 md:text-base">
                <Link to="/materials">
                  <BookOpen className="mr-1.5 h-4 w-4" />
                  Explore materials
                </Link>
              </Button>
            </div>
          </div>

          <div className="interactive-card rounded-2xl border border-border bg-card p-4 shadow-card md:rounded-3xl md:p-6">
            <div className="mb-4 flex items-center justify-between md:mb-6">
              <h3 className="text-base font-bold md:text-lg">Live Student Activity</h3>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold md:px-3 md:text-xs">Real-time</span>
            </div>
            <div className="space-y-2.5 md:space-y-3">
              {[
                { title: "New upload", detail: "Software Engineering Notes · Addis Ababa University", time: "2m ago" },
                { title: "Group study active", detail: "3 students discussing final exam strategy", time: "9m ago" },
                { title: "AI support", detail: "25 student questions answered today", time: "Live" },
              ].map((line) => (
                <div key={line.title} className="group flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2.5 transition-smooth md:px-4 md:py-3 md:hover:border-primary/40 md:hover:shadow-soft">
                  <div className="relative mt-0.5 h-2.5 w-2.5 shrink-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <div className="absolute inset-0 rounded-full bg-primary/40 blur-[2px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground md:text-sm">{line.title}</p>
                    <p className="line-clamp-2 text-[11px] text-muted-foreground md:text-sm">{line.detail}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground md:text-xs">{line.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 md:mt-5 md:gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-background p-2.5 text-center md:p-3">
                  <div className="text-base font-extrabold text-gradient md:text-xl">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground md:text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
