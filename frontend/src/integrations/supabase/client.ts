import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://iwymkieoscqjjiwrdyxe.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eW1raWVvc2Nxamppd3JkeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDk5MjIsImV4cCI6MjA5MjI4NTkyMn0.R50ftSHlfvD432-73upIlnNlVhzc68XbVVDmf8OjtrM";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
