# How to Use New Translations - Quick Reference

## 🚀 Quick Start

All placeholder texts and component strings now have translations! Here's how to use them:

---

## 📖 Basic Usage

### 1. Import the Translation Hook
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

### 2. Get the Translation Function
```typescript
const { t } = useLanguage();
```

### 3. Use Translations
```typescript
// Instead of:
<Input placeholder="Search users..." />

// Use:
<Input placeholder={t.placeholders.searchUsers} />
```

---

## 🎯 Common Translation Patterns

### Placeholders
```typescript
// Search inputs
<Input placeholder={t.placeholders.searchUsers} />
<Input placeholder={t.placeholders.searchMaterials} />
<Input placeholder={t.placeholders.searchNews} />

// Form inputs
<Input placeholder={t.placeholders.enterTitle} />
<Input placeholder={t.placeholders.enterEmail} />
<Textarea placeholder={t.placeholders.enterContent} />

// Select dropdowns
<SelectValue placeholder={t.placeholders.selectCategory} />
<SelectValue placeholder={t.placeholders.selectUniversity} />
```

### Chat Components
```typescript
// Chat messages
<h3>{t.chat.selectUser}</h3>
<p>{t.chat.noMessagesYet}</p>
<Button>{t.chat.send}</Button>

// Chat user list
<h2>{t.chat.chatUsers}</h2>
<Input placeholder={t.placeholders.searchUsers} />
```

### Admin Components
```typescript
// Activity log
<h3>{t.adminActivity.title}</h3>
<p>{t.adminActivity.subtitle}</p>
<Input placeholder={t.adminActivity.searchPlaceholder} />

// Materials management
<Input placeholder={t.materialsManagement.searchPlaceholder} />
<SelectItem value="approved">{t.materialsManagement.approved}</SelectItem>
<Button>{t.materialsManagement.approve}</Button>
```

### News Components
```typescript
// Create/Edit news
<h1>{t.newsPage.createNews}</h1>
<Input placeholder={t.newsPage.titlePlaceholder} />
<Textarea placeholder={t.newsPage.contentPlaceholder} />
<Button>{t.newsPage.publishNews}</Button>

// News filters
<Input placeholder={t.newsFilters.searchPlaceholder} />
<SelectItem value="all">{t.newsFilters.allCategories}</SelectItem>
```

### Discussion Components
```typescript
// Discussion detail
<Link to="/discussions">{t.discussions.backToDiscussions}</Link>
<h2>{t.discussions.joinConversation}</h2>
<Textarea placeholder={t.discussions.shareThoughtsPlaceholder} />
<Button>{t.discussions.postComment}</Button>

// Post form
<Label>{t.postForm.title}</Label>
<Input placeholder={t.postForm.titlePlaceholder} />
<Textarea placeholder={t.postForm.contentPlaceholder} />
```

### AI Chat Widget
```typescript
<p>{t.aiChat.greeting}</p>
<Input placeholder={t.placeholders.messageAIAssistant} />
<span>{t.aiChat.poweredBy}</span>
```

---

## 📋 Component-Specific Examples

### ChatMessages.tsx
```typescript
// Before
<h3>Select a user to start chatting</h3>
<p>Choose someone from the user list to begin a conversation</p>
<Input placeholder="Type your message..." />

// After
<h3>{t.chat.selectUser}</h3>
<p>{t.chat.chooseFromList}</p>
<Input placeholder={t.placeholders.typeMessage} />
```

### AdminActivityLog.tsx
```typescript
// Before
<h3>Admin Activity Log</h3>
<Input placeholder="Search by admin name, action details, or resource ID..." />
<SelectItem value="all">All Actions</SelectItem>

// After
<h3>{t.adminActivity.title}</h3>
<Input placeholder={t.adminActivity.searchPlaceholder} />
<SelectItem value="all">{t.adminActivity.allActions}</SelectItem>
```

### CreateNews.tsx
```typescript
// Before
<h1>Create News Post</h1>
<Input placeholder="e.g., New Scholarship Opportunity for Graduate Students" />
<Button>Publish News</Button>

// After
<h1>{t.newsPage.createNews}</h1>
<Input placeholder={t.newsPage.titlePlaceholder} />
<Button>{t.newsPage.publishNews}</Button>
```

