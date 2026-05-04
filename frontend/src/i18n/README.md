# i18n (Internationalization) Structure

## Current Organization

```
frontend/src/i18n/
├── index.ts              # Main entry point - exports translations
├── types/
│   └── index.ts          # TypeScript interfaces (27 interfaces - 859 lines)
├── languages/            # ✅ ACTIVE: Translations organized by language
│   ├── index.ts          # Language exports
│   ├── en.ts             # English translations (810 lines)
│   ├── om.ts             # Afaan Oromoo translations (810 lines)
│   └── am.ts             # Amharic translations (810 lines)
├── sections/             # 📁 OPTIONAL: For feature-based organization
│   ├── README.md         # Explanation of section-based approach
│   ├── MIGRATION_GUIDE.md # How to migrate if needed
│   └── example-common-en.ts # Example section file
├── translations.ts       # Main translations aggregator (21 lines)
└── README.md             # This documentation
```

**Current Approach**: Language-based (files in `languages/` folder)
**Alternative Approach**: Section-based (would use `sections/` folder)

## Supported Languages

- **English (en)** - Default language
- **Afaan Oromoo (om)** - Oromo language
- **አማርኛ (am)** - Amharic language

## Organization Approaches

### Current: Language-Based (Active) ✅

Translations are organized by language in the `languages/` folder:
- `en.ts` - All English translations (810 lines)
- `om.ts` - All Afaan Oromoo translations (810 lines)
- `am.ts` - All Amharic translations (810 lines)

**Best for:**
- ✅ Ensuring translation completeness per language
- ✅ Language-focused teams
- ✅ Simpler structure and maintenance
- ✅ Current project size

### Alternative: Section-Based (Optional) 📁

The `sections/` folder provides an alternative organization by feature:
- Each section (common, auth, materials, etc.) in its own folder
- Each folder contains files for all languages
- Results in ~84 smaller files instead of 3 large files

**Best for:**
- Feature-based teams
- Lazy-loading translations
- Micro-frontend architectures
- Very large translation files (>1,500 lines)

**See:** `sections/README.md` and `sections/MIGRATION_GUIDE.md` for details

## Usage

```typescript
// Import translations
import { translations, type Translations, type Language } from '@/i18n';

// Use in components
const { t } = useLanguage();
console.log(t.common.appName); // "EduNexus"
```

## File Breakdown

### types/index.ts (859 lines)
Contains all TypeScript interface definitions:
- `Language` - Language code type ('en' | 'om' | 'am')
- `Translations` - Main translations interface
- 27 section interfaces (CommonTranslations, NavTranslations, etc.)

### translations.ts (2,435 lines)
Contains translation data for all languages:
- English: ~810 lines
- Afaan Oromoo: ~810 lines
- Amharic: ~810 lines

## Translation Sections

Each language includes translations for:

1. **common** - Common UI elements (buttons, messages)
2. **nav** - Navigation menu items
3. **auth** - Authentication (login, register)
4. **dashboard** - Dashboard page
5. **materials** - Study materials section
6. **upload** - Material upload
7. **settings** - Settings page
8. **profile** - User profile
9. **discussions** - Discussion forums
10. **news** - News and updates
11. **gpa** - GPA calculator
12. **admin** - Admin dashboard
13. **footer** - Footer content
14. **messages** - System messages
15. **buttons** - Button labels
16. **freshman** - Freshman hub
17. **community** - Community features
18. **placeholders** - Form placeholders
19. **chat** - Chat interface
20. **adminActivity** - Admin activity log
21. **materialsManagement** - Materials management
22. **featureRequest** - Feature requests
23. **aiChat** - AI chat assistant
24. **newsPage** - News creation/editing
25. **newsFilters** - News filtering
26. **discussionDetail** - Discussion details
27. **postForm** - Post creation form
28. **adminSetup** - Admin setup

## Adding New Translations

1. Add the interface to `types/index.ts`
2. Add the translation keys to all three languages in `translations.ts`
3. Use the new translations via `t.yourSection.yourKey`

## Future Improvements

### Option 1: Split by Language (Recommended for large teams)
```
i18n/
├── languages/
│   ├── en.ts  # English translations
│   ├── om.ts  # Afaan Oromoo translations
│   └── am.ts  # Amharic translations
```

### Option 2: Split by Feature (Recommended for feature-based development)
```
i18n/
├── sections/
│   ├── common.ts
│   ├── auth.ts
│   ├── materials.ts
│   └── ...
```

### Option 3: Hybrid Approach
```
i18n/
├── languages/
│   ├── en/
│   │   ├── common.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── om/
│   └── am/
```

## Translation Coverage

- **Total Keys**: ~1,050+ translation keys
- **Languages**: 3 (English, Afaan Oromoo, Amharic)
- **Coverage**: ~98% (some optional keys may be missing)
- **File Size**: 2,435 lines (down from 3,294 after type extraction)

## Maintenance Notes

- Keep all three languages in sync when adding new keys
- Use TypeScript interfaces to ensure type safety
- Test translations in all languages before deploying
- Consider using i18n validation tools for large updates

---

Last Updated: 2026-05-04
