import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UNIVERSITIES, DEPARTMENTS, YEARS } from "@/data/universities";
import { uploadMaterial } from "@/services/uploadService";
import { toast } from "sonner";
import { Upload as UploadIcon, FileText, Loader2 } from "lucide-react";

const Upload = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "",
    university: profile?.university || "",
    department: profile?.department || "",
    year: profile?.year || "",
    course: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") return toast.error("Only PDF files are allowed");
    if (f.size > 25 * 1024 * 1024) return toast.error("File must be under 25MB");
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF file");
    if (!user) {
      toast.error("Please log in to continue uploading");
      navigate("/login");
      return;
    }
    if (!form.title || !form.course || !form.university || !form.department || !form.year)
      return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      const uni = UNIVERSITIES.find((u) => u.id === form.university);
      const id = await uploadMaterial({
        file, ...form,
        universityName: uni?.name || form.university,
        uploadedBy: user.id,
        uploaderName: profile?.name || user.user_metadata?.name || user.email || "Student",
        onProgress: setProgress,
      });
      toast.success("Material uploaded! +10 points");
      navigate(`/materials/${id}`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Upload material</h1>
        <p className="text-muted-foreground mt-1">Share a PDF with your fellow students</p>
      </div>
      <Card className="p-6 md:p-8 shadow-card border-border">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File drop */}
          <div>
            <Label className="mb-2 block text-foreground font-semibold text-sm">PDF file</Label>
            <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-smooth cursor-pointer">
              <input type="file" accept="application/pdf" hidden onChange={(e) => handleFile(e.target.files?.[0] || null)} />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-sm text-foreground">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
              ) : (
                <>
                  <UploadIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-semibold text-foreground">Click to choose a PDF</p>
                  <p className="text-xs text-muted-foreground mt-1">PDFs only · Max 25MB</p>
                </>
              )}
            </label>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold text-sm">Title</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Calculus II Final Exam 2023" required className="h-11 text-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground font-semibold text-sm">Description</Label>
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Quick summary of what's inside..." rows={3} className="text-foreground" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">University</Label>
              <Select value={form.university} onValueChange={(v) => set("university", v)}>
                <SelectTrigger className="h-11 text-foreground"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {UNIVERSITIES.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">Department</Label>
              <Select value={form.department} onValueChange={(v) => set("department", v)}>
                <SelectTrigger className="h-11 text-foreground"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">Year</Label>
              <Select value={form.year} onValueChange={(v) => set("year", v)}>
                <SelectTrigger className="h-11 text-foreground"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">Course</Label>
              <Input value={form.course} onChange={(e) => set("course", e.target.value)} placeholder="e.g. Calculus II" required className="h-11 text-foreground" />
            </div>
          </div>

          {loading && progress > 0 && (
            <div className="space-y-2">
              <Progress value={progress} className="[&>div]:bg-blue-600" />
              <p className="text-xs text-muted-foreground">Uploading… {Math.round(progress)}%</p>
            </div>
          )}

          <Button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-base"
          >
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading…</> : "Upload material"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Upload;
