import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMaterial, getUserRating, rateMaterial, Material, incrementDownload } from "@/services/materialService";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/RatingStars";
import { Loader2, Download, ArrowLeft, FileText, User, Calendar } from "lucide-react";
import { toast } from "sonner";

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [material, setMaterial] = useState<Material | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const m = await fetchMaterial(id);
    setMaterial(m);
    if (user && id) {
      const r = await getUserRating(id, user.id);
      setUserRating(r);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id, user]);

  const handleRate = async (n: number) => {
    if (!user || !id) return toast.error("Please log in to rate");
    try {
      await rateMaterial(id, user.id, n);
      setUserRating(n);
      toast.success("Thanks for rating!");
      await load();
    } catch {
      toast.error("Failed to save rating");
    }
  };

  const handleDownload = async () => {
    if (!material) return;
    await incrementDownload(material.id);
    window.open(material.fileURL, "_blank");
  };

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    </div>
  );

  if (!material) return (
    <div className="container py-20 text-center">
      <p className="text-muted-foreground font-medium">Material not found.</p>
      <Button asChild variant="outline" className="mt-4 text-foreground border-border">
        <Link to="/materials">Back to materials</Link>
      </Button>
    </div>
  );

  return (
    <div className="container max-w-5xl py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
        <Link to="/materials"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>

      <Card className="p-6 md:p-8 mb-6 shadow-card border-border">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-soft shrink-0">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{material.title}</h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {material.description || "No description provided."}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-foreground font-semibold">{material.course}</Badge>
              <Badge variant="outline" className="text-foreground font-semibold">{material.department}</Badge>
              <Badge variant="outline" className="text-foreground font-semibold">{material.year}</Badge>
              <Badge variant="outline" className="text-foreground font-semibold">{material.universityName}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="h-4 w-4" /> {material.uploaderName}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Download className="h-4 w-4" /> {material.downloadCount || 0} downloads
              </span>
              {material.createdAt && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-4 w-4" /> {new Date(material.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-soft font-semibold shrink-0"
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-border shadow-card md:col-span-2">
          <h2 className="font-bold text-foreground mb-3">Preview</h2>
          <div className="rounded-xl overflow-hidden border border-border bg-secondary/30" style={{ height: "70vh" }}>
            <iframe src={material.fileURL} title={material.title} className="w-full h-full" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            If preview doesn't load, click Download to open the PDF directly.
          </p>
        </Card>

        <Card className="p-6 border-border shadow-card h-fit">
          <h2 className="font-bold text-foreground mb-1">Rate this material</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Average: <strong className="text-foreground">{material.ratingAvg?.toFixed(1) || "0.0"}</strong>{" "}
            ({material.ratingCount || 0} ratings)
          </p>
          <div className="mb-4">
            <RatingStars value={userRating || 0} onChange={handleRate} size={26} />
          </div>
          <p className="text-xs text-muted-foreground">
            {userRating
              ? `You rated this ${userRating} stars. Click again to change.`
              : user ? "Click a star to rate" : "Log in to rate"}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MaterialDetail;
