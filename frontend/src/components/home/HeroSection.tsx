import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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

          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse" />
            
            {/* Main image container */}
            <div className="relative group">
              <div className="interactive-card rounded-2xl overflow-hidden shadow-2xl border-2 border-border md:rounded-3xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Image */}
                <img 
                  src="/new.png" 
                  alt="EduNexus Platform" 
                  className="w-full h-auto object-contain transition-transform durawebption-700 group-hover:scale-105"
                />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold animate-bounce">
                ✨ EduNexus
              </div>
              
              {/* Bottom decorative line */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};