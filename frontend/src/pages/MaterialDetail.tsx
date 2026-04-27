import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMaterial, getUserRating, rateMaterial, Material, incrementDownload } from "@/services/materialService";
import { updateMaterial } from "@/services/uploadService";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingStars } from "@/components/common/RatingStars";
import { FeatureRequestDialog } from "@/components/features/FeatureRequestDialog";
import { DEPARTMENTS, YEARS } from "@/data/universities";
import { Loader2, Download, ArrowLeft, FileText, User, Calendar, MessageCircle, Edit } from "lucide-react";
import { toast } from "sonner";

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [material, setMaterial] = useState<Material | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    course: "",
    department: "",
    year: "",
  });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const m = await fetchMaterial(id);
    setMaterial(m);
    if (m) {
      setEditForm({
        title: m.title,
        description: m.description || "",
        course: m.course,
        department: m.department,
        year: m.year,
      });
    }
    if (user && id) {
      const r = await getUserRating(id, user.id);
      setUserRating(r);
    }
    setLoading(false);
  };

  useEffect(() => { 
    load(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  const handleRate = async (n: number) => {
    if (!user || !id) return toast.error("Please log in to rate");
    
    // Check if user is restricted from rating
    if (profile?.canRate === false) {
      toast.error("You have been restricted from rating materials by an administrator.");
      return;
    }
    
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
    
    // Check if user is restricted from downloading
    if (profile?.canDownload === false) {
      toast.error("You have been restricted from downloading materials by an administrator.");
      return;
    }
    
    await incrementDownload(material.id);
    window.open(material.fileURL, "_blank");
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setSaving(true);
    try {
      await updateMaterial({
        id,
        title: editForm.title,
        description: editForm.description,
        course: editForm.course,
        department: editForm.department,
        year: editForm.year,
      });
      
      toast.success("Material updated successfully!");
      setEditOpen(false);
      await load(); // Reload the material
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update material");
    } finally {
      setSaving(false);
    }
  };

  const canEdit = user && profile?.role === 'admin';
  
  // Debug: Log the edit permission
  console.log('Edit Permission Check:', {
    user: !!user,
    profile: !!profile,
    role: profile?.role,
    canEdit
  });

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
          <div className="flex flex-col gap-3 shrink-0">
            <Button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-soft font-semibold"
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            
            {/* Edit button - Admin only */}
            {canEdit && (
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                    <Edit className="h-4 w-4 mr-2" /> Edit Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Material</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEdit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Course *</Label>
                        <Input
                          value={editForm.course}
                          onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Department *</Label>
                        <Select
                          value={editForm.department}
                          onValueChange={(v) => setEditForm({ ...editForm, department: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-72">
                            {DEPARTMENTS.map((d) => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Year *</Label>
                        <Select
                          value={editForm.year}
                          onValueChange={(v) => setEditForm({ ...editForm, year: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((y) => (
                              <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            
            {/* Global Course Chat Link and feature request button */}
            {user && (
              <>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Link to={`/global-chat?course=${encodeURIComponent(material.course)}`}>
                    <MessageCircle className="h-4 w-4 mr-2" /> Join Discussion
                  </Link>
                </Button>
                <FeatureRequestDialog material={material} />
              </>
            )}
          </div>
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
