/**
 * File Compression Utilities
 * Handles automatic compression of images and PDFs before upload
 */

import { toast } from "sonner";

// Configuration
export const FILE_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_DIMENSION: 2048,
    QUALITY: 0.85,
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  PDF: {
    MAX_SIZE: 20 * 1024 * 1024, // 20MB
    COMPRESSION_THRESHOLD: 5 * 1024 * 1024, // Compress if larger than 5MB
    ACCEPTED_TYPES: ['application/pdf'],
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ACCEPTED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
  },
};

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  wasCompressed: boolean;
}

/**
 * Compress an image file
 */
export async function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<CompressionResult> {
  const {
    maxWidth = FILE_LIMITS.IMAGE.MAX_DIMENSION,
    maxHeight = FILE_LIMITS.IMAGE.MAX_DIMENSION,
    quality = FILE_LIMITS.IMAGE.QUALITY,
  } = options;

  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Use better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const compressedSize = blob.size;
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize,
              compressionRatio: ((originalSize - compressedSize) / originalSize) * 100,
              wasCompressed: compressedSize < originalSize,
            });
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compress a PDF file using PDF-lib
 * Note: This is a basic implementation. For production, consider using a backend service
 */
export async function compressPDF(file: File): Promise<CompressionResult> {
  const originalSize = file.size;

  // If file is already small enough, don't compress
  if (originalSize < FILE_LIMITS.PDF.COMPRESSION_THRESHOLD) {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: 0,
      wasCompressed: false,
    };
  }

  try {
    // For now, we'll just return the original file
    // In production, you'd want to use a library like pdf-lib or send to backend
    toast.info('PDF compression is best done on the server. Uploading original file.');
    
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: 0,
      wasCompressed: false,
    };
  } catch (error) {
    console.error('PDF compression failed:', error);
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: 0,
      wasCompressed: false,
    };
  }
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  type: 'image' | 'pdf' | 'document'
): { valid: boolean; error?: string } {
  const limits = type === 'image' ? FILE_LIMITS.IMAGE : 
                 type === 'pdf' ? FILE_LIMITS.PDF : 
                 FILE_LIMITS.DOCUMENT;

  // Check file type
  if (!limits.ACCEPTED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Accepted types: ${limits.ACCEPTED_TYPES.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > limits.MAX_SIZE) {
    const maxSizeMB = (limits.MAX_SIZE / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return FILE_LIMITS.IMAGE.ACCEPTED_TYPES.includes(file.type);
}

/**
 * Check if file is a PDF
 */
export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

/**
 * Process file before upload (compress if needed)
 */
export async function processFileForUpload(
  file: File,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  try {
    onProgress?.(10);

    // Validate file
    let validation;
    if (isImageFile(file)) {
      validation = validateFile(file, 'image');
    } else if (isPDFFile(file)) {
      validation = validateFile(file, 'pdf');
    } else {
      validation = validateFile(file, 'document');
    }

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    onProgress?.(30);

    // Compress if needed
    let result: CompressionResult;

    if (isImageFile(file)) {
      toast.info('Compressing image...');
      result = await compressImage(file);
      
      if (result.wasCompressed) {
        toast.success(
          `Image compressed by ${result.compressionRatio.toFixed(1)}% (${formatFileSize(result.originalSize)} → ${formatFileSize(result.compressedSize)})`
        );
      }
    } else if (isPDFFile(file)) {
      result = await compressPDF(file);
    } else {
      // No compression for other document types
      result = {
        file,
        originalSize: file.size,
        compressedSize: file.size,
        compressionRatio: 0,
        wasCompressed: false,
      };
    }

    onProgress?.(100);
    return result;
  } catch (error) {
    onProgress?.(0);
    throw error;
  }
}
