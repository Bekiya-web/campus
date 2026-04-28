# Image Upload for News - User Guide

## ✨ New Feature: Upload Images from Your Device

You can now upload cover images for news posts directly from your computer/phone!

## 🎯 How to Use

### Option 1: Upload from Device (Recommended)

1. **Go to Create News page** (`/news/create`)
2. **Find the "Cover Image" section**
3. **Click the upload area** or "Choose Image" button
4. **Select an image** from your device
5. **Preview appears** - You'll see the image before publishing
6. **Remove if needed** - Click the X button to remove and choose another

### Option 2: Paste Image URL

1. **Scroll to "Or paste image URL"** field
2. **Paste a direct image URL** (e.g., from another website)
3. **Image will be used** without uploading

## 📋 Image Requirements

- **Formats**: PNG, JPG, JPEG, GIF, WebP
- **Max Size**: 5MB
- **Recommended**: 1200x630px (landscape) for best display
- **Aspect Ratio**: 16:9 or 2:1 works best

## 🎨 Features

### Upload Area
- **Drag & Drop**: Drag image files directly onto the upload area
- **Click to Browse**: Click anywhere in the upload area to select files
- **Visual Preview**: See your image before publishing
- **Easy Removal**: Remove and re-upload with one click

### Image Preview
- **Full Preview**: See exactly how your image will look
- **Remove Button**: X button in top-right corner
- **Replace**: Remove and upload a different image anytime

### URL Option
- **Alternative Method**: Paste image URLs instead of uploading
- **Disabled When Uploading**: URL field disabled when file is selected
- **Switch Methods**: Remove uploaded file to use URL instead

## 🔄 Upload Process

1. **Select Image** → Preview appears
2. **Fill Form** → Complete other fields
3. **Click Publish** → Image uploads first
4. **News Created** → Image URL saved automatically

## 💡 Tips

### Best Practices
- Use **high-quality images** for better engagement
- Choose **relevant images** that match the news content
- Use **landscape orientation** for featured carousel
- Keep **file size under 2MB** for faster uploads

### Image Ideas
- University campus photos
- Event posters
- Scholarship program logos
- Graduation ceremonies
- Academic activities
- Official announcements graphics

### Where Images Appear
- **News Cards**: Small thumbnail on browse page
- **Featured Carousel**: Large banner on news page
- **News Detail**: Full-width header image
- **Saved News**: Thumbnail in saved items

## 🛠️ Technical Details

### Storage
- Images stored in Supabase Storage
- Bucket: `materials` (same as PDFs)
- Folder: `news-images/`
- Public access enabled

### File Naming
- Timestamp prefix for uniqueness
- Sanitized filenames (special chars removed)
- Original extension preserved

### Upload Flow
```
1. User selects image
2. Client validates (type, size)
3. Preview generated locally
4. On submit, image uploads to Supabase
5. Public URL returned
6. News post created with image URL
```

## 🐛 Troubleshooting

### "Please select an image file"
- You selected a non-image file
- Only PNG, JPG, GIF, WebP allowed

### "Image must be under 5MB"
- Your image is too large
- Compress the image or choose a smaller one
- Use online tools like TinyPNG to compress

### Upload fails
- Check internet connection
- Try a different image
- Verify you're logged in as admin
- Check browser console for errors

### Image not showing
- Wait a few seconds for upload
- Check if image URL is valid
- Try refreshing the page
- Verify Supabase storage is configured

### Preview not appearing
- Browser may not support FileReader
- Try a different browser
- Check browser console for errors

## 🔒 Security

- **Admin Only**: Only admins can upload images
- **File Type Validation**: Only image files accepted
- **Size Limit**: 5MB maximum
- **Sanitized Names**: Special characters removed
- **Public Storage**: Images are publicly accessible

## 📊 Storage Management

### Current Setup
- **Bucket**: `materials`
- **Folder**: `news-images/`
- **Access**: Public read
- **Retention**: Permanent (manual cleanup needed)

### Future Enhancements
- Image compression on upload
- Multiple image support
- Image cropping tool
- Gallery management
- Automatic cleanup of unused images

## 🎓 Examples

### Good Images
✅ University logo with announcement text  
✅ Event poster with date and details  
✅ Campus photo with students  
✅ Scholarship program banner  
✅ Graduation ceremony photo  

### Avoid
❌ Blurry or low-quality images  
❌ Images with too much text  
❌ Portrait orientation (for featured)  
❌ Copyrighted images without permission  
❌ Irrelevant stock photos  

## 📱 Mobile Support

- **Works on mobile devices**
- **Camera access**: Take photos directly
- **Gallery access**: Choose from photo library
- **Touch-friendly**: Large upload area
- **Responsive preview**: Adapts to screen size

## 🚀 Quick Start

1. Click "Post News" button (admin only)
2. Fill in title, content, category, university
3. Click upload area in "Cover Image" section
4. Select image from device
5. Preview appears - looks good?
6. Complete rest of form
7. Click "Publish News"
8. Image uploads automatically!

---

**Enjoy creating beautiful news posts with images! 🎉**
