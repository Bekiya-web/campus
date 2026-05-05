/**
 * File Compression Utilities
 * Handles automatic compression of images and PDFs before upload
 */

import { jsPDF } from "jspdf";

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
 * Compress a PDF file using canvas-based rendering
 * Always compresses PDFs to 70% quality regardless of size
 * Uses pdf.js from CDN to avoid bundling issues
 */
export async function compressPDF(file: File): Promise<CompressionResult> {
  const originalSize = file.size;

  try {
    // Load pdf.js from CDN if not already loaded
    if (!(window as any).pdfjsLib) {
      await loadPdfJsFromCDN();
    }

    const pdfjsLib = (window as any).pdfjsLib;
    
    // Read PDF file
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    const numPages = pdf.numPages;
    
    // Limit to 30 pages for performance
    if (numPages > 30) {
      return {
        file,
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 0,
        wasCompressed: false,
      };
    }

    // Render each page to canvas and compress
    const compressedImages: string[] = [];
    const maxWidth = 1200; // Max width for compressed pages
    const quality = 0.7; // 70% quality

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });

      // Calculate scale to fit maxWidth
      const scale = Math.min(maxWidth / viewport.width, 1.5);
      const scaledViewport = page.getViewport({ scale });

      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      // Render page to canvas
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;

      // Convert to compressed JPEG
      const imageData = canvas.toDataURL('image/jpeg', quality);
      compressedImages.push(imageData);
    }

    // Create new PDF using jsPDF
    const pdfDoc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      compress: true,
    });

    // Add each compressed image as a page
    for (let i = 0; i < compressedImages.length; i++) {
      if (i > 0) {
        pdfDoc.addPage();
      }

      const pageWidth = pdfDoc.internal.pageSize.getWidth();
      const pageHeight = pdfDoc.internal.pageSize.getHeight();
      
      // Add image with FAST compression
      pdfDoc.addImage(
        compressedImages[i],
        'JPEG',
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        'FAST'
      );
    }

    // Generate compressed PDF blob
    const compressedBlob = pdfDoc.output('blob');
    const compressedFile = new File([compressedBlob], file.name, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    const compressedSize = compressedFile.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    return {
      file: compressedFile,
      originalSize,
      compressedSize,
      compressionRatio,
      wasCompressed: true,
    };
  } catch (error) {
    console.error('PDF compression failed:', error);
    
    // Return original file as fallback
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
 * Load pdf.js library from CDN
 */
async function loadPdfJsFromCDN(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any).pdfjsLib) {
      resolve();
      return;
    }

    // Load pdf.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        // Set worker path
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      } else {
        reject(new Error('PDF.js failed to load'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load PDF.js from CDN'));
    };
    
    document.head.appendChild(script);
  });
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
    let validation: { valid: boolean; error?: string };
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
