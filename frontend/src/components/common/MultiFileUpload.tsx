/**
 * Multi-File Upload Component
 * Supports uploading multiple files with individual compression and progress tracking
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

export interface MultiFileUploadProps {
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  onFilesChange: (files: Array<{ file: File; compressionResult: CompressionResult }>) => void;
  disabled?: boolean;
  className?: string;
  autoCompress?: boolean;
}

interface FileState {
  id: string;
  file: File;
  preview: string | null;
  uploading: boolean;
  progress: number;
  compressionResult: CompressionResult | null;
  error: string | null;
}

export function MultiFileUpload({
  accept = 'image/*,application/pdf',
  maxFiles = 10,
  maxSize,
  onFilesChange,
  disabled = false,
  className,
  autoCompress = true,
}: MultiFileUploadProps) {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const notifyFilesChange = useCallback(
    (updatedFiles: FileState[]) => {
      const completedFiles = updatedFiles
        .filter((f) => f.compressionResult && !f.uploading && !f.error)
        .map((f) => ({
          file: f.file,
          compressionResult: f.compressionResult!,
        }));
      onFilesChange(completedFiles);
    },
    [onFilesChange]
  );

  const processFile = useCallback(
    async (file: File): Promise<FileState> => {
      const id = `${file.name}-${Date.now()}-${Math.random()}`;
      const initialState: FileState = {
        id,
        file,
        preview: null,
        uploading: true,
        progress: 0,
        compressionResult: null,
        error: null,
      };

      try {
        const result = await processFileForUpload(
          file,
          autoCompress
            ? (progress) => {
                setFiles((prev) =>
                  prev.map((f) => (f.id === id ? { ...f, progress } : f))
                );
              }
            : undefined
        );

        let preview: string | null = null;
        if (isImageFile(result.file)) {
          preview = URL.createObjectURL(result.file);
        }

        return {
          ...initialState,
          file: result.file,
          preview,
          uploading: false,
          progress: 100,
          compressionResult: result,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
        toast.error(`${file.name}: ${errorMessage}`);
        return {
          ...initialState,
          uploading: false,
          error: errorMessage,
        };
      }
    },
    [autoCompress]
  );

  const handleFilesAdd = useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);

      if (files.length + fileArray.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Add files with initial state
      const initialStates: FileState[] = fileArray.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: null,
        uploading: true,
        progress: 0,
        compressionResult: null,
        error: null,
      }));

      setFiles((prev) => [...prev, ...initialStates]);

      // Process files
      const processedFiles = await Promise.all(fileArray.map(processFile));

      setFiles((prev) => {
        const updated = prev.map((f) => {
          const processed = processedFiles.find((p) => p.file.name === f.file.name);
          return processed || f;
        });
        notifyFilesChange(updated);
        return updated;
      });
    },
    [files.length, maxFiles, processFile, notifyFilesChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFilesAdd(selectedFiles);
      }
    },
    [handleFilesAdd]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFilesAdd(droppedFiles);
      }
    },
    [disabled, handleFilesAdd]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRemove = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        const updated = prev.filter((f) => f.id !== id);
        notifyFilesChange(updated);
        return updated;
      });
    },
    [notifyFilesChange]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const getFileIcon = (file: File) => {
    if (isImageFile(file)) return <ImageIcon className="h-6 w-6" />;
    if (isPDFFile(file)) return <FileText className="h-6 w-6" />;
    return <FileText className="h-6 w-6" />;
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        multiple
      />

      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer',
          'hover:border-primary hover:bg-primary/5',
          isDragging && 'border-primary bg-primary/10',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Upload className="h-8 w-8" />
          </div>

          <div>
            <p className="text-lg font-medium">Upload Files</p>
            <p className="text-sm text-muted-foreground mt-1">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {files.length} / {maxFiles} files
              {maxSize && ` • Max ${formatFileSize(maxSize)} per file`}
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileState) => (
            <div
              key={fileState.id}
              className={cn(
                'border rounded-lg p-4',
                fileState.error && 'border-red-500 bg-red-50 dark:bg-red-950/20'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon/Preview */}
                {fileState.preview ? (
                  <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                    <img
                      src={fileState.preview}
                      alt={fileState.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    {getFileIcon(fileState.file)}
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{fileState.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(fileState.file.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(fileState.id)}
                      disabled={disabled || fileState.uploading}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress */}
                  {fileState.uploading && (
                    <div className="space-y-1">
                      <Progress value={fileState.progress} className="h-1.5" />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>
                          {fileState.progress < 20 ? 'Validating...' : 
                           fileState.progress < 90 ? 'Compressing...' : 
                           'Ready!'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Compression Info */}
                  {fileState.compressionResult?.wasCompressed && (
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>
                        Compressed by {fileState.compressionResult.compressionRatio.toFixed(1)}%
                      </span>
                    </div>
                  )}

                  {/* Error */}
                  {fileState.error && (
                    <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="h-3 w-3" />
                      <span>{fileState.error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
