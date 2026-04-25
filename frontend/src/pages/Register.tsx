import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Loader2 } from "lucide-react";
import { registerUser, signInWithGoogle } from "@/services/authService";
import { toast } from "sonner";
import { UNIVERSITIES, DEPARTMENTS, YEARS } from "@/data/universities";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", university: "", department: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  const getFriendlyRegisterError = (err: unknown) => {
    if (err && typeof err === "object" && "code" in err) {
      const code = String((err as { code?: string }).code || "");
      switch (code) {
        case "auth/email-already-in-use":
          return "This email is already registered. Please log in, or use a different email.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/weak-password":
          return "Password is too weak. Use at least 6 characters.";
        case "auth/network-request-failed":
          return "Network error. Check your internet and try again.";
        case "42P01":
          return "Supabase tables are not set up yet. Run `supabase/schema.sql` in Supabase SQL Editor, then try again.";
        case "42501":
          return "Supabase row-level security blocked profile creation. Run `supabase/schema.sql` to apply the required policies.";
        case "over_email_send_rate_limit":
          return "Too many signup emails were sent recently. Wait a few minutes and try again, or disable email confirmation temporarily in Supabase Auth settings.";
        default:
          if (code.startsWith("auth/")) {
            return "Could not create account right now. Please try again.";
          }
          return `Signup backend error (${code}). Check Supabase setup and try again.`;
      }
    }
    if (err && typeof err === "object" && "message" in err) {
      const msg = String((err as { message?: string }).message || "");
      if (/row-level security|permission denied/i.test(msg)) {
        return "Supabase policy blocked profile creation. Run `supabase/schema.sql` in SQL Editor.";
      }
      if (/relation .* does not exist|table .* does not exist/i.test(msg)) {
        return "Supabase tables are missing. Run `supabase/schema.sql` in SQL Editor.";
      }
      if (/email.*already/i.test(msg)) {
        return "This email is already registered. Please log in instead.";
      }
      if (/rate limit|over_email_send_rate_limit|too many requests/i.test(msg)) {
        return "Signup email limit reached. Wait a few minutes, then try again. You can also disable Confirm email in Supabase Auth settings for development.";
      }
      return msg || "Registration failed";
    }
    return "Registration failed";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.university || !form.department || !form.year) {
      toast.error("Please complete your academic info"); return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters"); return;
    }
    setLoading(true);
    try {
      const uni = UNIVERSITIES.find((u) => u.id === form.university);
      await registerUser({ ...form, universityName: uni?.name || form.university });
      toast.success("Account created! Welcome to EduNexus");
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const message = getFriendlyRegisterError(err);
      toast.error(message);
      if (err && typeof err === "object" && (err as { code?: string }).code === "auth/email-already-in-use") {
        navigate("/login", { replace: true, state: { email: form.email } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-blue-600 mx-auto mb-4 flex items-center justify-center shadow-elegant">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">Join EduNexus</h1>
          <p className="text-muted-foreground mt-2">Connect with 10,000+ students from 30+ universities</p>
        </div>

        <Card className="p-8 shadow-card border-border">
          <div className="space-y-6">
            <Button
              variant="outline"
              type="button"
              disabled={googleLoading || loading}
              onClick={handleGoogleSignIn}
              className="w-full h-11 border-border bg-background hover:bg-muted text-foreground font-medium flex items-center justify-center gap-3 transition-smooth"
            >
              {googleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-semibold text-sm">Full name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} className="h-11 text-foreground bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-semibold text-sm">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className="h-11 text-foreground bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold text-sm">Password</Label>
                <Input id="password" type="password" required minLength={6} value={form.password} onChange={(e) => set("password", e.target.value)} className="h-11 text-foreground bg-background" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-semibold text-sm">University</Label>
                <Select value={form.university} onValueChange={(v) => set("university", v)}>
                  <SelectTrigger className="h-11 text-foreground bg-background"><SelectValue placeholder="Select your university" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {UNIVERSITIES.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
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
                type="submit" disabled={loading || googleLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-base mt-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create account
              </Button>
            </form>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
