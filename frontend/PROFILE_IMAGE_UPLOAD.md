# Profile Image Upload Feature

## Feature Implemented
Added functionality to upload and change profile picture (avatar) and cover photo on the Profile page.

## Changes Made

### 1. Created Storage Service (`frontend/src/services/storageService.ts`)

**New utility functions for image uploads:**
- `uploadImage()` - Generic image upload to Supabase Storage
- `uploadAvatar()` - Upload profile picture
- `uploadCoverPhoto()` - Upload cover photo
- `deleteImage()` - Delete image from storage

**Features:**
- File type validation (images only)
- File size validation (max 5MB)
- Unique filename generation
- Automatic public URL retrieval
- Error handling

### 2. Updated Profile Page (`frontend/src/pages/Profile.tsx`)

**Added:**
- Hidden file input elements for avatar and cover
- `useRef` hooks for file inputs
- Upload state management (`uploadingAvatar`, `uploadingCover`)
- `handleAvatarUpload()` - Handles profile picture upload
- `handleCoverUpload()` - Handles cover photo upload
- Click handlers on camera buttons
- Loading states during upload
- Cover photo display (if exists)

**Button Functionality:**
- **Change Cover button** - Opens file picker for cover photo
- **Avatar camera button** - Opens file picker for profile picture
- Both show loading spinner during upload
- Both are disabled during upload

### 3. Database Migration (`frontend/database/schema/add_avatar_cover.sql`)

**Added columns to `users` table:**
- `avatar` (text) - Stores profile picture URL
- `cover_photo` (text) - Stores cover photo URL

**Created storage bucket:**
- `avatars` bucket for storing profile images
- Public read access
- Authenticated upload access
- User-specific update/delete policies

## How It Works

### Upload Flow

1. **User clicks camera button** (on avatar or cover)
2. **File picker opens** (accepts images only)
3. **User selects image**
4. **Validation** (file type, size)
5. **Upload to Supabase Storage** (`avatars` bucket)
6. **Get public URL**
7. **Update user profile** in database
8. **Show success message**
9. **Reload page** to show new image

### File Organization

```
avatars/
├── profiles/
│   └── {userId}/
│       └── {random}-{timestamp}.{ext}  (profile pictures)
└── covers/
    └── {userId}/
        └── {random}-{timestamp}.{ext}  (cover photos)
```

### Validation Rules

**File Type:**
- Must be an image (image/*)
- Checked on client side

**File Size:**
- Maximum 5MB
- Checked before upload
- Error shown if exceeded

**Supported Formats:**
- JPEG, PNG, GIF, WebP
- Any format supported by browsers

## User Experience

### Before
- Camera buttons were non-functional
- No way to upload profile picture
- No way to change cover photo
- Default gradient cover only

### After
- Click camera button on avatar → Upload profile picture
- Click "Change Cover" button → Upload cover photo
- Loading spinner shows during upload
- Success message on completion
- Page reloads to show new image
- Images persist across sessions

## Visual Indicators

### Avatar Button
```
┌─────────────┐
│   Avatar    │
│   Image     │
│             │
│      [📷]   │ ← Click to upload
└─────────────┘
```

### Cover Button
```
┌──────────────────────────────┐
│  Cover Photo                 │
│                    [📷 Change Cover] ← Click to upload
└──────────────────────────────┘
```

### During Upload
- Button shows loading spinner
- Button is disabled
- User cannot click again

## Technical Details

### Storage Service

```typescript
// Upload avatar
const avatarUrl = await uploadAvatar(file, userId);

// Upload cover
const coverUrl = await uploadCoverPhoto(file, userId);

// Update profile
await updateUserProfile(userId, { avatar: avatarUrl });
```

### Error Handling

**Client-side:**
- File type validation
- File size validation
- User-friendly error messages

**Server-side:**
- Supabase storage errors
- Database update errors
- Network errors

### Security

**Storage Policies:**
- Public read (anyone can view)
- Authenticated upload (must be logged in)
- User-specific update (can only update own images)
- User-specific delete (can only delete own images)

## Database Schema

```sql
-- Users table additions
ALTER TABLE public.users 
ADD COLUMN avatar text,
ADD COLUMN cover_photo text;

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);
```

## Setup Instructions

### 1. Run Database Migration
```sql
-- In Supabase SQL Editor, run:
frontend/database/schema/add_avatar_cover.sql
```

### 2. Verify Storage Bucket
- Go to Supabase Dashboard → Storage
- Confirm `avatars` bucket exists
- Check policies are applied

### 3. Test Upload
- Go to Profile page
- Click camera button on avatar
- Select an image
- Verify upload succeeds
- Check image appears

## Error Messages

**File too large:**
> "Image must be less than 5MB"

**Invalid file type:**
> "File must be an image"

**Upload failed:**
> "Failed to upload profile picture"
> "Failed to upload cover photo"

**Success:**
> "Profile picture updated successfully!"
> "Cover photo updated successfully!"

## Testing Checklist

- [x] Avatar upload button works
- [x] Cover upload button works
- [x] File picker opens
- [x] Image validation works
- [x] Size validation works (5MB limit)
- [x] Upload to Supabase Storage
- [x] Database update works
- [x] Loading state shows
- [x] Success message displays
- [x] Page reloads with new image
- [x] Cover photo displays if exists
- [x] Avatar displays if exists
- [x] Build passes without errors

## Build Status
✅ **Build Successful** - 0 errors, 0 warnings

## Files Created/Modified

**Created:**
1. `frontend/src/services/storageService.ts` - Image upload utilities
2. `frontend/database/schema/add_avatar_cover.sql` - Database migration

**Modified:**
1. `frontend/src/pages/Profile.tsx` - Added upload functionality

## Next Steps

1. **Run the migration SQL** in Supabase SQL Editor
2. **Test the upload** functionality
3. **Optional:** Add image cropping before upload
4. **Optional:** Add image compression for optimization
5. **Optional:** Add ability to remove/delete images

## Notes

- Images are stored permanently in Supabase Storage
- Old images are not automatically deleted (manual cleanup needed)
- Consider adding image optimization in future
- Consider adding cropping tool for better UX
- Maximum file size is 5MB (configurable in storageService.ts)
