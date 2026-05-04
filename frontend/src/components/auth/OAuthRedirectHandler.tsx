import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Component that handles OAuth redirects from Supabase
 * Checks if URL contains auth tokens and redirects appropriately
 */
export function OAuthRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have OAuth tokens in the URL hash
    const hash = location.hash;
    
    if (hash && (hash.includes('access_token') || hash.includes('error'))) {
      // Give Supabase client time to process the session
      const timer = setTimeout(() => {
        // Clear the hash and redirect to dashboard
        window.location.hash = '';
        navigate("/dashboard", { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return null;
}
