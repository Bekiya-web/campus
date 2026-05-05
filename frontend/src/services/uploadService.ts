import { awardPoints, addBadge } from "./authService";
import { createNotification, notifyAdminsNewMaterial } from "./notificationService";
import { supabase } from "@/integrations/supabase/client";
import { processFileForUpload, CompressionResult } from "@/utils/fileCompression";

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
  status?: "pending" | "approved" | "rejected";
  onProgress?: (pct: number) => void;
  skipCompression?: boolean; // Option to skip compression for PDFs
}

export async function uploadMaterial(p: UploadMaterialParams): Promise<string> {
  if (p.file.type !== "application/pdf") throw new Error("Only PDF files are allowed");
  if (p.file.size > 25 * 1024 * 1024) throw new Error("File must be under 25MB");

  // Compress/process file if not skipped
  let fileToUpload = p.file;
  let compressionResult: CompressionResult | null = null;

  if (!p.skipCompression) {
    try {
      compressionResult = await processFileForUpload(p.file, (progress) => {
        // Map compression progress to 0-20% of total progress
        p.onProgress?.(Math.floor(progress * 0.2));
      });
      fileToUpload = compressionResult.file;
    } catch (error) {
      console.warn('Compression failed, uploading original file:', error);
      // Continue with original file if compression fails
    }
  }

  // Sanitize filename: remove special characters and replace spaces with underscores
  const sanitizedFileName = fileToUpload.name
    .replace(/[^\w\s.-]/g, '') // Remove special characters except word chars, spaces, dots, and hyphens
    .replace(/\s+/g, '_')       // Replace spaces with underscores
    .replace(/_+/g, '_');       // Replace multiple underscores with single underscore

  const path = `${p.university}/${p.department}/${Date.now()}_${sanitizedFileName}`;
  p.onProgress?.(25);

  const { error: uploadError } = await supabase.storage.from("materials").upload(path, fileToUpload, {
    cacheControl: "3600",
    contentType: "application/pdf",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from("materials").getPublicUrl(path);
  const fileURL = publicUrlData.publicUrl;
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
    status: p.status || "pending", // Default to pending unless specified
  };

  const { data: inserted, error: insertError } = await supabase
    .from("materials")
    .insert(payload)
    .select("id")
    .single();

  if (insertError) throw new Error(`Upload failed: ${insertError.message}`);
  const id = inserted.id as string;
  p.onProgress?.(100);

  // Award points and badge
  await awardPoints(p.uploadedBy, 10);
  await addBadge(p.uploadedBy, "First Upload");

  // Notify all admins so they can review the pending material
  await notifyAdminsNewMaterial({
    materialId: id,
    materialTitle: p.title,
    uploaderName: p.uploaderName,
  });

  // Notify students in same dept about a new submission (they'll see it once approved)
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

  return id;
}

export interface UpdateMaterialParams {
  id: string;
  title?: string;
  description?: string;
  course?: string;
  department?: string;
  year?: string;
}

export async function updateMaterial(params: UpdateMaterialParams): Promise<void> {
  const { id, ...updates } = params;
  
  const { error } = await supabase
    .from("materials")
    .update(updates)
    .eq("id", id);
  
  if (error) throw new Error(`Update failed: ${error.message}`);
}
