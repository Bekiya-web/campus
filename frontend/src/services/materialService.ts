import { supabase } from "@/integrations/supabase/client";
import { awardPoints } from "./authService";

export interface Material {
  id: string;
  title: string;
  description: string;
  university: string;
  universityName: string;
  department: string;
  year: string;
  course: string;
  fileURL: string;
  storagePath: string;
  fileSize: number;
  uploadedBy: string;
  uploaderName: string;
  createdAt: string;
  ratingAvg: number;
  ratingCount: number;
  downloadCount: number;
}

export interface MaterialFilters {
  university?: string;
  department?: string;
  year?: string;
  course?: string;
}

export async function fetchMaterials(filters: MaterialFilters = {}, max = 50): Promise<Material[]> {
  console.log("fetchMaterials: Called with filters:", filters, "max:", max);
  let q = supabase.from("materials").select("*").order("createdAt", { ascending: false }).limit(max);
  if (filters.university) q = q.eq("university", filters.university);
  if (filters.department) q = q.eq("department", filters.department);
  if (filters.year) q = q.eq("year", filters.year);
  if (filters.course) q = q.eq("course", filters.course);
  
  console.log("fetchMaterials: Executing query...");
  const { data, error } = await q;
  console.log("fetchMaterials: Query result:", { data, error });
  
  if (error) throw error;
  return (data ?? []) as Material[];
}

export async function fetchTrending(kind: "downloaded" | "rated" | "recent", max = 12): Promise<Material[]> {
  let field: "createdAt" | "downloadCount" | "ratingAvg" = "createdAt";
  if (kind === "downloaded") field = "downloadCount";
  if (kind === "rated") field = "ratingAvg";
  const { data, error } = await supabase.from("materials").select("*").order(field, { ascending: false }).limit(max);
  if (error) throw error;
  return (data ?? []) as Material[];
}

export async function fetchMaterial(id: string): Promise<Material | null> {
  const { data, error } = await supabase.from("materials").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Material | null) ?? null;
}

export async function fetchMaterialsByIds(ids: string[]): Promise<Material[]> {
  if (!ids.length) return [];
  const results = await Promise.all(ids.map(fetchMaterial));
  return results.filter(Boolean) as Material[];
}

export async function fetchMaterialsByUser(uid: string): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("uploadedBy", uid)
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Material[];
}

export async function incrementDownload(id: string) {
  const current = await fetchMaterial(id);
  if (!current) return;
  const { error } = await supabase
    .from("materials")
    .update({ downloadCount: (current.downloadCount || 0) + 1 })
    .eq("id", id);
  if (error) throw error;
}

export async function rateMaterial(materialId: string, uid: string, rating: number) {
  const { data: existingRow } = await supabase
    .from("material_ratings")
    .select("uid")
    .eq("material_id", materialId)
    .eq("uid", uid)
    .maybeSingle();

  const { error: upsertError } = await supabase
    .from("material_ratings")
    .upsert({ material_id: materialId, uid, rating }, { onConflict: "material_id,uid" });
  if (upsertError) throw upsertError;

  const { data: ratingsRows, error: ratingsError } = await supabase
    .from("material_ratings")
    .select("rating")
    .eq("material_id", materialId);
  if (ratingsError) throw ratingsError;
  const ratings = (ratingsRows ?? []).map((r) => Number(r.rating));
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  const { error: updateMaterialError } = await supabase
    .from("materials")
    .update({ ratingAvg: Number(avg.toFixed(2)), ratingCount: ratings.length })
    .eq("id", materialId);
  if (updateMaterialError) throw updateMaterialError;

  if (!existingRow) {
    const mat = await fetchMaterial(materialId);
    if (mat) await awardPoints(mat.uploadedBy, 2);
  }
}

export async function getUserRating(materialId: string, uid: string): Promise<number | null> {
  const { data, error } = await supabase
    .from("material_ratings")
    .select("rating")
    .eq("material_id", materialId)
    .eq("uid", uid)
    .maybeSingle();
  if (error) throw error;
  return data ? Number(data.rating) : null;
}

export function searchMaterials(items: Material[], term: string): Material[] {
  if (!term.trim()) return items;
  const t = term.toLowerCase();
  return items.filter(
    (m) =>
      m.title?.toLowerCase().includes(t) ||
      m.course?.toLowerCase().includes(t) ||
      m.description?.toLowerCase().includes(t)
  );
}
