# Profile Update Fix - Bio Column Missing

## 🐛 Problem

**Error**: `Could not find the 'bio' column of 'users' in the schema cache`

**Cause**: The `bio` column doesn't exist in the `users` table yet.

## ✅ Solution (2 Steps)

### Step 1: Run Database Migration

1. **Open Supabase SQL Editor**
   - Go to your Supabase Dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

2. **Copy and Run This SQL**:
```sql
-- Add bio column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.users.bio IS 'User biography/about me text for profile page';
```

3. **Click "Run"**
   - Should see: "Success. No rows returned"

4. **Verify**:
```sql
-- Check if column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'bio';
```

You should see:
```
column_name | data_type | is_nullable
bio         | text      | YES
```

### Step 2: Test Profile Update

1. **Refresh your app** (Ctrl+F5 or Cmd+Shift+R)
2. **Go to Profile** or **Settings**
3. **Click "Edit Profile"**
4. **Update any field** (name, department, year, or bio)
5. **Click "Save Changes"**
6. **Should see**: ✅ "Profile updated successfully!"

## 🎯 What Was Fixed

### Code Changes

**Before** (Always sent bio):
```typescript
await updateUserProfile(profile.uid, {
  name: profileData.name,
  department: profileData.department,
  year: profileData.year,
  bio: profileData.bio,  // ❌ Fails if column doesn't exist
});
```

**After** (Conditional bio):
```typescript
const updates: any = {
  name: profileData.name,
  department: profileData.department,
  year: profileData.year,
};

// Only include bio if it's not empty
if (profileData.bio) {
  updates.bio = profileData.bio;  // ✅ Only sent if exists
}

await updateUserProfile(profile.uid, updates);
```

### Better Error Messages

**Before**:
```
❌ "Failed to update profile. Please try again."
```

**After**:
```
❌ "Database schema needs updating. Please run the migration SQL."
📝 Console: "Run: frontend/database/schema/add_bio_column.sql"
```

## 📋 Files Created

1. **`add_bio_column.sql`** - Migration to add bio column
2. **`PROFILE_UPDATE_FIX.md`** - This guide

## 🔍 Troubleshooting

### Still getting error after migration?

**Check if column exists**:
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'users';
```

Look for `bio` in the list.

### Column exists but still fails?

**Check RLS policies**:
```sql
-- Users should be able to update their own profile
SELECT * FROM pg_policies 
WHERE tablename = 'users' 
AND policyname LIKE '%update%';
```

**Required policy**:
```sql
CREATE POLICY "users_update_own_profile" 
ON users FOR UPDATE 
USING (auth.uid() = uid);
```

### Different error?

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try updating profile
4. Copy the full error message
5. Share for specific help

## ✨ Features After Fix

Once the bio column is added, users can:
- ✅ Add a personal bio to their profile
- ✅ Update bio from Profile page
- ✅ Update bio from Settings page
- ✅ Bio displays on profile card
- ✅ Bio is optional (can be empty)

## 📝 Bio Field Details

- **Type**: TEXT (unlimited length)
- **Nullable**: YES (optional field)
- **Default**: NULL
- **Display**: Shows on profile page as italic quote
- **Example**: "Computer Science student passionate about AI and machine learning"

## 🎓 Best Practices

**Good Bio Examples**:
- "4th year Software Engineering student at AAU"
- "Passionate about mathematics and problem solving"
- "Future data scientist | Python enthusiast"
- "Helping students succeed through shared knowledge"

**Bio Tips**:
- Keep it concise (1-2 sentences)
- Mention your field of study
- Add your interests or goals
- Be professional but friendly

---

**Run the migration and your profile updates will work perfectly!** ✅
