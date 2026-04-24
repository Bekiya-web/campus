import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Upload,
  Search,
  Star,
  Users,
  BookMarked,
  Trophy,
  ArrowRight,
  Sparkles,
  Shield,
  MapPin,
  BookOpen,
  Mail,
  Globe,
  ExternalLink,
  Bot,
  MessageCircleMore,
  SendHorizontal,
} from "lucide-react";
import { UNIVERSITIES } from "@/data/universities";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  { icon: Upload, title: "Upload & Share", desc: "Share notes, past exams, and study materials in seconds." },
  { icon: Search, title: "Smart Search", desc: "Filter by university, department, year, and course." },
  { icon: Star, title: "Community Rated", desc: "Student ratings surface the most helpful materials." },
  { icon: BookMarked, title: "Save for Later", desc: "Bookmark materials and access them on any device." },
  { icon: Trophy, title: "Earn Recognition", desc: "Get points and badges for contributing resources." },
  { icon: Users, title: "Built for Ethiopia", desc: "Tailored to 30+ Ethiopian universities and their courses." },
];

const stats = [
  { value: "30+",   label: "Universities"  },
  { value: "33",    label: "Departments"   },
  { value: "100%",  label: "Free forever"  },
  { value: "24/7",  label: "Access"        },
];

const steps = [
  { title: "Sign up free", desc: "Pick your university, department, and year." },
  { title: "Browse or upload", desc: "Find materials for your courses or contribute your own." },
  { title: "Earn & learn", desc: "Collect points and badges as you help others succeed." },
];

const footerLinks = {
  Product:  [{ label: "Materials",  to: "/materials" }, { label: "Upload",     to: "/upload"    }, { label: "Dashboard", to: "/dashboard" }],
  Account:  [{ label: "Sign up",    to: "/register"  }, { label: "Log in",     to: "/login"     }, { label: "Profile",   to: "/profile"   }],
  Projects: [{ label: "Campus Projects", to: "/#projects" }, { label: "AI Study Assistant", to: "/#projects" }, { label: "Student Community", to: "/#projects" }],
};

// University Logo Avatar component
function UniLogo({ abbr, color, size = "md" }: { abbr: string; color: string; size?: "sm" | "md" | "lg" }) {
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
}

