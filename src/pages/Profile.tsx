import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchMaterialsByIds, fetchMaterialsByUser, Material } from "@/services/materialService";
import { MaterialCard } from "@/components/MaterialCard";
import { Award, Trophy, Loader2, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { profile } = useAuth();
  const [uploads, setUploads] = useState<Material[]>([]);
  const [bookmarks, setBookmarks] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    Promise.all([
      fetchMaterialsByUser(profile.uid),
      fetchMaterialsByIds(profile.bookmarks || []),
    ]).then(([u, b]) => {
      setUploads(u);
      setBookmarks(b);
    }).finally(() => setLoading(false));
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="container max-w-5xl py-8">
      {/* Profile card */}
      <Card className="p-6 md:p-8 mb-6 border-border shadow-card">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="h-20 w-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-elegant text-2xl font-extrabold text-white shrink-0">
            {profile.name[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-foreground">{profile.name}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{profile.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="text-foreground font-semibold">
                <GraduationCap className="h-3 w-3 mr-1" />{profile.universityName}
              </Badge>
              <Badge variant="outline" className="text-foreground font-semibold">{profile.department}</Badge>
              <Badge variant="outline" className="text-foreground font-semibold">{profile.year}</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-5 py-3 rounded-xl bg-secondary border border-border">
              <Award className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xl font-extrabold text-foreground">{profile.points}</div>
              <div className="text-xs text-muted-foreground font-medium">points</div>
            </div>
            <div className="text-center px-5 py-3 rounded-xl bg-secondary border border-border">
              <Trophy className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-xl font-extrabold text-foreground">{profile.badges?.length || 0}</div>
              <div className="text-xs text-muted-foreground font-medium">badges</div>
            </div>
          </div>
        </div>
        {profile.badges?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
            {profile.badges.map((b) => (
              <Badge key={b} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Trophy className="h-3 w-3 mr-1" />{b}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <Tabs defaultValue="uploads">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="uploads" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
            My uploads ({uploads.length})
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
            Bookmarks ({bookmarks.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="uploads" className="mt-5">
          {loading ? (
            <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-600" /></div>
          ) : uploads.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">You haven't uploaded any materials yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploads.map((m) => <MaterialCard key={m.id} material={m} />)}
            </div>
          )}
        </TabsContent>
        <TabsContent value="bookmarks" className="mt-5">
          {loading ? (
            <div className="py-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-blue-600" /></div>
          ) : bookmarks.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">No bookmarks yet — save materials from any card.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((m) => <MaterialCard key={m.id} material={m} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
