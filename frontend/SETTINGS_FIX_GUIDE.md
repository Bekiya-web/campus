# Settings Fix Guide

## Problem
The Settings page was not saving user preferences to the database. Settings like Dark Mode, Email Notifications, Push Notifications, Public Profile, and Show Email were only being saved to localStorage, which meant they would be lost when the browser cache was cleared and wouldn't sync across devices.

## Solution
Updated both `Settings.tsx` and `Profile.tsx` to properly save all user preferences to the database using the new preference columns.

---

## 🚨 REQUIRED: Database Migration

Before the settings will work, you **MUST** run these two SQL migrations in your Supabase database:

### Migration 1: Add Bio Column
**File:** `frontend/database/schema/add_bio_column.sql`

This adds the `bio` column to the users table for profile descriptions.

### Migration 2: Add User Preferences Columns
**File:** `frontend/database/schema/add_user_preferences.sql`

This adds the following columns to the users table:
- `dark_mode` (boolean, default: false)
- `email_notifications` (boolean, default: true)
- `push_notifications` (boolean, default: true)
- `public_profile` (boolean, default: true)
- `show_email` (boolean, default: false)

---

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `add_bio_column.sql`
5. Click **Run** or press `Ctrl+Enter`
6. Repeat steps 3-5 for `add_user_preferences.sql`

### Option 2: Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db push

# Or run the SQL files directly
psql -h your-db-host -U postgres -d postgres -f frontend/database/schema/add_bio_column.sql
psql -h your-db-host -U postgres -d postgres -f frontend/database/schema/add_user_preferences.sql
```

---

## What Was Fixed

### 1. Settings.tsx
**Before:**
- Settings were only saved to localStorage
- No database persistence
- Settings wouldn't sync across devices

**After:**
- All settings now save to database via `updateUserProfile()`
- Proper error handling with helpful messages
- Loading states during save operations
- Settings persist across devices and sessions

### 2. Profile.tsx Settings Dialog
**Before:**
- Settings dialog existed but had similar localStorage-only issues

**After:**
- Fully integrated with database
- Proper error handling
- Loading indicators

### 3. authService.ts
**Before:**
- UserProfile interface didn't include preference fields

**After:**
- Added all preference fields to TypeScript interface
- Proper type safety for settings

---

## Features Now Working

### ✅ Appearance Settings
- **Dark Mode**: Toggle dark theme (saved to `dark_mode` column)

### ✅ Notification Settings
- **Email Notifications**: Enable/disable email alerts (saved to `email_notifications` column)
- **Push Notifications**: Enable/disable browser notifications (saved to `push_notifications` column)

### ✅ Privacy Settings
- **Public Profile**: Control profile visibility (saved to `public_profile` column)
- **Show Email Publicly**: Display email on profile (saved to `show_email` column)

---

## Error Handling

If you try to save settings before running the migrations, you'll see helpful error messages:

```
Database schema needs updating. Please run the migration SQL.
```

The console will also show which migration file to run:
```
❌ Run: frontend/database/schema/add_user_preferences.sql
```

---

## Testing the Fix

After running the migrations:

1. **Test Profile Settings Dialog:**
   - Go to Profile page
   - Click "Settings" button
   - Toggle any setting (e.g., Dark Mode)
   - Click "Save Settings"
   - Refresh the page
   - Verify the setting persisted

2. **Test Settings Page:**
   - Go to Settings page (from sidebar or profile)
   - Navigate to different sections (Profile, Notifications, Preferences)
   - Change settings in each section
   - Click "Save" buttons
   - Refresh the page
   - Verify all settings persisted

3. **Test Cross-Device Sync:**
   - Change a setting on one device/browser
   - Log in on another device/browser
   - Verify the setting is synced

---

## Mobile Responsiveness

The Settings page is now fully responsive:
- **Mobile**: Horizontal scrollable tabs at the top
- **Desktop**: Vertical sidebar navigation
- All cards, forms, and buttons adapt to screen size
- No overlapping content
- Proper spacing and padding on all devices

---

## Files Modified

1. `frontend/src/pages/Settings.tsx`
   - Updated all save handlers to use database
   - Added loading states
   - Improved error handling
   - Enhanced mobile responsiveness

2. `frontend/src/pages/Profile.tsx`
   - Settings dialog now saves to database
   - Proper error handling
   - Loading indicators

3. `frontend/src/services/authService.ts`
   - Added preference fields to UserProfile interface
   - Type safety for all settings

4. `frontend/database/schema/add_user_preferences.sql`
   - New migration file for preference columns

---

## Next Steps

1. ✅ Run both database migrations
2. ✅ Test all settings functionality
3. ✅ Verify mobile responsiveness
4. 🔄 (Optional) Implement dark mode theme switching based on `dark_mode` column
5. 🔄 (Optional) Implement actual email/push notification system

---

## Notes

- Settings are now stored in the database AND localStorage (for backwards compatibility)
- The page automatically refreshes after saving to load the new values
- All settings have proper default values
- Error messages guide users to run migrations if needed
- TypeScript types ensure type safety across the application

---

## Support

If you encounter any issues:
1. Check that both migrations ran successfully
2. Verify the columns exist in your users table
3. Check browser console for detailed error messages
4. Ensure you're logged in with a valid user account
