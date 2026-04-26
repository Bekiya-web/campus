import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Loader2 } from "lucide-react";
import { updateUserProfile } from "@/services/authService";
import { toast } from "sonner";
import { UNIVERSITIES, DEPARTMENTS, YEARS } from "@/data/universities";
import { supabase } from "@/integrations/supabase/client";

const CompleteProfile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    university: "", 
    department: "", 
    year: "" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      navigate("/dashboard", { replace: true });
    }
  }, [profile, navigate]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.university || !form.department || !form.year) {
      toast.error("Please complete all fields");
      return;
    }

    setLoading(true);
    try {
      const uni = UNIVERSITIES.find((u) => u.id === form.university);
      
      // Create initial profile
      const newProfile = {
        uid: user.id,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "Student",
        email: user.email || "",
        university: form.university,
        universityName: uni?.name || form.university,
        department: form.department,
        year: form.year,
        role: "student",
        points: 0,
        badges: [],
        bookmarks: [],
        createdAt: new Date().toISOString()
      };

      const { error } = await supabase.from("users").upsert(newProfile);
      if (error) throw error;

      await refreshProfile();
      toast.success("Profile completed! Welcome to EduNexus.");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-blue-600 mx-auto mb-4 flex items-center justify-center shadow-elegant">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">One last step</h1>
          <p className="text-muted-foreground mt-2">Tell us about your studies to finish setting up your account</p>
        </div>

        <Card className="p-8 shadow-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground font-semibold text-sm">University</Label>
              <Select value={form.university} onValueChange={(v) => set("university", v)}>
                <SelectTrigger className="h-11 text-foreground bg-background"><SelectValue placeholder="Select your university" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {UNIVERSITIES.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground font-semibold text-sm">Department</Label>
                <Select value={form.department} onValueChange={(v) => set("department", v)}>
                  <SelectTrigger className="h-11 text-foreground bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-semibold text-sm">Year</Label>
                <Select value={form.year} onValueChange={(v) => set("year", v)}>
                  <SelectTrigger className="h-11 text-foreground bg-background"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-base mt-2 shadow-lg shadow-blue-500/20"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Complete setup
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfile;
