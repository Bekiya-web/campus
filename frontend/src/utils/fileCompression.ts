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
    QUALITY: 0.7, // 70% quality for more compression
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  PDF: {
    MAX_SIZE: 20 * 1024 * 1024, // 20MB
    COMPRESSION_THRESHOLD: 0, // Compress all PDFs regardless of size
    TARGET_COMPRESSION: 0.7, // Target 70% of original size
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
 * Always compresses to 70% quality regardless of original size
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

  // Show compressing message
  toast.info('Compressing image...', { duration: 2000 });

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

        // Convert to blob with 70% quality
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

            const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

            // Always show compression result
            toast.success(
              `Image compressed: ${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)} (${compressionRatio.toFixed(1)}% reduction)`,
              { duration: 3000 }
            );

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize,
              compressionRatio,
              wasCompressed: true, // Always true now
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
 * Compress a PDF file
 * Always compresses PDFs to 70% quality regardless of size
 */
export async function compressPDF(file: File): Promise<CompressionResult> {
  const originalSize = file.size;

  // Show compressing message immediately
  const toastId = toast.loading('Compressing PDF... This may take a moment.');

  try {
    // Import the advanced PDF compression
    const { compressPDFAdvanced } = await import('./pdfCompression');
    
    const result = await compressPDFAdvanced(file, {
      quality: FILE_LIMITS.PDF.TARGET_COMPRESSION,
      maxWidth: 1200,
    });

    const compressionRatio = ((originalSize - result.compressedSize) / originalSize) * 100;

    // Dismiss loading toast
    toast.dismiss(toastId);

    if (result.compressedSize < originalSize) {
      toast.success(
        `PDF compressed: ${formatFileSize(originalSize)} → ${formatFileSize(result.compressedSize)} (${compressionRatio.toFixed(1)}% reduction)`,
        { duration: 4000 }
      );
      
      return {
        file: result.file,
        originalSize,
        compressedSize: result.compressedSize,
        compressionRatio,
        wasCompressed: true,
      };
    }

    // Even if size didn't reduce, we still processed it
    toast.info('PDF processed and optimized');
    
    return {
      file: result.file,
      originalSize,
      compressedSize: result.compressedSize,
      compressionRatio: 0,
      wasCompressed: true, // Mark as compressed even if size didn't reduce
    };
  } catch (error) {
    // Dismiss loading toast
    toast.dismiss(toastId);
    
    console.error('PDF compression failed:', error);
    toast.error('PDF compression failed. Please try again or use a smaller file.');
    
    throw error; // Throw error so user knows compression failed
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
 * Process file before upload (always compress)
 */
export async function processFileForUpload(
  file: File,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  try {
    onProgress?.(5);

    // Validate file first
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

    onProgress?.(15);

    // Always compress images and PDFs
    let result: CompressionResult;

    if (isImageFile(file)) {
      onProgress?.(20);
      result = await compressImage(file);
      onProgress?.(90);
    } else if (isPDFFile(file)) {
      onProgress?.(20);
      result = await compressPDF(file);
      onProgress?.(90);
    } else {
      // For other document types, no compression but still process
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
