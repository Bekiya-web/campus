# Translation System - Quick Reference Guide

## How to Use Translations in Components

### 1. Import the Hook
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

### 2. Use in Component
```typescript
function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t.common.appName}</h1>
      <p>{t.common.welcome}</p>
      <button>{t.buttons.save}</button>
    </div>
  );
}
```

## Available Translation Sections

### Common (`t.common`)
Basic UI elements: appName, welcome, loading, save, cancel, delete, edit, search, filter, back, next, submit, close, yes, no, ok, error, success, viewDetails, learnMore, getStarted, readMore, seeAll, noResults, tryAgain

### Navigation (`t.nav`)
Menu items: home, dashboard, materials, upload, discussions, news, profile, settings, logout, login, register, gpaCalculator, freshmanHub, admin, globalChat, projects, features, logIn, signOut, notifications, noNotifications, markAsRead, viewAllNotifications

### Auth (`t.auth`)
Authentication: login, register, logout, email, password, confirmPassword, fullName, university, department, year, forgotPassword, rememberMe, dontHaveAccount, alreadyHaveAccount, signInWithGoogle, loginSuccess, registerSuccess, logoutSuccess, invalidCredentials, createAccount, signIn, selectUniversity, selectDepartment, selectYear

### Home (`t.home`)
Landing page: heroTitle, heroSubtitle, heroDescription, joinNow, exploreFeatures, featuresTitle, featuresSubtitle, feature1-4 (Title/Description), howItWorksTitle, howItWorksSubtitle, step1-3 (Title/Description), testimonialTitle, testimonialSubtitle, ctaTitle, ctaSubtitle, ctaButton

### Dashboard (`t.dashboard`)
Dashboard page: title, welcome, quickStats, recentMaterials, recentDiscussions, upcomingEvents, myProgress, totalPoints, materialsUploaded, bookmarked, discussions, viewAll, noMaterials, noDiscussions, uploadFirst, startDiscussion

### Materials (`t.materials`)
Materials page: title, uploadMaterial, searchMaterials, filterByDepartment, filterByYear, filterByCourse, noMaterials, downloadMaterial, viewDetails, rating, downloads, uploadedBy, uploadDate, allDepartments, allYears, allCourses, sortBy, newest, oldest, mostDownloaded, highestRated, materialType, notes, pastPapers, assignments, books, other

### Upload (`t.upload`)
Upload page: title, uploadMaterial, materialTitle, description, course, department, year, materialType, selectFile, uploadButton, uploading, uploadSuccess, uploadError, dragDrop, fileSelected, maxSize, supportedFormats

### Settings (`t.settings`)
Settings page: title, profile, notifications, security, preferences, language, darkMode, emailNotifications, pushNotifications, publicProfile, showEmail, changePassword, currentPassword, newPassword, confirmNewPassword, twoFactorAuth, enable2FA, disable2FA, saveChanges, profileInformation, updatePersonalInfo, privacyVisibility, allowOthersView, showActivity, displayActivity, accountData, exportData, downloadCopy, deleteAccount, permanentlyDelete, notificationPreferences, chooseNotifications, materialUpdates, newMaterials, newMessages, weeklyDigest, securitySettings, managePassword, addExtraSecurity, activeSessions, manageSessions, currentSession, appearance, enableDarkTheme, languageRegion, selectLanguage, displayOptions, itemsPerPage, showEmailProfile

### Profile (`t.profile`)
Profile page: title, editProfile, bio, points, uploads, bookmarks, badges, activity, myUploads, myBookmarks, recentActivity, level, nextLevel, progressToNext, morePoints, achievements, noUploads, noBookmarks, noActivity, uploadFirst, bookmarkMaterials, startActivity, uploaded, bookmarked, changeCover, joinedDate

### Discussions (`t.discussions`)
Discussions page: title, createPost, searchDiscussions, filterByTopic, noDiscussions, startFirst, postTitle, postContent, selectTopic, publish, comments, views, postedBy, postedOn, addComment, writeComment, reply, edit, delete, report, share, allTopics, general, academic, career, social

