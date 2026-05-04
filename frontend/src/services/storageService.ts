import { supabase } from "@/integrations/supabase/client";

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'avatars')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'avatars',
  folder?: string
): Promise<string> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Image must be less than 5MB');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 */
export async function deleteImage(url: string, bucket: string = 'avatars'): Promise<void> {
  try {
    // Extract the file path from the URL
    const urlParts = url.split(`/${bucket}/`);
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

/**
 * Upload profile avatar
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  return uploadImage(file, 'avatars', `profiles/${userId}`);
}

/**
 * Upload cover photo
 */
export async function uploadCoverPhoto(file: File, userId: string): Promise<string> {
  return uploadImage(file, 'avatars', `covers/${userId}`);
}
