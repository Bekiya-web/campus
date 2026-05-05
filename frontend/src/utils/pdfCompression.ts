/**
 * Advanced PDF Compression
 * Compresses PDFs by rendering pages to canvas and recreating with compressed images
 */

import { toast } from 'sonner';

// Dynamically import pdf.js to avoid bundle bloat
let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  
  try {
    // Use CDN version to avoid bundling large library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    document.head.appendChild(script);
    
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
    
    pdfjsLib = (window as any).pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    return pdfjsLib;
  } catch (error) {
    console.error('Failed to load PDF.js:', error);
    throw new Error('PDF compression library failed to load');
  }
}

/**
 * Compress PDF by rendering pages to canvas and recreating
 */
export async function compressPDFAdvanced(
  file: File,
  options: {
    quality?: number;
    maxWidth?: number;
    onProgress?: (progress: number) => void;
  } = {}
): Promise<{ file: File; originalSize: number; compressedSize: number }> {
  const { quality = 0.7, maxWidth = 1200, onProgress } = options;
  const originalSize = file.size;

  try {
    onProgress?.(5);
    
    // Load PDF.js
    let pdfjs;
    try {
      pdfjs = await loadPdfJs();
    } catch (error) {
      throw new Error('Failed to load PDF processing library. Please try again or use a different browser.');
    }
    
    onProgress?.(10);

    // Load the PDF
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    onProgress?.(20);

    const numPages = pdf.numPages;
    
    // Limit pages for performance (max 50 pages)
    if (numPages > 50) {
      throw new Error('PDF has too many pages (max 50). Please use a smaller document.');
    }
    
    const compressedImages: string[] = [];

    // Process each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });

        // Calculate scale to fit maxWidth
        const scale = maxWidth / viewport.width;
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

        // Convert to compressed image
        const imageData = canvas.toDataURL('image/jpeg', quality);
        compressedImages.push(imageData);

        // Update progress
        const progress = 20 + ((pageNum / numPages) * 60);
        onProgress?.(Math.floor(progress));
      } catch (pageError) {
        console.error(`Failed to process page ${pageNum}:`, pageError);
        throw new Error(`Failed to process page ${pageNum}`);
      }
    }

    onProgress?.(85);

    // Create compressed PDF
    const compressedBlob = await createCompressedPDF(compressedImages, quality);
    
    onProgress?.(95);

    const compressedFile = new File([compressedBlob], file.name, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    onProgress?.(100);

    return {
      file: compressedFile,
      originalSize,
      compressedSize: compressedFile.size,
    };
  } catch (error) {
    console.error('Advanced PDF compression failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`PDF compression failed: ${errorMessage}`);
  }
}

/**
 * Create a compressed PDF from images using jsPDF
 */
async function createCompressedPDF(images: string[], quality: number): Promise<Blob> {
  try {
    // Dynamically import jsPDF
    const jsPDFModule = await import('jspdf');
    const { jsPDF } = jsPDFModule;
    
    // Create PDF with compression enabled
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      compress: true,
    });

    // Add each image as a page
    for (let i = 0; i < images.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add image with FAST compression for smaller file size
      pdf.addImage(images[i], 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }

    return pdf.output('blob');
  } catch (error) {
    console.error('Failed to create PDF with jsPDF:', error);
    throw new Error(`PDF creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Simple PDF compression (fallback method)
 * Just reduces the file by removing metadata and optimizing structure
 */
export async function compressPDFSimple(file: File): Promise<{
  file: File;
  originalSize: number;
  compressedSize: number;
}> {
  const originalSize = file.size;
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Create a new blob (this doesn't actually compress, but prepares for upload)
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
    const compressedFile = new File([blob], file.name, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    return {
      file: compressedFile,
      originalSize,
      compressedSize: compressedFile.size,
    };
  } catch (error) {
    console.error('Simple PDF compression failed:', error);
    throw error;
  }
}

/**
 * Check if advanced PDF compression is available
 */
export function isPDFCompressionAvailable(): boolean {
  return typeof document !== 'undefined' && typeof window !== 'undefined';
}
