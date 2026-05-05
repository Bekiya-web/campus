/**
 * Advanced File Upload Component
 * Features: Drag & drop, compression, validation, progress tracking
 */

import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  processFileForUpload,
  formatFileSize,
  isImageFile,
  isPDFFile,
  CompressionResult,
} from '@/utils/fileCompression';

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onFileSelect: (file: File, compressionResult: CompressionResult) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
  showPreview?: boolean;
  autoCompress?: boolean;
}

interface UploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  progress: number;
  compressionResult: CompressionResult | null;
  error: string | null;
}

export function FileUpload({
  accept = 'image/*,application/pdf',
  maxSize,
  onFileSelect,
  onFileRemove,
  disabled = false,
  className,
  label = 'Upload File',
  description = 'Drag and drop or click to browse',
  showPreview = true,
  autoCompress = true,
}: FileUploadProps) {
  const [state, setState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    progress: 0,
    compressionResult: null,
    error: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = useCallback(
    async (file: File) => {
      setState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: null,
      }));

      try {
        // Show initial message
        toast.info(`Validating ${file.name}...`);

        // Show compressing message based on file type
        if (isImageFile(file)) {
          toast.info('Compressing image...', { duration: 2000 });
        } else if (isPDFFile(file)) {
          toast.loading('Compressing PDF... This may take a moment.', { id: 'pdf-compress' });
        }

        // Process and compress file
        const result = await processFileForUpload(
          file,
          autoCompress ? (progress) => setState((prev) => ({ ...prev, progress })) : undefined
        );

        // Dismiss PDF loading toast if it exists
        if (isPDFFile(file)) {
          toast.dismiss('pdf-compress');
        }

        // Show compression result
        if (result.wasCompressed) {
          toast.success(
            `${isImageFile(result.file) ? 'Image' : 'PDF'} compressed: ${formatFileSize(result.originalSize)} → ${formatFileSize(result.compressedSize)} (${result.compressionRatio.toFixed(1)}% reduction)`,
            { duration: 3000 }
          );
        } else if (isPDFFile(file) && result.compressionRatio === 0) {
          toast.warning('PDF compression skipped. Uploading original file.');
        }

        // Generate preview for images
        let preview: string | null = null;
        if (showPreview && isImageFile(result.file)) {
          preview = URL.createObjectURL(result.file);
        }

        setState({
          file: result.file,
          preview,
          uploading: false,
          progress: 100,
          compressionResult: result,
          error: null,
        });

        // Show success message
        toast.success(`${file.name} ready for upload!`);

        onFileSelect(result.file, result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
        setState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: errorMessage,
        }));
        toast.error(errorMessage);
      }
    },
    [onFileSelect, showPreview, autoCompress]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileProcess(file);
      }
    },
    [handleFileProcess]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileProcess(file);
      }
    },
    [disabled, handleFileProcess]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRemove = useCallback(() => {
    if (state.preview) {
      URL.revokeObjectURL(state.preview);
    }
    setState({
      file: null,
      preview: null,
      uploading: false,
      progress: 0,
      compressionResult: null,
      error: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  }, [state.preview, onFileRemove]);

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const getFileIcon = () => {
    if (!state.file) return <Upload className="h-8 w-8" />;
    if (isImageFile(state.file)) return <ImageIcon className="h-8 w-8" />;
    if (isPDFFile(state.file)) return <FileText className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      {!state.file ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer',
            'hover:border-primary hover:bg-primary/5',
            isDragging && 'border-primary bg-primary/10',
            disabled && 'opacity-50 cursor-not-allowed',
            state.error && 'border-red-500 bg-red-50 dark:bg-red-950/20'
          )}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className={cn(
              'p-4 rounded-full',
              state.error ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-primary/10 text-primary'
            )}>
              {state.error ? <AlertCircle className="h-8 w-8" /> : getFileIcon()}
            </div>

            <div>
              <p className="text-lg font-medium">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
              {maxSize && (
                <p className="text-xs text-muted-foreground mt-2">
                  Maximum size: {formatFileSize(maxSize)}
                </p>
              )}
            </div>

            {state.error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {state.error}
              </div>
            )}

            {state.uploading && (
              <div className="w-full max-w-xs space-y-2">
                <Progress value={state.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {state.progress < 20 ? 'Validating file...' : 
                   state.progress < 90 ? 'Compressing...' : 
                   'Finalizing...'}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 space-y-4">
          {/* File Preview */}
          {state.preview && showPreview ? (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={state.preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
              {getFileIcon()}
            </div>
          )}

          {/* File Info */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{state.file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(state.file.size)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                disabled={disabled || state.uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Compression Info */}
            {state.compressionResult?.wasCompressed && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Compressed by {state.compressionResult.compressionRatio.toFixed(1)}%
                  ({formatFileSize(state.compressionResult.originalSize)} →{' '}
                  {formatFileSize(state.compressionResult.compressedSize)})
                </span>
              </div>
            )}

            {/* Upload Progress */}
            {state.uploading && (
              <div className="space-y-2">
                <Progress value={state.progress} className="h-2" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {state.progress < 20 ? 'Validating...' : 
                     state.progress < 90 ? 'Compressing...' : 
                     'Ready!'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
