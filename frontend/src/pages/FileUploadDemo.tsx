/**
 * File Upload Demo Page
 * Demonstrates the file upload system with compression
 */

import { useState } from 'react';
import { FileUpload } from '@/components/common/FileUpload';
import { MultiFileUpload } from '@/components/common/MultiFileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CompressionResult, FILE_LIMITS } from '@/utils/fileCompression';
import { Upload as UploadIcon } from 'lucide-react';

export default function FileUploadDemo() {
  const [singleFile, setSingleFile] = useState<{ file: File; result: CompressionResult } | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<Array<{ file: File; compressionResult: CompressionResult }>>([]);
  const [uploading, setUploading] = useState(false);

  const handleSingleFileUpload = async () => {
    if (!singleFile) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    try {
      // Simulate upload to server
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success(`File uploaded successfully: ${singleFile.file.name}`);
      setSingleFile(null);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleMultipleFilesUpload = async () => {
    if (multipleFiles.length === 0) {
      toast.error('Please select files first');
      return;
    }

    setUploading(true);
    try {
      // Simulate upload to server
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success(`${multipleFiles.length} files uploaded successfully`);
      setMultipleFiles([]);
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">File Upload System</h1>
        <p className="text-muted-foreground">
          Advanced file upload with automatic compression, validation, and progress tracking
        </p>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>What this upload system can do</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>Automatic Image Compression:</strong> Images are automatically resized and compressed
                to 70% quality (max {FILE_LIMITS.IMAGE.MAX_DIMENSION}px)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>PDF Compression:</strong> PDFs are always compressed to 70% quality using 
                CDN-loaded pdf.js (no bundling issues, works in production)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>File Validation:</strong> Type and size validation with clear error messages
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>Drag & Drop:</strong> Intuitive drag and drop interface
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>Progress Tracking:</strong> Real-time compression and upload progress
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>
                <strong>Image Preview:</strong> Preview images before upload
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Upload Demos */}
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single File Upload</TabsTrigger>
          <TabsTrigger value="multiple">Multiple Files Upload</TabsTrigger>
        </TabsList>

        {/* Single File Upload */}
        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Single File Upload</CardTitle>
              <CardDescription>
                Upload one file at a time with automatic compression
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                accept="image/*,application/pdf"
                maxSize={FILE_LIMITS.IMAGE.MAX_SIZE}
                onFileSelect={(file, result) => {
                  setSingleFile({ file, result });
                }}
                onFileRemove={() => setSingleFile(null)}
                label="Upload Image or PDF"
                description="Drag and drop or click to browse (max 5MB for images, 20MB for PDFs)"
                showPreview={true}
                autoCompress={true}
              />

              {singleFile && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSingleFileUpload}
                    disabled={uploading}
                    className="flex-1"
                  >
                    {uploading ? (
                      <>
                        <UploadIcon className="mr-2 h-4 w-4 animate-pulse" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload to Server
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Multiple Files Upload */}
        <TabsContent value="multiple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multiple Files Upload</CardTitle>
              <CardDescription>
                Upload multiple files at once with individual compression
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MultiFileUpload
                accept="image/*,application/pdf"
                maxFiles={10}
                maxSize={FILE_LIMITS.IMAGE.MAX_SIZE}
                onFilesChange={setMultipleFiles}
                autoCompress={true}
              />

              {multipleFiles.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleMultipleFilesUpload}
                    disabled={uploading}
                    className="flex-1"
                  >
                    {uploading ? (
                      <>
                        <UploadIcon className="mr-2 h-4 w-4 animate-pulse" />
                        Uploading {multipleFiles.length} files...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Upload {multipleFiles.length} files to Server
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
          <CardDescription>How the compression works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Image Compression:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Resizes images to max {FILE_LIMITS.IMAGE.MAX_DIMENSION}x{FILE_LIMITS.IMAGE.MAX_DIMENSION}px while maintaining aspect ratio</li>
              <li>Compresses with 70% quality using HTML5 Canvas</li>
              <li>Supports JPEG, PNG, and WebP formats</li>
              <li>Typically reduces file size by 60-80%</li>
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">PDF Compression:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Loads pdf.js from CDN (no bundling issues)</li>
              <li>Renders each page to canvas at 1200px max width</li>
              <li>Converts pages to JPEG at 70% quality</li>
              <li>Recreates PDF with compressed images using jsPDF</li>
              <li>Typically achieves 60-70% size reduction</li>
              <li>Maximum 30 pages (for performance)</li>
              <li>Graceful fallback if compression fails</li>
              <li>Processing time: 2-5 seconds for typical PDFs</li>
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Validation:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>File type validation before processing</li>
              <li>Size limits enforced</li>
              <li>Clear error messages for invalid files</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
