import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";
import { loginUser } from "@/services/authService";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
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
          <h1 className="text-3xl font-extrabold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Log in to continue to Campus Helper</p>
        </div>

        <Card className="p-8 shadow-card border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold text-sm">Email</Label>
              <Input
                id="email" type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu.et"
                className="h-11 text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold text-sm">Password</Label>
              <Input
                id="password" type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="h-11 text-foreground"
              />
            </div>
            <Button
              type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-base"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Log in
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
