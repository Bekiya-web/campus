# Translation Sections

This folder is for **optional** feature-based organization of translations.

## Current Approach

Currently, translations are organized by **language** in the `languages/` folder:
- `en.ts` - All English translations
- `om.ts` - All Afaan Oromoo translations  
- `am.ts` - All Amharic translations

## Alternative: Section-Based Organization

If you prefer to organize by **feature/section** instead, you can split each language file into sections:

### Example Structure

```
sections/
├── common/
│   ├── en.ts
│   ├── om.ts
│   └── am.ts
├── auth/
│   ├── en.ts
│   ├── om.ts
│   └── am.ts
├── materials/
│   ├── en.ts
│   ├── om.ts
│   └── am.ts
└── ...
```

### When to Use Sections

**Use language-based (current)** when:
- ✅ Different people work on different languages
- ✅ You want to see all translations for one language together
- ✅ Easier to ensure translation completeness per language

**Use section-based** when:
- ✅ Different teams own different features
- ✅ You want to lazy-load translations by feature
- ✅ Features are developed independently

## How to Migrate to Sections

If you want to use section-based organization:

1. **Extract sections from language files**
   ```bash
   # Example: Extract 'common' section from all languages
   # Create sections/common/en.ts with just the common translations
   ```

2. **Update imports in translations.ts**
   ```typescript
   import { common as commonEn } from './sections/common/en';
   import { auth as authEn } from './sections/auth/en';
   // ... repeat for all sections and languages
   
   export const en: Translations = {
     common: commonEn,
     auth: authEn,
     // ...
   };
   ```

3. **Benefits of sections**
   - Smaller files (~30-50 lines per section)
   - Feature-based code ownership
   - Easier to lazy-load specific features
   - Better for micro-frontend architectures

## Current Recommendation

**Keep the current language-based structure** because:
- ✅ It's working well (0 errors)
- ✅ Files are manageable size (~810 lines)
- ✅ Easier to maintain translation consistency
- ✅ Simpler import structure

Only migrate to sections if:
- Files grow beyond 1,500 lines per language
- Multiple teams need to work on translations simultaneously
- You need feature-based lazy loading

---

**Status**: Optional - Not currently needed
**Last Updated**: 2026-05-04
