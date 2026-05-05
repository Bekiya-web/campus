import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UNIVERSITIES } from "@/data/universities";
import { uploadMaterial } from "@/services/uploadService";
import { ensureCourseExists } from "@/services/courseService";
import { toast } from "sonner";
import { Upload as UploadIcon, FileText, Loader2, GraduationCap, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CompressionResult, formatFileSize } from "@/utils/fileCompression";

const FreshmanUpload = () => {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    university: profile?.university || "",
    course: "",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Check if user is admin
  if (profile?.role !== 'admin') {
    return (
      <div className="container max-w-2xl py-20">
        <Card className="p-8 text-center border-red-200 bg-red-50/50">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">{t.freshman.adminAccessOnly}</h2>
          <p className="text-red-700 mb-6">
            {t.freshman.onlyAdminsCanUpload}
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/upload')} variant="outline">
              {t.freshman.uploadGeneralMaterial}
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              {t.freshman.goToDashboard}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") return toast.error("Only PDF files are allowed");
    if (f.size > 20 * 1024 * 1024) return toast.error("File must be under 20MB");
    setCompressionResult(null);
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
    
    // Check if user is restricted from uploading
    if (profile?.canUpload === false) {
      toast.error("You have been restricted from uploading materials by an administrator.");
      return;
    }
    
    if (!form.title || !form.course || !form.university)
      return toast.error("Please fill in all required fields");

    setLoading(true);
    try {
      const uni = UNIVERSITIES.find((u) => u.id === form.university);
      
      // Sanitize course name to create a URL-friendly code
      const courseCode = form.course
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .trim();
      
      await uploadMaterial({
        file,
        title: form.title,
        description: form.description,
        university: form.university,
        universityName: uni?.name || form.university,
        department: "General", // Default department for freshman materials
        year: "1st Year", // Always Year 1 for freshman materials
        course: courseCode, // Use sanitized code instead of raw name
        uploadedBy: user.id,
        uploaderName: profile?.name || user.user_metadata?.name || user.email || "Admin",
        status: "approved", // Freshman materials uploaded by admin are auto-approved
        onProgress: setProgress,
        onCompressionComplete: setCompressionResult,
      });

      // Ensure the course exists in the courses table for visibility
      await ensureCourseExists(courseCode, form.course, "General");

      toast.success("Freshman material uploaded successfully!");
      navigate("/freshman-courses");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">{t.freshman.uploadFreshmanMaterial}</h1>
            <p className="text-sm text-muted-foreground">{t.freshman.year1ResourcesFor}</p>
          </div>
        </div>
        <Alert className="border-blue-200 bg-blue-50/50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 text-sm">
            {t.freshman.materialsWillAppear}
          </AlertDescription>
        </Alert>
      </div>

      <Card className="p-6 md:p-8 shadow-card border-border">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* File drop */}
          <div>
            <Label className="mb-2 block text-foreground font-semibold text-sm">{t.freshman.pdfFile} *</Label>
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
                  <p className="text-sm font-semibold text-foreground">{t.freshman.clickToChoose}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.freshman.pdfOnly}</p>
                </>
              )}
            </label>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold text-sm">{t.freshman.titleRequired}</Label>
            <Input 
              value={form.title} 
              onChange={(e) => set("title", e.target.value)} 
              placeholder={t.freshman.exampleTitle}
              required 
              className="h-11 text-foreground" 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-semibold text-sm">{t.freshman.descriptionLabel}</Label>
            <Textarea 
              value={form.description} 
              onChange={(e) => set("description", e.target.value)} 
              placeholder={t.freshman.briefDescription}
              rows={3} 
              className="text-foreground" 
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">{t.freshman.universityRequired}</Label>
              <Select value={form.university} onValueChange={(v) => set("university", v)}>
                <SelectTrigger className="h-11 text-foreground">
                  <SelectValue placeholder={t.freshman.selectUniversity} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {UNIVERSITIES.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">{t.freshman.courseRequired}</Label>
              <Input 
                value={form.course} 
                onChange={(e) => set("course", e.target.value)} 
                placeholder={t.freshman.exampleCourse}
                required 
                className="h-11 text-foreground" 
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">{t.freshman.freshmanHubUpload}</p>
                <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-xs">
                  <li>• {t.freshman.autoSetYear1}</li>
                  <li>• {t.freshman.deptSetGeneral}</li>
                  <li>• {t.freshman.willAppearInCourses}</li>
                  <li>• {t.freshman.organizedByCourse}</li>
                </ul>
              </div>
            </div>
          </div>

          {loading && progress > 0 && (
            <div className="space-y-2">
              <Progress value={progress} className="[&>div]:bg-blue-600" />
              <p className="text-xs text-muted-foreground">{t.freshman.uploading} {Math.round(progress)}%</p>
            </div>
          )}

          {compressionResult && (
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 dark:border-blue-800 dark:bg-blue-950/30 p-3">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Compression details</p>
              <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">
                Original: {formatFileSize(compressionResult.originalSize)} {"->"} Uploaded: {formatFileSize(compressionResult.compressedSize)}
              </p>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Size change: {compressionResult.compressionRatio >= 0 ? "-" : "+"}
                {Math.abs(compressionResult.compressionRatio).toFixed(1)}%
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/upload')}
              className="flex-1"
            >
              {t.freshman.uploadGeneralInstead}
            </Button>
            <Button
              type="submit" 
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                  {t.freshman.uploading}
                </>
              ) : (
                <>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  {t.freshman.uploadToHub}
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FreshmanUpload;