### News (`t.news`)
News page: title, latestNews, searchNews, filterByCategory, noNews, readMore, publishedOn, category, allCategories, admission, scholarship, event, deadline, announcement, featured, tags, relatedNews, shareNews, saveNews, eventDate, deadlineDate

### GPA (`t.gpa`)
GPA Calculator: title, calculator, addCourse, courseName, creditHours, grade, remove, calculate, yourGPA, totalCredits, semesterGPA, cumulativeGPA, gradingScale, performanceGuide, excellent, veryGood, good, satisfactory, pass, fail, proTips, tip1, tip2, tip3

### Admin (`t.admin`)
Admin Dashboard: title, dashboard, users, materials, discussions, news, statistics, totalUsers, totalMaterials, pendingApprovals, totalDiscussions, searchUsers, filterByRole, allRoles, students, admins, viewDetails, restrictActions, changeRole, deleteUser, approveMaterial, rejectMaterial, deleteMaterial, hidePost, unhidePost, deletePost, createNews, editNews, deleteNews, activityLog, recentActivity

### Footer (`t.footer`)
Footer: product, account, features, aboutUs, contactUs, privacyPolicy, termsOfService, helpCenter, builtFor, allRightsReserved, professionalPlatform, modernPlace, joinNow, getFullAccess, createFreeAccount

### Messages (`t.messages`)
Toast messages: profileUpdated, settingsSaved, passwordChanged, materialUploaded, materialDeleted, bookmarkAdded, bookmarkRemoved, commentAdded, commentDeleted, postCreated, postDeleted, errorOccurred, tryAgain, confirmDelete, cannotUndo, areYouSure, loginRequired, pleaseLogin, accessDenied, noPermission, networkError, checkConnection

### Buttons (`t.buttons`)
Button labels: save, cancel, delete, edit, upload, download, share, bookmark, unbookmark, like, unlike, comment, reply, report, approve, reject, hide, unhide, viewMore, loadMore, refresh, filter, sort, export, import, print, copy, paste, cut, undo, redo

## Language Switching

### Get Current Language
```typescript
const { language } = useLanguage();
console.log(language); // 'en' | 'om' | 'am'
```

### Change Language
```typescript
const { changeLanguage } = useLanguage();
changeLanguage('om'); // Switch to Afaan Oromoo
changeLanguage('am'); // Switch to Amharic
changeLanguage('en'); // Switch to English
```

### Get Language Name
```typescript
import { languageNames } from '@/i18n/translations';
console.log(languageNames.en); // 'English'
console.log(languageNames.om); // 'Afaan Oromoo'
console.log(languageNames.am); // 'አማርኛ (Amharic)'
```

## Examples

### Simple Button
```typescript
<button>{t.buttons.save}</button>
```

### Form Field
```typescript
<input 
  type="email" 
  placeholder={t.auth.email}
/>
```

### Conditional Message
```typescript
{materials.length === 0 ? (
  <p>{t.materials.noMaterials}</p>
) : (
  <p>{t.materials.viewDetails}</p>
)}
```

### Dynamic Content
```typescript
<h1>{t.dashboard.welcome}, {user.name}!</h1>
```

## Best Practices

1. **Always use translations** - Never hardcode strings
2. **Use appropriate section** - Choose the right translation category
3. **Keep keys semantic** - Use descriptive key names
4. **Test all languages** - Verify text displays correctly in all 3 languages
5. **Handle long text** - Ensure UI accommodates different text lengths
6. **Use common section** - For generic terms used across multiple pages

## Supported Languages

- **English (en)**: Default language
- **Afaan Oromoo (om)**: Oromo language with proper orthography
- **አማርኛ (am)**: Amharic with Ge'ez script

## Language Persistence

The selected language is automatically saved to `localStorage` and persists across sessions.
