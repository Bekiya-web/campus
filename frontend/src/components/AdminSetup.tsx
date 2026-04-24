import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Crown, Key } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminSetup = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple admin key for demo purposes
  const ADMIN_KEY = "edunexus2024admin";

  const handleMakeAdmin = async () => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    if (adminKey !== ADMIN_KEY) {
      toast.error("Invalid admin key");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('uid', user.id);

      if (error) throw error;

      await refreshProfile();
      toast.success("Admin privileges granted! Refresh the page to see admin menu.");
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to grant admin privileges");
    } finally {
      setLoading(false);
    }
  };

  if (profile?.role === 'admin') {
    return (
      <Card className="max-w-md mx-auto p-6 text-center">
        <Crown className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-2">Admin Access Granted</h2>
        <p className="text-muted-foreground mb-4">
          You have admin privileges. Access the admin dashboard from the navigation menu.
        </p>
        <Button 
          onClick={() => window.location.href = '/admin'}
          className="w-full"
        >
          Go to Admin Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <Shield className="h-16 w-16 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-2">Admin Setup</h2>
        <p className="text-muted-foreground">
          Enter the admin key to gain administrative privileges
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="adminKey">Admin Key</Label>
          <Input
            id="adminKey"
            type="password"
            placeholder="Enter admin key..."
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleMakeAdmin}
          disabled={loading || !adminKey.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Key className="h-4 w-4 mr-2 animate-spin" />
              Granting Access...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Grant Admin Access
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>For Demo:</strong> Admin key is <code>edunexus2024admin</code>
        </p>
      </div>
    </Card>
  );
};