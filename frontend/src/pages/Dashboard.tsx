import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchGeneralMaterials, fetchTrending, Material } from "@/services/materialService";
import { MaterialCard } from "@/components/common/MaterialCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Sparkles, Award, Upload, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [feed, setFeed] = useState<Material[]>([]);
  const [trending, setTrending] = useState<Record<string, Material[]>>({ recent: [], downloaded: [], rated: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      try {
        console.log("Dashboard: Fetching materials for profile:", profile);
        const [own, recent, downloaded, rated] = await Promise.all([
          fetchGeneralMaterials({}, 8), // Exclude Year 1 materials
          fetchTrending("recent", 8),
          fetchTrending("downloaded", 8),
          fetchTrending("rated", 8),
        ]);
        console.log("Dashboard: Fetched materials:", { own, recent, downloaded, rated });
        setFeed(own);
        setTrending({ recent, downloaded, rated });
      } catch (e) {
        console.error("Dashboard: Error fetching materials:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [profile]);

  if (!profile) {
    return (
      <div className="container py-12">
        <Card className="mx-auto max-w-xl border-border p-8 text-center shadow-card">
          <h1 className="text-2xl font-extrabold text-foreground">Dashboard setup</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your profile is still loading. Continue to your profile to finish setup and unlock your personalized dashboard.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button asChild className="btn-yellow font-semibold">
              <Link to="/profile">Open profile</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/materials">Browse materials</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-10"
    >
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/10 p-8 md:p-12">
        <div className="relative z-10">
          <Badge className="mb-4 bg-primary text-primary-foreground font-bold px-3 py-1 uppercase tracking-wider">
            Student Dashboard
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            {t.dashboard.welcome}, <span className="text-primary">{profile.name.split(" ")[0]}!</span> 👋
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.dashboard.quickStats}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold px-8 rounded-2xl shadow-xl shadow-primary/20">
              <Link to="/upload">
                <Upload className="h-5 w-5 mr-2" />
                {t.materials.uploadMaterial}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold rounded-2xl border-border bg-background/50 backdrop-blur-sm">
              <Link to="/materials">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                {t.materials.title}
              </Link>
            </Button>
          </div>
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 h-64 w-64 text-primary/5 -rotate-12 pointer-events-none" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.dashboard.totalPoints, value: profile.points, icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: t.dashboard.bookmarked, value: profile.bookmarks?.length || 0, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t.profile.badges, value: profile.badges?.length || 0, icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: t.profile.activity, value: profile.role, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", capitalize: true },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-border hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                <span className={cn("text-2xl font-black text-foreground", stat.capitalize && "capitalize")}>{stat.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">{t.common.loading}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  {t.dashboard.recentMaterials}
                </h2>
                <Button variant="link" asChild className="text-primary font-bold">
                  <Link to="/materials">{t.dashboard.viewAll}</Link>
                </Button>
              </div>
              
              {feed.length === 0 ? (
                <Card className="p-16 text-center border-2 border-dashed border-border bg-muted/5 rounded-3xl">
                  <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-10 w-10 text-muted-foreground opacity-20" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.dashboard.noMaterials}</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                    {t.dashboard.uploadFirst}
                  </p>
                  <Button asChild className="bg-primary text-primary-foreground font-bold px-8 h-12 rounded-xl">
                    <Link to="/upload">{t.materials.uploadMaterial}</Link>
                  </Button>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {feed.map((m) => <MaterialCard key={m.id} material={m} />)}
                </div>
              )}
            </section>

            {/* Trending Section */}
            <section>
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                {t.dashboard.recentDiscussions}
              </h2>
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="bg-secondary/50 p-1 border border-border inline-flex h-12 mb-6">
                  <TabsTrigger value="recent" className="px-6 h-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                    {t.materials.newest}
                  </TabsTrigger>
                  <TabsTrigger value="downloaded" className="px-6 h-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                    {t.materials.mostDownloaded}
                  </TabsTrigger>
                  <TabsTrigger value="rated" className="px-6 h-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                    {t.materials.highestRated}
                  </TabsTrigger>
                </TabsList>
                
                {(["recent", "downloaded", "rated"] as const).map((k) => (
                  <TabsContent key={k} value={k} className="focus-visible:ring-0">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {trending[k].length > 0 ? (
                        trending[k].map((m) => <MaterialCard key={m.id} material={m} />)
                      ) : (
                        <p className="text-muted-foreground text-center py-20 w-full col-span-2">{t.materials.noMaterials}</p>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </div>

          {/* Right Sidebar - Activity/Suggestions */}
          <div className="space-y-8">
            <Card className="p-6 border-border shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {t.community.leaderboard}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">1</div>
                    <span className="font-bold text-sm">{t.community.topContributor}</span>
                  </div>
                  <Badge variant="secondary" className="font-bold">2,450 pts</Badge>
                </div>
                <p className="text-xs text-muted-foreground text-center">{t.community.maintainStreak}</p>
              </div>
            </Card>

            <Card className="p-6 border-border bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-xl font-extrabold mb-2">{t.discussions.title}</h3>
                <p className="text-blue-100 text-sm mb-6">{t.discussions.searchDiscussions}</p>
                <Button asChild variant="secondary" className="w-full font-bold h-11 text-blue-700">
                  <Link to="/discussions">{t.nav.discussions}</Link>
                </Button>
              </div>
              <MessageSquare className="absolute -bottom-4 -right-4 h-24 w-24 text-white/10 -rotate-12" />
            </Card>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
