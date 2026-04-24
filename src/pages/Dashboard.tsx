import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMaterials, fetchTrending, Material } from "@/services/materialService";
import { MaterialCard } from "@/components/MaterialCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Sparkles, Award, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { profile } = useAuth();
  const [feed, setFeed] = useState<Material[]>([]);
  const [trending, setTrending] = useState<Record<string, Material[]>>({ recent: [], downloaded: [], rated: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      try {
        console.log("Dashboard: Fetching materials for profile:", profile);
        const [own, recent, downloaded, rated] = await Promise.all([
          fetchMaterials({}, 8), // Remove filters temporarily to show all materials
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
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Welcome back, {profile.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {profile.department} · {profile.year} · {profile.universityName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={async () => {
              console.log("=== DEBUG: Checking all materials ===");
              try {
                const allMaterials = await fetchMaterials({}, 100);
                console.log("All materials in database:", allMaterials);
                
                const myMaterials = await fetchMaterials({ 
                  university: profile.university, 
                  department: profile.department 
                }, 100);
                console.log("My filtered materials:", myMaterials);
                
                console.log("Profile data:", profile);
              } catch (error) {
                console.error("Debug error:", error);
              }
            }}
            variant="outline" 
            size="sm"
          >
            🐛 Debug
          </Button>
          <Button asChild className="btn-yellow font-semibold shadow-soft">
            <Link to="/upload"><Upload className="h-4 w-4 mr-2" /> Upload material</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="interactive-card p-5 border-border shadow-card">
          <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Your points</div>
          <div className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> {profile.points}
          </div>
        </Card>
        <Card className="interactive-card p-5 border-border shadow-card">
          <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Bookmarks</div>
          <div className="text-2xl font-extrabold text-foreground">{profile.bookmarks?.length || 0}</div>
        </Card>
        <Card className="interactive-card p-5 border-border shadow-card">
          <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Badges</div>
          <div className="text-2xl font-extrabold text-foreground">{profile.badges?.length || 0}</div>
        </Card>
        <Card className="interactive-card p-5 border-border shadow-card bg-gradient-primary text-foreground">
          <div className="text-xs font-semibold opacity-80 mb-1 uppercase tracking-wide">Role</div>
          <div className="text-2xl font-extrabold capitalize">{profile.role}</div>
        </Card>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Personalized */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> For your department
            </h2>
            <div className="mb-4 text-sm text-muted-foreground">
              Debug: Looking for materials with university="{profile.university}" and department="{profile.department}"
            </div>
            {feed.length === 0 ? (
              <Card className="p-10 text-center border-dashed border-border">
                <p className="text-muted-foreground mb-4">
                  No materials yet for {profile.department} at {profile.universityName}.
                </p>
                <Button asChild className="btn-yellow font-semibold">
                  <Link to="/upload">Be the first to upload</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {feed.map((m) => <MaterialCard key={m.id} material={m} />)}
              </div>
            )}
          </section>

          {/* Trending */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Trending
            </h2>
            <Tabs defaultValue="recent">
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="recent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                  Recently uploaded
                </TabsTrigger>
                <TabsTrigger value="downloaded" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                  Most downloaded
                </TabsTrigger>
                <TabsTrigger value="rated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">
                  Highest rated
                </TabsTrigger>
              </TabsList>
              {(["recent", "downloaded", "rated"] as const).map((k) => (
                <TabsContent key={k} value={k} className="mt-5">
                  {trending[k].length === 0 ? (
                    <p className="text-muted-foreground text-sm py-8 text-center">No materials yet.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {trending[k].map((m) => <MaterialCard key={m.id} material={m} />)}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
