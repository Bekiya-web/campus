import { awardPoints, addBadge } from "./authService";
import { createNotification } from "./notificationService";
import { supabase } from "@/integrations/supabase/client";

export interface UploadMaterialParams {
  file: File;
  title: string;
  description: string;
  university: string;
  universityName: string;
  department: string;
  year: string;
  course: string;
  uploadedBy: string;
  uploaderName: string;
  onProgress?: (pct: number) => void;
}

export async function uploadMaterial(p: UploadMaterialParams): Promise<string> {
  console.log("uploadMaterial: Starting upload with params:", p);
  
  if (p.file.type !== "application/pdf") throw new Error("Only PDF files are allowed");
  if (p.file.size > 25 * 1024 * 1024) throw new Error("File must be under 25MB");

  const path = `${p.university}/${p.department}/${Date.now()}_${p.file.name}`;
  console.log("uploadMaterial: Upload path:", path);
  
  p.onProgress?.(25);
  const { error: uploadError } = await supabase.storage.from("materials").upload(path, p.file, {
    cacheControl: "3600",
    contentType: "application/pdf",
    upsert: false,
  });
  
  if (uploadError) {
    console.error("uploadMaterial: Storage upload error:", uploadError);
    throw uploadError;
  }
  console.log("uploadMaterial: File uploaded successfully");

  const { data: publicUrlData } = supabase.storage.from("materials").getPublicUrl(path);
  const fileURL = publicUrlData.publicUrl;
  console.log("uploadMaterial: File URL:", fileURL);
  
  p.onProgress?.(75);

  const payload = {
    title: p.title,
    description: p.description,
    university: p.university,
    universityName: p.universityName,
    department: p.department,
    year: p.year,
    course: p.course,
    fileURL,
    storagePath: path,
    fileSize: p.file.size,
    uploadedBy: p.uploadedBy,
    uploaderName: p.uploaderName,
    createdAt: new Date().toISOString(),
    ratingAvg: 0,
    ratingCount: 0,
    downloadCount: 0,
  };
  
  console.log("uploadMaterial: Inserting to database with payload:", payload);
  const { data: inserted, error: insertError } = await supabase.from("materials").insert(payload).select("id").single();
  
  if (insertError) {
    console.error("uploadMaterial: Database insert error:", insertError);
    console.error("uploadMaterial: Error details:", {
      message: insertError.message,
      details: insertError.details,
      hint: insertError.hint,
      code: insertError.code
    });
    throw new Error(`Database insert failed: ${insertError.message}`);
  }
  
  const id = inserted.id as string;
  console.log("uploadMaterial: Material inserted with ID:", id);
  
  p.onProgress?.(100);

  await awardPoints(p.uploadedBy, 10);
  await createNotification({
    type: "new_material",
    university: p.university,
    department: p.department,
    course: p.course,
    materialId: id,
    title: `New material in ${p.course}`,
    body: p.title,
    excludeUid: p.uploadedBy,
  });
  // simple badge logic
  await addBadge(p.uploadedBy, "First Upload");
  
  console.log("uploadMaterial: Upload completed successfully, returning ID:", id);
  return id;
}