const Home = () => {
  const { user } = useAuth();
  const topUnis = UNIVERSITIES.filter((u) => u.tier === "top");
  const otherUnis = UNIVERSITIES.filter((u) => u.tier !== "top");

  return (
    <div className="flex-1 overflow-hidden bg-background">
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

      <section className="border-b border-border bg-background py-14 md:py-20">
        <div className="container">
          <h2 className="text-center text-2xl font-extrabold tracking-tight md:text-4xl">Platform features</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground md:mt-3 md:text-base">
            Modern tools for discovery, contribution, and collaboration.
          </p>
          <div className="mt-6 grid gap-3 md:mt-10 md:gap-5 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group interactive-card rounded-xl border border-border bg-card p-4 shadow-card transition-smooth md:rounded-2xl md:p-6">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary md:mb-4 md:h-11 md:w-11 md:rounded-xl">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground md:text-base">{f.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 md:py-20">
        <div className="container">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-bold">
              <Shield className="h-3.5 w-3.5 text-primary" /> HOW IT WORKS
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:mt-4 md:text-4xl">Up and running in 3 steps</h2>
          </div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
            {steps.map((s, i) => (
              <div key={s.title} className="min-w-[84%] snap-start interactive-card rounded-xl border border-border bg-card p-4 shadow-card md:min-w-0 md:rounded-2xl md:p-6 transition-smooth">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-foreground md:mb-4 md:h-10 md:w-10 md:rounded-xl md:text-sm">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold md:text-lg">{s.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground md:mt-2 md:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 md:py-20">
        <div className="container">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-bold">
              <MapPin className="h-3.5 w-3.5 text-primary" /> NATIONWIDE
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight md:mt-4 md:text-4xl">Featured universities</h2>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-4 md:gap-4 md:overflow-visible lg:grid-cols-7">
            {topUnis.map((u) => (
              <div key={u.id} className="group min-w-[58%] snap-start interactive-card rounded-xl border border-border bg-card p-3 shadow-card transition-smooth md:min-w-0 md:rounded-2xl md:p-4">
                <div className="flex items-center justify-center">
                  {u.logo ? (
                    <img src={u.logo} alt={u.name} className="h-12 w-12 object-contain md:h-16 md:w-16 md:group-hover:scale-110 transition-smooth" />
                  ) : (
                    <UniLogo abbr={u.abbr} color={u.color} size="lg" />
                  )}
                </div>
                <p className="mt-2 line-clamp-1 text-center text-xs font-semibold text-foreground">{u.name}</p>
                <p className="mt-0.5 text-center text-[10px] text-muted-foreground md:text-xs">{u.city}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 text-center text-lg font-bold md:mt-12 md:text-xl">All universities</h3>
          <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar md:grid md:grid-cols-5 md:gap-4 md:overflow-visible lg:grid-cols-8">
            {otherUnis.map((u) => (
              <div key={u.id} className="group min-w-[48%] snap-start interactive-card rounded-xl border border-border bg-card p-3 transition-smooth md:min-w-0">
                <div className="flex items-center justify-center">
                  {u.logo ? (
                    <img src={u.logo} alt={u.name} className="h-9 w-9 object-contain md:h-12 md:w-12 md:group-hover:scale-110 transition-smooth" />
                  ) : (
                    <UniLogo abbr={u.abbr} color={u.color} size="md" />
                  )}
                </div>
                <p className="mt-1.5 line-clamp-1 text-center text-[10px] text-muted-foreground md:text-xs">{u.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-b border-border bg-background py-14 md:py-20">
        <div className="container">
          <div className="mb-6 text-center md:mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-4xl">Projects & Community</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Modern initiatives connecting students, AI support, and collaborative learning.
            </p>
          </div>
          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            <div className="interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:rounded-2xl md:p-8">
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
            <div className="interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:rounded-2xl md:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <Bot className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-lg font-extrabold md:text-2xl">AI Agent Assistant</h3>
              <p className="mt-2 text-sm text-muted-foreground md:mt-3 md:text-base">
                Ask questions about courses, how to upload materials, and study planning. The AI assistant is available instantly.
              </p>
              <p className="mt-2 text-xs text-muted-foreground md:mt-3 md:text-sm">Use the floating AI chat button in the bottom right corner.</p>
            </div>
            <div className="interactive-card rounded-xl border border-border bg-card p-5 shadow-card transition-smooth md:rounded-2xl md:p-8">
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
      </section>

      <footer className="bg-background text-foreground">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 border-b border-border pb-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                  <GraduationCap className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xl font-black">Campus Helper</p>
                  <p className="text-xs font-semibold text-muted-foreground">Professional student collaboration platform</p>
                </div>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                A modern and professional place for Ethiopian students to learn, share materials, and get help from peers and AI.
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="mb-3 text-xs font-black uppercase tracking-wider">Product</p>
              <ul className="space-y-2">
                {footerLinks.Product.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="mb-3 text-xs font-black uppercase tracking-wider">Account</p>
              <ul className="space-y-2">
                {footerLinks.Account.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <p className="mb-3 text-xs font-black uppercase tracking-wider">Projects</p>
              <ul className="space-y-2">
                {footerLinks.Projects.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="interactive-card rounded-2xl border border-border bg-card p-5">
                <h4 className="font-bold">Join now</h4>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Get full access to materials, chat, and AI support.</p>
                <Button asChild className="btn-yellow w-full">
                  <Link to="/register">Create free account</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Campus Helper. Built for Ethiopian students.</p>
            <div className="flex items-center gap-3">
              <a href="mailto:support@campushelper.et" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4" /></a>
              <a href="https://campushelper.et" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Globe className="h-4 w-4" /></a>
              <a href="https://campushelper.et/about" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><ExternalLink className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
