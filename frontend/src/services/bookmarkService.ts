import { supabase } from "@/integrations/supabase/client";

export async function toggleBookmark(uid: string, materialId: string): Promise<boolean> {
  const { data, error } = await supabase.from("users").select("bookmarks").eq("uid", uid).maybeSingle();
  if (error) throw error;
  const bookmarks: string[] = data?.bookmarks || [];
  const next = bookmarks.includes(materialId)
    ? bookmarks.filter((x) => x !== materialId)
    : [...bookmarks, materialId];
  const { error: updateError } = await supabase.from("users").update({ bookmarks: next }).eq("uid", uid);
  if (updateError) throw updateError;
  return next.includes(materialId);
}
