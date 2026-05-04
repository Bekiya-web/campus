# How to Use Translations in Components

## Quick Start

The translation system is now set up! Here's how to use it in any component:

### Step 1: Import the Hook

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

### Step 2: Get Translations

```typescript
function MyComponent() {
  const { t, language } = useLanguage();
  
  // Now use t.section.key for any text
  return <h1>{t.common.welcome}</h1>;
}
```

---

## Examples

### Example 1: Simple Button

**Before:**
```typescript
<Button>Save Changes</Button>
```

**After:**
```typescript
const { t } = useLanguage();
<Button>{t.settings.saveChanges}</Button>
```

### Example 2: Page Title

**Before:**
```typescript
<h1>Dashboard</h1>
```

**After:**
```typescript
const { t } = useLanguage();
<h1>{t.dashboard.title}</h1>
```

### Example 3: Navigation Menu

**Before:**
```typescript
const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/materials", label: "Materials" },
  { to: "/profile", label: "Profile" },
];
```

**After:**
```typescript
const { t } = useLanguage();
const navItems = [
  { to: "/dashboard", label: t.nav.dashboard },
  { to: "/materials", label: t.nav.materials },
  { to: "/profile", label: t.nav.profile },
];
```

---

## Available Translation Keys

### Common (t.common)
- `appName` - "EduNexus"
- `welcome` - "Welcome" / "Baga Nagaan Dhuftan" / "እንኳን ደህና መጡ"
- `loading` - "Loading..."
- `save` - "Save"
- `cancel` - "Cancel"
- `delete` - "Delete"
- `edit` - "Edit"
- `search` - "Search"
- `filter` - "Filter"
- `back` - "Back"
- `next` - "Next"
- `submit` - "Submit"
- `close` - "Close"
- `yes` - "Yes"
- `no` - "No"
- `ok` - "OK"
- `error` - "Error"
- `success` - "Success"

### Navigation (t.nav)
- `home` - "Home"
- `dashboard` - "Dashboard"
- `materials` - "Materials"
- `upload` - "Upload"
- `discussions` - "Discussions"
- `news` - "News"
- `profile` - "Profile"
- `settings` - "Settings"
- `logout` - "Logout"
- `login` - "Login"
- `register` - "Register"
- `gpaCalculator` - "GPA Calculator"
- `freshmanHub` - "Freshman Hub"
- `admin` - "Admin"

### Auth (t.auth)
- `login` - "Login"
- `register` - "Register"
- `email` - "Email"
- `password` - "Password"
- `confirmPassword` - "Confirm Password"
- `fullName` - "Full Name"
- `university` - "University"
- `department` - "Department"
- `year` - "Year"
- `forgotPassword` - "Forgot Password?"
- `rememberMe` - "Remember Me"
- `signInWithGoogle` - "Sign in with Google"
- `loginSuccess` - "Login successful!"
- `registerSuccess` - "Registration successful!"

### Dashboard (t.dashboard)
- `title` - "Dashboard"
- `welcome` - "Welcome back"
- `quickStats` - "Quick Stats"
- `recentMaterials` - "Recent Materials"
- `recentDiscussions` - "Recent Discussions"
- `upcomingEvents` - "Upcoming Events"
- `myProgress` - "My Progress"

### Materials (t.materials)
- `title` - "Study Materials"
- `uploadMaterial` - "Upload Material"
- `searchMaterials` - "Search materials..."
- `filterByDepartment` - "Filter by Department"
- `filterByYear` - "Filter by Year"
- `filterByCourse` - "Filter by Course"
- `noMaterials` - "No materials found"
- `downloadMaterial` - "Download"
- `viewDetails` - "View Details"
- `rating` - "Rating"
- `downloads` - "Downloads"
- `uploadedBy` - "Uploaded by"
- `uploadDate` - "Upload Date"

### Settings (t.settings)
- `title` - "Settings"
- `profile` - "Profile"
- `notifications` - "Notifications"
- `security` - "Security"
- `preferences` - "Preferences"
- `language` - "Language"
- `darkMode` - "Dark Mode"
- `emailNotifications` - "Email Notifications"
- `pushNotifications` - "Push Notifications"
- `publicProfile` - "Public Profile"
- `showEmail` - "Show Email Publicly"
- `changePassword` - "Change Password"
- `currentPassword` - "Current Password"
- `newPassword` - "New Password"
- `confirmNewPassword` - "Confirm New Password"
- `twoFactorAuth` - "Two-Factor Authentication"
- `enable2FA` - "Enable 2FA"
- `disable2FA` - "Disable 2FA"
- `saveChanges` - "Save Changes"

### Profile (t.profile)
- `title` - "Profile"
- `editProfile` - "Edit Profile"
- `bio` - "Bio"
- `points` - "Points"
- `uploads` - "Uploads"
- `bookmarks` - "Bookmarks"
- `badges` - "Badges"
- `activity` - "Activity"
- `myUploads` - "My Uploads"
- `myBookmarks` - "My Bookmarks"
- `recentActivity` - "Recent Activity"

