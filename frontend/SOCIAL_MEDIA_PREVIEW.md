# Social Media Link Preview (Open Graph)

## Feature Added
Added Open Graph and Twitter Card meta tags so when the website link is shared on social media, it displays a rich preview with an image, title, and description.

## Changes Made

### File: `frontend/index.html`

**Added comprehensive meta tags for:**
- Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
- Twitter Cards
- Image preview using `/future.png`

## Meta Tags Added

### Open Graph Tags (Facebook, LinkedIn, WhatsApp, etc.)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://edunexus.vercel.app/" />
<meta property="og:title" content="EduNexus — Academic materials for Ethiopian students" />
<meta property="og:description" content="Upload, share, and access notes, past exams and study materials from 30+ Ethiopian universities. Built for students, by students." />
<meta property="og:image" content="https://edunexus.vercel.app/future.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="EduNexus - Academic materials platform for Ethiopian students" />
```

### Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://edunexus.vercel.app/" />
<meta name="twitter:title" content="EduNexus — Academic materials for Ethiopian students" />
<meta name="twitter:description" content="Upload, share, and access notes, past exams and study materials from 30+ Ethiopian universities. Built for students, by students." />
<meta name="twitter:image" content="https://edunexus.vercel.app/future.png" />
<meta name="twitter:image:alt" content="EduNexus - Academic materials platform for Ethiopian students" />
```

## Preview Image

**File:** `/public/future.png`
**URL:** `https://edunexus.vercel.app/future.png`

**Recommended dimensions:**
- Facebook/LinkedIn: 1200x630px
- Twitter: 1200x600px (or 1200x630px works too)

## How It Works

### When Link is Shared

1. **User shares link** on social media (Facebook, Twitter, LinkedIn, WhatsApp, Telegram, etc.)
2. **Platform fetches meta tags** from the website
3. **Rich preview displays** with:
   - Image (future.png)
   - Title ("EduNexus — Academic materials for Ethiopian students")
   - Description (about the platform)
   - URL

### Preview Example

```
┌─────────────────────────────────────────┐
│                                         │
│         [future.png image]              │
│                                         │
├─────────────────────────────────────────┤
│ EduNexus — Academic materials for       │
│ Ethiopian students                      │
├─────────────────────────────────────────┤
│ Upload, share, and access notes, past   │
│ exams and study materials from 30+      │
│ Ethiopian universities. Built for       │
│ students, by students.                  │
├─────────────────────────────────────────┤
│ edunexus.vercel.app                     │
└─────────────────────────────────────────┘
```

## Platforms Supported

### Open Graph (og:) Tags Work On:
- ✅ Facebook
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Telegram
- ✅ Discord
- ✅ Slack
- ✅ iMessage
- ✅ Most messaging apps

### Twitter Card Tags Work On:
- ✅ Twitter/X
- ✅ Also falls back to Open Graph if Twitter tags missing

## Testing the Preview

### Facebook Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://edunexus.vercel.app/`
3. Click "Debug"
4. See preview and any errors
5. Click "Scrape Again" to refresh cache

### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter: `https://edunexus.vercel.app/`
3. Click "Preview card"
4. See how it looks on Twitter

### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter: `https://edunexus.vercel.app/`
3. Click "Inspect"
4. See preview

### Manual Testing
1. Share link on WhatsApp/Telegram
2. Wait a few seconds
3. Preview should appear automatically

## Important Notes

### Image Requirements

**Facebook/LinkedIn:**
- Minimum: 200x200px
- Recommended: 1200x630px
- Max file size: 8MB
- Format: JPG, PNG, GIF

**Twitter:**
- Minimum: 300x157px
- Recommended: 1200x600px
- Max file size: 5MB
- Format: JPG, PNG, WebP, GIF

### URL Must Be Absolute
- ❌ Wrong: `/future.png`
- ✅ Correct: `https://edunexus.vercel.app/future.png`

### Cache Issues
- Social platforms cache meta tags
- Changes may take time to appear
- Use debugger tools to force refresh
- Facebook cache: ~24 hours
- Twitter cache: ~7 days

## Updating the Preview

### To Change Image:
1. Replace `/public/future.png` with new image
2. Keep same filename OR
3. Update meta tags with new filename
4. Deploy changes
5. Clear cache using debugger tools

### To Change Title/Description:
1. Edit meta tags in `index.html`
2. Update both `og:` and `twitter:` tags
3. Deploy changes
4. Clear cache using debugger tools

## SEO Benefits

### Beyond Social Media:
- Improves click-through rate
- Professional appearance
- Better brand recognition
- Increases trust
- More engaging shares

### Search Engines:
- Google may use og:description
- Bing uses Open Graph data
- Better search result snippets

## Troubleshooting

### Preview Not Showing?

**Check:**
1. ✅ Image URL is absolute (includes https://)
2. ✅ Image file exists at `/public/future.png`
3. ✅ Image is accessible (not blocked)
4. ✅ Meta tags are in `<head>` section
5. ✅ Website is deployed and live
6. ✅ No robots.txt blocking

**Solutions:**
- Use Facebook Debugger to see errors
- Check browser console for 404s
- Verify image loads: `https://edunexus.vercel.app/future.png`
- Clear platform cache
- Wait 5-10 minutes after deployment

### Image Not Loading?

**Common Issues:**
- File path wrong
- Image too large (>8MB)
- Wrong format
- CORS issues
- Server not responding

**Fix:**
- Check file exists in `/public/`
- Compress image if needed
- Use JPG or PNG
- Ensure public access

## Build Status
✅ **Build Successful** - 0 errors, 0 warnings

## Files Modified
1. `frontend/index.html` - Added Open Graph and Twitter Card meta tags

## Testing Checklist

- [ ] Deploy to production
- [ ] Test Facebook share preview
- [ ] Test Twitter share preview
- [ ] Test WhatsApp share preview
- [ ] Test LinkedIn share preview
- [ ] Test Telegram share preview
- [ ] Verify image loads
- [ ] Check title displays correctly
- [ ] Check description displays correctly
- [ ] Use Facebook Debugger
- [ ] Use Twitter Card Validator
- [ ] Clear cache if needed

## Example Share URLs

**Facebook:**
```
https://www.facebook.com/sharer/sharer.php?u=https://edunexus.vercel.app/
```

**Twitter:**
```
https://twitter.com/intent/tweet?url=https://edunexus.vercel.app/&text=Check%20out%20EduNexus
```

**LinkedIn:**
```
https://www.linkedin.com/sharing/share-offsite/?url=https://edunexus.vercel.app/
```

**WhatsApp:**
```
https://wa.me/?text=Check%20out%20EduNexus%20https://edunexus.vercel.app/
```

## Future Enhancements

- [ ] Add different images for different pages
- [ ] Dynamic meta tags based on page content
- [ ] Add og:site_name
- [ ] Add article-specific tags for news
- [ ] Add profile-specific tags for user pages
- [ ] Optimize image size for faster loading
- [ ] A/B test different preview images
