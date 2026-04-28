# News Feature - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Create Database Tables (2 minutes)

1. Open **Supabase Dashboard** → **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the entire content from: `frontend/database/news/news_schema.sql`
4. Click **"Run"**
5. You should see: "Success. No rows returned"

### Step 2: Add Sample News Data (1 minute)

1. In **SQL Editor**, create another **"New Query"**
2. Copy and paste from: `frontend/database/news/sample_news_data.sql`
3. Click **"Run"**
4. You should see 7 rows inserted

### Step 3: Test the Feature (1 minute)

1. Open your app
2. Navigate to **News & Updates** in the sidebar
3. You should see:
   - Featured news carousel at the top
   - 7 news cards below
   - Filter and search options

**That's it! 🎉 The News feature is ready to use!**

---

## 📋 What You Get

### User Features
✅ Browse all university news  
✅ Featured news carousel  
✅ Filter by category (Admissions, Scholarships, Events, etc.)  
✅ Filter by university  
✅ Search news  
✅ Save/bookmark news  
✅ View full news details  
✅ See deadlines and event dates  
✅ Share news  
✅ Track views  

### Admin Features
✅ Delete news posts  
✅ View all news (including unpublished)  
✅ Edit news (UI coming soon)  
✅ Create news (UI coming soon)  

---

## 🎨 Visual Preview

### News Page Layout
```
┌─────────────────────────────────────────────┐
│  📰 University News                    [+]  │
│  Stay updated with admissions, scholarships │
├─────────────────────────────────────────────┤
│  ⭐ Featured Updates                        │
│  ┌───────────────────────────────────────┐ │
│  │  [Large Featured News Carousel]       │ │
│  │  • Auto-rotating                      │ │
│  │  • Beautiful images                   │ │
│  └───────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  [Search Bar]  [Category ▼]  [University ▼]│
├─────────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐                │
│  │News │  │News │  │News │                │
│  │Card │  │Card │  │Card │                │
│  └─────┘  └─────┘  └─────┘                │
│  ┌─────┐  ┌─────┐  ┌─────┐                │
│  │News │  │News │  │News │                │
│  │Card │  │Card │  │Card │                │
│  └─────┘  └─────┘  └─────┘                │
└─────────────────────────────────────────────┘
```

### News Card Features
- 🎨 Color-coded by category
- 🏫 University name
- 📅 Deadline/event date (if applicable)
- 👁️ View count
- 🔖 Save count
- ⭐ Featured badge
- 🔗 External link button
- 💾 Save/bookmark button

---

## 🎯 Sample News Categories

The sample data includes:

1. **💰 Scholarship** - Full Graduate Scholarship (Featured)
2. **🎓 Admission** - Undergraduate Admission 2026/2027 (Featured)
3. **📅 Event** - Annual Research Conference
4. **⏰ Deadline** - Course Registration Deadline
5. **📢 Announcement** - New Library Resources
6. **💰 Scholarship** - Erasmus+ International (Featured)
7. **📅 Event** - Career Fair 2026 (Featured)

---

## 🔧 Customization

### Add Your Own News

**Option 1: Via SQL (Quick)**
```sql
INSERT INTO news_posts (
  title, content, summary, category,
  "universityId", "universityName",
  deadline, featured, published
) VALUES (
  'Your News Title',
  'Full content here...',
  'Short summary',
  'scholarship', -- or admission, event, deadline, announcement
  'aau',
  'Addis Ababa University',
  '2026-12-31',
  true, -- featured in carousel
  true  -- published
);
```

**Option 2: Admin UI (Coming Soon)**
- Click "+ Post News" button
- Fill in the form
- Upload image
- Publish

### Supported Universities
- Addis Ababa University (aau)
- Bahir Dar University (bahir-dar)
- Jimma University (jimma)
- Haramaya University (haramaya)
- Mekelle University (mekelle)
- Hawassa University (hawassa)
- University of Gondar (gondar)
- Arba Minch University (arba-minch)
- AASTU (aastu)
- Debre Berhan University (dbu)

---

## 🐛 Troubleshooting

### "News page is empty"
- Check if you ran the sample data SQL
- Verify news is published: `SELECT * FROM news_posts WHERE published = true;`

### "Can't save news"
- Make sure you're logged in
- Check browser console for errors
- Verify `saved_news` table exists

### "Featured carousel not showing"
- Check if any news has `featured = true`
- Run: `SELECT * FROM news_posts WHERE featured = true;`

### "Admin features not visible"
- Confirm you're logged in as admin
- Check: `SELECT role FROM users WHERE uid = 'your-user-id';`
- Should return `'admin'`

---

## 📊 Database Tables

### news_posts
Main news content with all details

### saved_news
Tracks which users saved which news

### news_views
Tracks which users viewed which news (for analytics)

---

## 🎓 Next Steps

1. ✅ **Test the feature** - Browse, filter, search, save news
2. ✅ **Add real news** - Replace sample data with actual university news
3. ✅ **Customize universities** - Add/remove universities in filters
4. ⏳ **Admin UI** - Create news posting interface (optional)
5. ⏳ **Notifications** - Email alerts for new news (optional)
6. ⏳ **Calendar integration** - Sync events to calendar (optional)

---

## 📚 Documentation

- **Full Guide**: `NEWS_FEATURE_GUIDE.md`
- **Database Schema**: `news_schema.sql`
- **Sample Data**: `sample_news_data.sql`

---

## ✨ Feature Highlights

- **Real-time updates**: New news appears automatically
- **Responsive design**: Works on all devices
- **Dark mode**: Full dark mode support
- **Accessibility**: Screen reader friendly
- **Performance**: Optimized queries with indexes
- **Security**: Row-level security enabled

---

**Enjoy your new News feature! 🎉**

Need help? Check the full documentation or ask for assistance.