### Messages (t.messages)
- `profileUpdated` - "Profile updated successfully!"
- `settingsSaved` - "Settings saved successfully!"
- `passwordChanged` - "Password changed successfully!"
- `materialUploaded` - "Material uploaded successfully!"
- `materialDeleted` - "Material deleted successfully!"
- `bookmarkAdded` - "Bookmark added!"
- `bookmarkRemoved` - "Bookmark removed!"
- `commentAdded` - "Comment added!"
- `commentDeleted` - "Comment deleted!"
- `errorOccurred` - "An error occurred"
- `tryAgain` - "Please try again"

---

## Components Already Updated

✅ **Sidebar** - All navigation items translated
✅ **Settings** - Page title and menu items translated
✅ **Dashboard** - Welcome message translated

---

## How to Update More Components

### 1. Find Hardcoded Text

Look for any English text in your component:
```typescript
<h1>My Page Title</h1>
<Button>Click Me</Button>
<p>Some description text</p>
```

### 2. Add useLanguage Hook

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  // ...
}
```

### 3. Replace Text with Translation Keys

```typescript
<h1>{t.common.welcome}</h1>
<Button>{t.common.save}</Button>
<p>{t.dashboard.recentMaterials}</p>
```

### 4. Test All Languages

1. Click Globe icon in navbar
2. Select "Afaan Oromoo"
3. Verify text changes
4. Select "አማርኛ (Amharic)"
5. Verify text changes
6. Select "English"
7. Verify text changes back

---

## Priority Components to Update

### High Priority (Most Visible)
1. ✅ Sidebar navigation
2. ✅ Settings page
3. ✅ Dashboard welcome
4. ⏳ Login page
5. ⏳ Register page
6. ⏳ Materials page
7. ⏳ Profile page
8. ⏳ Upload page

### Medium Priority
9. ⏳ Discussions page
10. ⏳ News page
11. ⏳ GPA Calculator
12. ⏳ Admin Dashboard

### Low Priority
13. ⏳ Footer
14. ⏳ Error messages
15. ⏳ Toast notifications

---

## Tips

### 1. Use Consistent Keys

Always use the translation keys, never hardcode text:
```typescript
// ❌ Bad
<Button>Save</Button>

// ✅ Good
<Button>{t.common.save}</Button>
```

### 2. Handle Dynamic Text

For text with variables:
```typescript
// English: "Welcome back, John!"
// Afaan Oromoo: "Baga Nagaan Deebitan, John!"
// Amharic: "እንኳን ደህና ተመለሱ, John!"

<h1>{t.dashboard.welcome}, {userName}!</h1>
```

### 3. Test After Changes

Always test all three languages after making changes:
1. Change language to Afaan Oromoo
2. Navigate to your updated page
3. Verify all text is in Afaan Oromoo
4. Repeat for Amharic and English

---

## Common Patterns

### Pattern 1: Form Labels

```typescript
const { t } = useLanguage();

<Label>{t.auth.email}</Label>
<Input type="email" />

<Label>{t.auth.password}</Label>
<Input type="password" />
```

### Pattern 2: Button Text

```typescript
const { t } = useLanguage();

<Button>{t.common.save}</Button>
<Button>{t.common.cancel}</Button>
<Button>{t.common.delete}</Button>
```

### Pattern 3: Page Titles

```typescript
const { t } = useLanguage();

<h1>{t.materials.title}</h1>
<h1>{t.profile.title}</h1>
<h1>{t.settings.title}</h1>
```

### Pattern 4: Toast Messages

```typescript
const { t } = useLanguage();

toast.success(t.messages.profileUpdated);
toast.error(t.messages.errorOccurred);
```

---

## Need More Translations?

If you need a translation that doesn't exist:

1. Open `frontend/src/i18n/translations.ts`
2. Add the key to the `Translations` interface
3. Add translations for all three languages (en, om, am)
4. Use the new key in your component

Example:
```typescript
// 1. Add to interface
export interface Translations {
  mySection: {
    myNewKey: string;
  };
}

// 2. Add translations
en: {
  mySection: {
    myNewKey: 'My English Text',
  },
},
om: {
  mySection: {
    myNewKey: 'My Afaan Oromoo Text',
  },
},
am: {
  mySection: {
    myNewKey: 'My Amharic Text',
  },
}

// 3. Use in component
const { t } = useLanguage();
<p>{t.mySection.myNewKey}</p>
```

---

## Summary

✅ Translation system is ready
✅ 100+ strings already translated
✅ Easy to use with `useLanguage()` hook
✅ Just replace hardcoded text with `t.section.key`
✅ Test with Globe icon in navbar

Start updating components one by one, and soon the entire app will be multilingual! 🌍
