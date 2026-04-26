import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container py-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-muted-foreground">Checking permissions...</span>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return (
      <div className="container py-20 min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center shadow-xl border-red-100 bg-red-50/50">
          <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-red-900">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You do not have the required permissions to access the admin dashboard. 
            This area is restricted to system administrators.
          </p>
          <div className="space-x-4">
            <a href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Return Home
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return children;
}
