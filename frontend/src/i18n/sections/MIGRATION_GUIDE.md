# Migration Guide: Language-Based to Section-Based

This guide explains how to migrate from the current language-based structure to a section-based structure if needed.

## Current Structure (Language-Based)

```
languages/
├── en.ts    # All English translations (810 lines)
├── om.ts    # All Afaan Oromoo translations (810 lines)
└── am.ts    # All Amharic translations (810 lines)
```

**Pros:**
- ✅ Simple structure
- ✅ Easy to ensure translation completeness
- ✅ Good for language-focused teams
- ✅ All translations for one language in one place

**Cons:**
- ❌ Large files (~810 lines each)
- ❌ Hard to work on same language simultaneously
- ❌ Can't lazy-load by feature

## Target Structure (Section-Based)

```
sections/
├── common/
│   ├── en.ts (30 lines)
│   ├── om.ts (30 lines)
│   └── am.ts (30 lines)
├── auth/
│   ├── en.ts (40 lines)
│   ├── om.ts (40 lines)
│   └── am.ts (40 lines)
├── materials/
│   ├── en.ts (60 lines)
│   ├── om.ts (60 lines)
│   └── am.ts (60 lines)
└── ... (28 sections total)
```

**Pros:**
- ✅ Small, focused files (~30-60 lines)
- ✅ Feature-based organization
- ✅ Multiple people can work simultaneously
- ✅ Can lazy-load sections
- ✅ Better for micro-frontends

**Cons:**
- ❌ More complex structure
- ❌ More files to manage (84 files vs 3)
- ❌ Harder to ensure translation completeness

## Migration Steps

### Step 1: Create Section Folders

```bash
mkdir -p frontend/src/i18n/sections/{common,nav,auth,dashboard,materials,upload,settings,profile,discussions,news,gpa,admin,footer,messages,buttons,freshman,community,placeholders,chat,adminActivity,materialsManagement,featureRequest,aiChat,newsPage,newsFilters,discussionDetail,postForm,adminSetup}
```

### Step 2: Extract Sections from Language Files

For each section, create three files (en, om, am):

```typescript
// sections/common/en.ts
import type { CommonTranslations } from '../../types';

export const common: CommonTranslations = {
  appName: 'EduNexus',
  welcome: 'Welcome',
  // ... rest of common translations
};
```

### Step 3: Create Section Index Files

```typescript
// sections/common/index.ts
export { common as en } from './en';
export { common as om } from './om';
export { common as am } from './am';
```

### Step 4: Update Language Files

```typescript
// languages/en.ts
import type { Translations } from '../types';
import { en as common } from '../sections/common';
import { en as nav } from '../sections/nav';
import { en as auth } from '../sections/auth';
// ... import all sections

export const en: Translations = {
  common,
  nav,
  auth,
  // ... all sections
};
```

### Step 5: Verify Build

```bash
npm run build
```

## Automation Script

Here's a Python script to automate the migration:

```python
# migrate_to_sections.py
import os
import re

sections = [
    'common', 'nav', 'auth', 'dashboard', 'materials', 'upload',
    'settings', 'profile', 'discussions', 'news', 'gpa', 'admin',
    'footer', 'messages', 'buttons', 'freshman', 'community',
    'placeholders', 'chat', 'adminActivity', 'materialsManagement',
    'featureRequest', 'aiChat', 'newsPage', 'newsFilters',
    'discussionDetail', 'postForm', 'adminSetup'
]

languages = ['en', 'om', 'am']

# Create section folders
for section in sections:
    os.makedirs(f'frontend/src/i18n/sections/{section}', exist_ok=True)

# Extract and create section files
for lang in languages:
    with open(f'frontend/src/i18n/languages/{lang}.ts', 'r') as f:
        content = f.read()
    
    for section in sections:
        # Extract section content using regex
        pattern = rf'{section}: \{{([^}}]+)\}},'
        match = re.search(pattern, content, re.DOTALL)
        
        if match:
            section_content = match.group(1)
            
            # Create section file
            with open(f'frontend/src/i18n/sections/{section}/{lang}.ts', 'w') as f:
                f.write(f"// {section.title()} translations\n")
                f.write(f"import type {{ {section.title()}Translations }} from '../../types';\n\n")
                f.write(f"export const {section}: {section.title()}Translations = {{\n")
                f.write(section_content)
                f.write("\n};\n")

print("✅ Migration complete!")
```

## When to Migrate

Migrate to section-based structure when:

1. **File size** - Language files exceed 1,500 lines
2. **Team size** - Multiple people need to work on translations simultaneously
3. **Feature teams** - Different teams own different features
4. **Lazy loading** - Need to load translations on-demand
5. **Micro-frontends** - Building modular applications

## Recommendation

**Current Status: DO NOT MIGRATE**

The current language-based structure is optimal because:
- ✅ Files are manageable (~810 lines)
- ✅ Build is passing with 0 errors
- ✅ Simple and maintainable
- ✅ Easy to ensure translation completeness

Only migrate if you experience the issues listed above.

---

**Last Updated**: 2026-05-04
