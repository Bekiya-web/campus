import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, Loader2, ArrowLeft } from "lucide-react";
import { loginUser, signInWithGoogle } from "@/services/authService";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success(t.auth.loginSuccess);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || t.auth.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-blue-600 mx-auto mb-4 flex items-center justify-center shadow-elegant">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">{t.dashboard.welcome}</h1>
          <p className="text-muted-foreground mt-2">{t.auth.login} {t.common.appName}</p>
        </div>

        <Card className="p-8 shadow-card border-border">
          <div className="space-y-4">
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
              {t.auth.signInWithGoogle}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t.auth.email} {t.auth.login}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-semibold text-sm">{t.auth.email}</Label>
                <Input
                  id="email" type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu.et"
                  className="h-11 text-foreground bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold text-sm">{t.auth.password}</Label>
                <Input
                  id="password" type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-foreground bg-background"
                />
              </div>
              <Button
                type="submit" disabled={loading || googleLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-base shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {t.nav.logIn}
              </Button>
            </form>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t.auth.dontHaveAccount}{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">{t.auth.register}</Link>
          </p>
        </Card>

        {/* Back to Home Button */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t.common.back} {t.nav.home}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
