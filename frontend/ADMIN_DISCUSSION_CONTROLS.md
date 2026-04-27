# Admin Discussion Controls - Implementation Guide

## Overview
Admins can now delete or temporarily hide discussion posts from regular users. This feature provides moderation capabilities for managing inappropriate or problematic content.

## Features Implemented

### 1. Delete Discussion Post
- **Access**: Admin only
- **Action**: Permanently deletes the post, all comments, and all likes
- **UI**: Red "Delete Post" option in dropdown menu
- **Confirmation**: Shows warning dialog before deletion
- **Redirect**: After deletion, user is redirected to discussions page

### 2. Hide Discussion Post
- **Access**: Admin only
- **Action**: Hides post from regular users (admins can still see it)
- **Duration Options**:
  - **Temporary**: Set duration in hours (e.g., 24 hours, 168 hours for 1 week)
  - **Indefinite**: Leave duration empty to hide permanently
- **UI**: Orange "Hide Post" option in dropdown menu
- **Visual Indicator**: Hidden posts show an orange badge for admins with hide duration

### 3. Unhide Discussion Post
- **Access**: Admin only
- **Action**: Makes hidden post visible to all users again
- **UI**: Green "Unhide Post" option (replaces "Hide Post" when post is hidden)
- **Auto-unhide**: Posts with `hideUntil` timestamp automatically become visible after the duration expires

## Database Changes

### New Columns Added to `discussion_posts` Table
```sql
-- Boolean flag to mark post as hidden
hidden boolean NOT NULL DEFAULT false

-- Optional timestamp for temporary hiding
hideUntil timestamptz NULL
```

### Migration File
Run the SQL migration: `frontend/database/discussions/add_hidden_fields.sql`

## Code Changes

### 1. Service Layer (`discussionService.ts`)
- Updated `DiscussionPost` interface with `hidden` and `hideUntil` fields
- Updated `getDiscussionPosts()` to filter hidden posts for non-admins
- Updated `getPostById()` to check hidden status for non-admins
- Added `deleteDiscussionPost()` - Deletes post and all related data
- Added `hideDiscussionPost()` - Hides post with optional duration
- Added `unhideDiscussionPost()` - Makes post visible again

### 2. UI Components (`DiscussionDetail.tsx`)
- Added admin dropdown menu with three-dot icon
- Added delete confirmation dialog
- Added hide duration dialog with hours input
- Added visual badge showing hidden status (admin only)
- Added state management for dialogs and loading states

### 3. Discussions List (`Discussions.tsx`)
- Updated to pass `isAdmin` flag to `getDiscussionPosts()`
- Hidden posts automatically filtered out for non-admins

## User Experience

### For Admins
1. **View Post**: See orange "Hidden" badge if post is hidden
2. **Access Controls**: Click three-dot menu next to Share button
3. **Delete**: 
   - Click "Delete Post" → Confirmation dialog → Confirm deletion
   - Post and all data permanently removed
4. **Hide**:
   - Click "Hide Post" → Enter duration in hours (optional) → Confirm
   - Post hidden from regular users
   - Badge shows hide status and expiration time
5. **Unhide**:
   - Click "Unhide Post" → Post immediately visible to all users

### For Regular Users
- Hidden posts do not appear in discussions list
- Attempting to access hidden post URL shows "Discussion not found"
- No indication that post was hidden (appears as if it doesn't exist)
- Posts automatically reappear when hide duration expires

## Hide Duration Examples
- **1 hour**: Enter `1`
- **24 hours (1 day)**: Enter `24`
- **168 hours (1 week)**: Enter `168`
- **720 hours (30 days)**: Enter `720`
- **Indefinite**: Leave empty

## Security & Permissions
- All admin actions check `profile.role === 'admin'`
- RLS policies already allow admins to update/delete posts
- Non-admins cannot see hidden posts even with direct URL access
- Expired hide durations automatically restore visibility

## Testing Checklist
- [ ] Admin can delete post successfully
- [ ] Admin can hide post indefinitely
- [ ] Admin can hide post with duration
- [ ] Admin can unhide post
- [ ] Hidden posts don't appear for regular users
- [ ] Hidden posts appear for admins with badge
- [ ] Post auto-unhides after duration expires
- [ ] Delete removes all comments and likes
- [ ] Non-admins cannot access admin controls

## Future Enhancements (Optional)
- Add reason field for hiding/deleting
- Send notification to post author when hidden/deleted
- Add admin activity log for moderation actions
- Add bulk moderation tools
- Add report system for users to flag inappropriate posts
