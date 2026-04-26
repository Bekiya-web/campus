# User Restriction System - Implementation Guide

## Overview
The EduNexus platform now has a fully functional user restriction system that allows administrators to control user permissions and enforce account bans.

## Restriction Features

### 1. **Upload Materials** (`canUpload`)
- **Location**: Upload page (`/upload`)
- **Enforcement**: Users with `canUpload: false` cannot upload new study materials
- **Error Message**: "You have been restricted from uploading materials by an administrator."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog

### 2. **Chat Access** (`canChat`)
- **Location**: Global Course Chat (`/global-chat`)
- **Enforcement**: Users with `canChat: false` cannot send messages in course chats
- **Error Message**: "You have been restricted from chatting by an admin."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog

### 3. **Rate & Bookmark** (`canRate`)
- **Locations**: 
  - Material Detail page (rating)
  - Material Card (bookmarking)
- **Enforcement**: Users with `canRate: false` cannot:
  - Rate materials
  - Bookmark materials for later
- **Error Messages**: 
  - "You have been restricted from rating materials by an administrator."
  - "You have been restricted from bookmarking materials by an administrator."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog

### 4. **Discussion Comments** (`canComment`) - NEW
- **Location**: Discussion Detail page (`/discussions/:id`)
- **Enforcement**: Users with `canComment: false` cannot:
  - Post new comments on discussions
  - Reply to existing comments
- **Error Message**: "You have been restricted from commenting by an administrator."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog

### 5. **Download Materials** (`canDownload`) - NEW
- **Location**: Material Detail page (`/materials/:id`)
- **Enforcement**: Users with `canDownload: false` cannot download study materials
- **Error Message**: "You have been restricted from downloading materials by an administrator."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog

### 6. **Ban Account** (`isBanned`)
- **Location**: Authentication system (login/session check)
- **Enforcement**: Users with `isBanned: true` are:
  - Immediately logged out when detected
  - Cannot log back in
  - Session is terminated automatically
- **Error Message**: "Your account has been banned by an administrator. Please contact support."
- **Admin Control**: Toggle in Users Management → Restrict Actions dialog (RED section)

## Technical Implementation

### Database Schema
All restriction fields are stored in the `profiles` table:
```typescript
interface UserProfile {
  canUpload?: boolean;      // Default: true
  canChat?: boolean;        // Default: true
  canRate?: boolean;        // Default: true
  canComment?: boolean;     // Default: true (NEW)
  canDownload?: boolean;    // Default: true (NEW)
  isBanned?: boolean;       // Default: false
}
```

### Enforcement Points

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Checks `isBanned` on every auth state change
   - Automatically signs out banned users
   - Shows ban notification

2. **Upload Page** (`src/pages/Upload.tsx`)
   - Checks `canUpload` before allowing file submission

3. **Global Course Chat** (`src/pages/GlobalCourseChat.tsx`)
   - Checks `canChat` before sending messages

4. **Material Detail** (`src/pages/MaterialDetail.tsx`)
   - Checks `canRate` before allowing ratings
   - Checks `canDownload` before allowing downloads

5. **Material Card** (`src/components/common/MaterialCard.tsx`)
   - Checks `canRate` before allowing bookmarks

6. **Discussion Detail** (`src/pages/DiscussionDetail.tsx`)
   - Checks `canComment` before posting comments or replies

### Admin Interface

**Location**: Admin Dashboard → Users Management

**Features**:
- Search users by name or email
- Filter by role (Student/Admin)
- View user status (Active/Banned)
- Open "Restrict Actions" dialog for each user
- Toggle individual permissions with switches
- Visual feedback with icons and descriptions

**UI Components**:
- Upload icon for Upload Materials
- MessageCircle icon for Chat Access
- Star icon for Rate & Bookmark
- MessageSquare icon for Discussion Comments (NEW)
- Download icon for Download Materials (NEW)
- Ban icon (RED) for Ban Account

## Default Behavior

All users start with **full permissions** by default:
- `canUpload`: true (or undefined)
- `canChat`: true (or undefined)
- `canRate`: true (or undefined)
- `canComment`: true (or undefined)
- `canDownload`: true (or undefined)
- `isBanned`: false (or undefined)

Restrictions are **opt-in** - admins must explicitly disable permissions.

## User Experience

### For Restricted Users:
1. Clear error messages explaining the restriction
2. Actions are blocked before API calls (client-side validation)
3. No confusing UI states - buttons work but show error messages
4. Banned users are immediately logged out with explanation

### For Administrators:
1. Easy-to-use toggle switches
2. Clear descriptions of each permission
3. Visual separation of dangerous actions (Ban Account in red)
4. Instant updates when toggling restrictions
5. Status badges showing Active/Banned state

## Testing Checklist

- [ ] Ban a user and verify they're logged out immediately
- [ ] Banned user cannot log back in
- [ ] Disable Upload and verify user cannot submit materials
- [ ] Disable Chat and verify user cannot send messages
- [ ] Disable Rate and verify user cannot rate or bookmark
- [ ] Disable Comment and verify user cannot post in discussions
- [ ] Disable Download and verify user cannot download files
- [ ] Re-enable permissions and verify functionality returns
- [ ] Check that admins can always perform all actions

## Future Enhancements

Potential additions:
- Temporary restrictions with expiration dates
- Restriction reasons/notes visible to users
- Appeal system for banned users
- Automatic restrictions based on behavior
- Restriction history/audit log
- Email notifications when restricted
- Graduated restriction levels (warning → temporary → permanent)

## Notes

- All restrictions are enforced on the **client-side** for immediate feedback
- Server-side validation should also be implemented for security
- Admins are typically exempt from restrictions
- The system uses a "default allow" approach - undefined means allowed
