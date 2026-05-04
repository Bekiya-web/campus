# Remaining Pages Translation Plan

## Pages That Need Translation

### ✅ Already Translated (Batch 1)
1. Login page
2. Register page
3. Home page (Hero, Features, How It Works, Universities, Projects)
4. Dashboard page
5. Navbar
6. Sidebar
7. Footer

### ⏳ Need Translation (Batch 2 & 3)

#### Batch 2: Core Pages
1. **Materials Page** - Browse, filter, search materials
2. **Upload Page** - Upload form with all fields
3. **Profile Page** - User profile, stats, tabs, settings
4. **Settings Page** - All settings sections

#### Batch 3: Community & Tools
5. **Discussions Page** - Forum posts, search, create
6. **News Page** - News articles, filters, featured
7. **GPA Calculator** - Course management, grading
8. **Admin Dashboard** - User management, approvals
9. **Global Chat** - Chat interface
10. **Freshman Hub** - Year 1 materials

## Translation Keys Needed

### Materials Page
- Page title, description
- Filter labels (University, Department, Year)
- "Any" options
- Search placeholder
- Results count
- Empty states
- Login required message

### Upload Page
- Page title, description
- Form labels (Title, Description, Course, etc.)
- File upload area
- Progress indicator
- Success/error messages
- Submit button

### Profile Page
- Profile sections (Bio, Stats, Activity)
- Tab labels (Uploads, Bookmarks, Activity)
- Edit profile dialog
- Settings dialog
- Level/badge system
- Empty states

### Settings Page
- All setting categories
- Toggle labels
- Save/cancel buttons
- Success messages

### Discussions Page
- Page title, description
- Search placeholder
- Create post button
- Post form fields
- Empty states

### News Page
- Page title, description
- Category filters
- Featured section
- Post news button (admin)
- Empty states

### GPA Calculator
- Page title
- Course fields
- Grade scale
- Performance guide
- Pro tips
- Calculate button

## Estimated Work
- **Total Strings**: ~400 new translation keys
- **Files to Modify**: 10+ page files
- **Translation Coverage**: 3 languages (English, Afaan Oromoo, Amharic)
- **Total Translations**: ~1,200 strings (400 × 3 languages)

## Implementation Strategy
1. Add all translation keys to translations.ts interface
2. Add English translations
3. Add Afaan Oromoo translations
4. Add Amharic translations
5. Update each page component to use translations
6. Test all pages in all 3 languages
7. Verify build succeeds

## Priority Order
1. Materials (most used)
2. Upload (critical for content)
3. Profile (user engagement)
4. Discussions (community)
5. News (information)
6. GPA Calculator (utility)
7. Settings (configuration)
8. Admin (management)
