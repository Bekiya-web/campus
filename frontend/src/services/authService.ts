import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  university: string;
  universityName: string;
  department: string;
  year: string;
  role: "student" | "admin";
  points: number;
  badges: string[];
  bookmarks: string[];
  avatar?: string;
  bio?: string;
  canUpload?: boolean;
  canChat?: boolean;
  canRate?: boolean;
  canComment?: boolean;
  canDownload?: boolean;
  isBanned?: boolean;
  createdAt?: string;
  // User preferences
  dark_mode?: boolean;
  email_notifications?: boolean;
  push_notifications?: boolean;
  public_profile?: boolean;
  show_email?: boolean;
}

export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
  university: string;
  universityName: string;
  department: string;
  year: string;
}): Promise<UserProfile> {
  const email = params.email.trim().toLowerCase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: params.password,
    options: { data: { name: params.name } },
  });
  if (error) {
    if (error.message.toLowerCase().includes("already")) {
      const err = new Error("This email is already registered.");
      (err as Error & { code: string }).code = "auth/email-already-in-use";
      throw err;
    }
    throw error;
  }
  const authUser = data.user;
  if (!authUser) throw new Error("Could not create account");

  const createdAt = new Date().toISOString();

  const profile: UserProfile = {
    uid: authUser.id,
    name: params.name,
    email,
    university: params.university,
    universityName: params.universityName,
    department: params.department,
    year: params.year,
    role: "student",
    points: 0,
    badges: [],
    bookmarks: [],
    createdAt,
  };

  const { error: profileErr } = await supabase.from("users").upsert(profile, { onConflict: "uid" });
  if (profileErr) throw profileErr;
  return profile;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("users").select("*").eq("uid", uid).maybeSingle();
  if (error) throw error;
  return (data as UserProfile | null) ?? null;
}

export function subscribeAuth(cb: (user: User | null) => void) {
  supabase.auth.getUser().then(({ data }) => cb(data.user ?? null));
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user ?? null);
  });
  return () => data.subscription.unsubscribe();
}

export async function awardPoints(uid: string, amount: number) {
  const { data, error } = await supabase.from("users").select("points").eq("uid", uid).maybeSingle();
  if (error) throw error;
  const current = data?.points ?? 0;
  const { error: updateError } = await supabase.from("users").update({ points: current + amount }).eq("uid", uid);
  if (updateError) throw updateError;
}

export async function addBadge(uid: string, badge: string) {
  const { data, error } = await supabase.from("users").select("badges").eq("uid", uid).maybeSingle();
  if (error) throw error;
  const badges: string[] = data?.badges ?? [];
  if (badges.includes(badge)) return;
  const { error: updateError } = await supabase.from("users").update({ badges: [...badges, badge] }).eq("uid", uid);
  if (updateError) throw updateError;
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  const { error } = await supabase.from("users").update(updates).eq("uid", uid);
  if (error) throw error;
}
