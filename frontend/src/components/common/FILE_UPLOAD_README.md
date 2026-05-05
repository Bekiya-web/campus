# File Upload System Documentation

## Overview

A comprehensive file upload system with automatic compression, validation, and progress tracking. Supports both single and multiple file uploads with real-time feedback.

## Features

### ✨ Automatic Compression (Always Active)
- **Images**: Always compressed to 70% quality, regardless of original size
- **PDFs**: Always compressed to 70% quality using page-to-image conversion
- **Smart Processing**: Optimizes all files before upload
- **Clear Feedback**: Shows "Compressing..." before "Uploading..."

### 🛡️ Validation
- File type validation (images, PDFs, documents)
- Size limit enforcement
- Clear error messages
- Pre-upload validation

### 📊 Progress Tracking
- Real-time compression progress
- Clear status messages: "Validating..." → "Compressing..." → "Ready!"
- Upload progress feedback
- Visual progress bars
- Status indicators

### 🎨 User Experience
- Drag and drop support
- Image preview
- File information display
- Compression statistics
- Responsive design
- Toast notifications for each step

## Components

### 1. FileUpload (Single File)

```tsx
import { FileUpload } from '@/components/common/FileUpload';

<FileUpload
  accept="image/*,application/pdf"
  maxSize={5 * 1024 * 1024} // 5MB
  onFileSelect={(file, compressionResult) => {
    console.log('File selected:', file);
    console.log('Compression:', compressionResult);
  }}
  onFileRemove={() => console.log('File removed')}
  label="Upload File"
  description="Drag and drop or click to browse"
  showPreview={true}
  autoCompress={true}
/>
```

**Props:**
- `accept`: File types to accept (default: 'image/*,application/pdf')
- `maxSize`: Maximum file size in bytes
- `onFileSelect`: Callback when file is selected and processed
- `onFileRemove`: Callback when file is removed
- `disabled`: Disable the upload
- `label`: Upload area label
- `description`: Upload area description
- `showPreview`: Show image preview (default: true)
- `autoCompress`: Enable automatic compression (default: true)

### 2. MultiFileUpload (Multiple Files)

```tsx
import { MultiFileUpload } from '@/components/common/MultiFileUpload';

<MultiFileUpload
  accept="image/*,application/pdf"
  maxFiles={10}
  maxSize={5 * 1024 * 1024}
  onFilesChange={(files) => {
    console.log('Files:', files);
  }}
  autoCompress={true}
/>
```

**Props:**
- `accept`: File types to accept
- `maxFiles`: Maximum number of files (default: 10)
- `maxSize`: Maximum size per file
- `onFilesChange`: Callback when files change
- `disabled`: Disable the upload
- `autoCompress`: Enable automatic compression (default: true)

## Utilities

### File Compression

```typescript
import { 
  compressImage, 
  compressPDF, 
  processFileForUpload 
} from '@/utils/fileCompression';

// Compress an image
const result = await compressImage(file, {
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 0.85
});

// Process any file (auto-detects type)
const result = await processFileForUpload(file, (progress) => {
  console.log('Progress:', progress);
});
```

### File Validation

```typescript
import { validateFile, isImageFile, isPDFFile } from '@/utils/fileCompression';

// Validate file
const { valid, error } = validateFile(file, 'image');

// Check file type
if (isImageFile(file)) {
  // Handle image
}

if (isPDFFile(file)) {
  // Handle PDF
}
```

### File Formatting

```typescript
import { formatFileSize, getFileExtension } from '@/utils/fileCompression';

// Format size
const size = formatFileSize(1024 * 1024); // "1 MB"

// Get extension
const ext = getFileExtension('document.pdf'); // "pdf"
```

## Configuration

File limits are defined in `src/utils/fileCompression.ts`:

```typescript
export const FILE_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_DIMENSION: 2048,
    QUALITY: 0.85,
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  PDF: {
    MAX_SIZE: 20 * 1024 * 1024, // 20MB
    COMPRESSION_THRESHOLD: 5 * 1024 * 1024,
    ACCEPTED_TYPES: ['application/pdf'],
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ACCEPTED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // ... more types
    ],
  },
};
```

## Integration with Upload Service

The upload service automatically uses compression:

```typescript
import { uploadMaterial } from '@/services/uploadService';

await uploadMaterial({
  file: file,
  title: 'My Document',
  // ... other params
  onProgress: (progress) => {
    console.log('Upload progress:', progress);
  },
  skipCompression: false, // Set to true to skip compression
});
```

## Demo Page

Visit `/file-upload-demo` to see the upload system in action with:
- Single file upload example
- Multiple files upload example
- Technical details
- Feature showcase

## Browser Support

- Modern browsers with HTML5 Canvas support
- File API support required
- Drag and drop API support

## Performance

### Image Compression
- **Always active**: Compresses all images to 70% quality
- Typical compression: 60-80% size reduction
- Processing time: 100-500ms per image
- Quality: 70% (good balance of size and quality)

### PDF Compression
- **Always active**: Compresses all PDFs to 70% quality
- Typical compression: 60-70% size reduction
- Processing time: 2-5 seconds per document
- Method: Page-to-image conversion with jsPDF

### User Feedback
1. **"Processing [filename]..."** - Initial validation
2. **"Compressing image..."** or **"Compressing PDF..."** - Active compression
3. **"Image/PDF compressed: X → Y (Z% reduction)"** - Compression complete
4. **"[filename] ready for upload!"** - Ready to upload
5. **"Uploading..."** - Actual upload in progress

## Best Practices

1. **Always validate files** before processing
2. **Show progress feedback** for better UX
3. **Handle errors gracefully** with clear messages
4. **Compress on client-side** to reduce server load
5. **Use appropriate file limits** for your use case
6. **Test with various file sizes** and types

## Troubleshooting

### Image not compressing
- Check if file is already optimized
- Verify file type is supported
- Check browser console for errors

### Upload failing
- Verify file size is within limits
- Check network connection
- Ensure Supabase storage is configured

### Progress not updating
- Ensure `onProgress` callback is provided
- Check if `autoCompress` is enabled
- Verify component is not disabled

## Future Enhancements

- [ ] Server-side PDF compression
- [ ] Video file support
- [ ] Batch upload optimization
- [ ] Resume interrupted uploads
- [ ] Cloud storage integration
- [ ] Advanced image editing