### DiscussionDetail.tsx
```typescript
// Before
<Link to="/discussions">Back to Discussions</Link>
<Textarea placeholder="Share your thoughts or provide a solution..." />
<Button>Post Comment</Button>

// After
<Link to="/discussions">{t.discussions.backToDiscussions}</Link>
<Textarea placeholder={t.discussions.shareThoughtsPlaceholder} />
<Button>{t.discussions.postComment}</Button>
```

---

## 🎨 Complete Translation Sections Available

### 1. Placeholders (`t.placeholders.*`)
- `searchUsers` - "Search users..."
- `typeMessage` - "Type your message..."
- `searchMaterials` - "Search materials by title, course, or uploader..."
- `searchNews` - "Search news, scholarships, events..."
- `selectCategory` - "Select category"
- `selectUniversity` - "Select university"
- `enterTitle` - "Enter title"
- `enterContent` - "Enter content"
- `messageAIAssistant` - "Message AI Assistant..."
- And 20+ more...

### 2. Chat (`t.chat.*`)
- `selectUser`, `startChatting`, `noMessagesYet`
- `chatUsers`, `online`, `offline`, `send`

### 3. Admin Activity (`t.adminActivity.*`)
- `title`, `subtitle`, `searchPlaceholder`
- `create`, `update`, `delete`, `grantPermission`
- `users`, `materials`, `messages`, `permissions`

### 4. Materials Management (`t.materialsManagement.*`)
- `searchPlaceholder`, `approved`, `pending`, `rejected`
- `materialDetails`, `approve`, `flag`, `reject`
- `deleteMaterial`, `deleteConfirmation`

### 5. Feature Requests (`t.featureRequest.*`)
- `title`, `featureTitle`, `description`, `priority`
- `submitRequest`, `submitting`

### 6. AI Chat (`t.aiChat.*`)
- `greeting`, `online`, `aiAssistant`, `poweredBy`

### 7. News Page (`t.newsPage.*`)
- `createNews`, `editNews`, `titleRequired`
- `summary`, `content`, `coverImage`
- `publishNews`, `saveChanges`

### 8. News Filters (`t.newsFilters.*`)
- `searchPlaceholder`, `allCategories`
- `admissions`, `scholarships`, `events`

### 9. Discussions (`t.discussions.*`)
- `backToDiscussions`, `likes`, `comments`
- `postComment`, `hidePost`, `deletePost`

### 10. Post Form (`t.postForm.*`)
- `title`, `content`, `tags`
- `createPost`, `posting`

### 11. Admin Setup (`t.adminSetup.*`)
- `adminSetup`, `adminKey`, `grantAccess`
- `adminAccessGranted`, `goToAdminDashboard`

---

## 🔄 Migration Checklist

For each component:

1. ✅ Import `useLanguage` hook
2. ✅ Get `t` from `useLanguage()`
3. ✅ Replace all hardcoded placeholder strings
4. ✅ Replace all hardcoded button text
5. ✅ Replace all hardcoded labels and titles
6. ✅ Test in all three languages (en, om, am)
7. ✅ Verify language switching works

---

## 🧪 Testing

### Test Language Switching
```typescript
// In your component
const { language, setLanguage } = useLanguage();

// Test switching
setLanguage('en'); // English
setLanguage('om'); // Afaan Oromoo
setLanguage('am'); // Amharic
```

### Verify Translations
1. Open the component
2. Click the globe icon in navbar
3. Switch between languages
4. Verify all text changes (including placeholders!)

---

## 💡 Tips

### 1. Use Consistent Keys
Always use the translation keys, never hardcode strings:
```typescript
// ❌ Bad
<Input placeholder="Search..." />

// ✅ Good
<Input placeholder={t.placeholders.searchUsers} />
```

### 2. Check for Missing Translations
If you see English text when switching languages, check:
- Is the translation key correct?
- Is the component using `t.*` instead of hardcoded strings?
- Is the translation defined in `translations.ts`?

### 3. Add New Translations
If you need a new translation:
1. Add it to the interface in `translations.ts`
2. Add translations for all 3 languages (en, om, am)
3. Use it in your component with `t.*`

---

## 📚 Full Translation Reference

See `frontend/src/i18n/translations.ts` for the complete list of all available translation keys.

---

## 🎉 Result

After implementing these translations, your component will:
- ✅ Support 3 languages (English, Afaan Oromoo, Amharic)
- ✅ Switch languages instantly
- ✅ Show translated placeholders and text
- ✅ Provide a better user experience for Ethiopian students

---

*Happy translating! 🌍*
