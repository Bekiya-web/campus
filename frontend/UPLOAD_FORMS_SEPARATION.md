# Upload Forms Separation - Implementation Guide

## Overview
The platform now has **two separate upload forms** for different types of materials:
1. **Freshman Upload** - Simplified form for Year 1 materials (Admin only)
2. **General Upload** - Full form for Year 2-6 materials (All users)

## Upload Forms Comparison

### 1. Freshman Upload (`/freshman-upload`)

**Access**: Admin only

**Fields**:
- ✅ PDF File
- ✅ Title
- ✅ Description
- ✅ University
- ✅ Course
- ❌ Department (auto-set to "General")
- ❌ Year (auto-set to "1")

**Features**:
- Simplified form with fewer fields
- Automatic Year 1 assignment
- Automatic "General" department
- Blue graduation cap icon
- Info box explaining it's for Freshman Hub
- Link to switch to General Upload
- Materials appear in Freshman Courses page

**Route**: `/freshman-upload`

**Protection**: 
- Requires login (ProtectedRoute)
- Requires admin role (AdminRoute)
- Shows access denied message for non-admins

---

### 2. General Upload (`/upload`)

**Access**: All logged-in users

**Fields**:
- ✅ PDF File
- ✅ Title
- ✅ Description
- ✅ University
- ✅ Department
- ✅ Year (2-6 only)
- ✅ Course

**Features**:
- Full form with all fields
- Year dropdown excludes Year 1
- For admins: Link to switch to Freshman Upload
- Materials appear in Materials page
- Standard upload experience

**Route**: `/upload`

**Protection**: 
- Requires login (ProtectedRoute)
- Available to all users

---

## User Experience

### For Regular Users:
1. Click "Upload" in navbar
2. See standard upload form
3. Select Year 2-6 from dropdown
4. Fill in all fields including department
5. Upload goes to Materials page after approval

### For Admins:
1. **Option A - General Upload**:
   - Click "Upload" in navbar
   - See link: "Want to upload Year 1 materials? Use Freshman Upload →"
   - Can upload Year 2-6 materials like regular users

2. **Option B - Freshman Upload**:
   - Navigate to `/freshman-upload`
   - See simplified form
   - Only need: Title, University, Course
   - Department and Year auto-filled
   - Upload goes to Freshman Courses after approval

### For Non-Admin Trying Freshman Upload:
- Redirected to access denied page
- Shows message: "Only administrators can upload materials to the Freshman Hub"
- Buttons to go to General Upload or Dashboard

---

## Technical Implementation

### FreshmanUpload.tsx
```typescript
// Simplified form
const form = {
  title: "",
  description: "",
  university: "",
  course: "",
  // No department or year fields
};

// Auto-fill on submit
await uploadMaterial({
  ...form,
  department: "General",  // Auto-set
  year: "1",              // Auto-set
  // ... other fields
});
```

### Upload.tsx
```typescript
// Full form
const form = {
  title: "",
  description: "",
  university: "",
  department: "",  // User selects
  year: "",        // User selects (2-6 only)
  course: "",
};

// Year dropdown filters out Year 1
{YEARS.filter(y => y !== "1" && y !== "1st Year").map(...)}
```

### App.tsx Routes
```typescript
// General upload - all users
<Route path="/upload" element={
  <ProtectedRoute>
    <Upload />
  </ProtectedRoute>
} />

// Freshman upload - admin only
<Route path="/freshman-upload" element={
  <ProtectedRoute>
    <AdminRoute>
      <FreshmanUpload />
    </AdminRoute>
  </ProtectedRoute>
} />
```

---

## Form Field Comparison

| Field | Freshman Upload | General Upload |
|-------|----------------|----------------|
| PDF File | ✅ Required | ✅ Required |
| Title | ✅ Required | ✅ Required |
| Description | ✅ Optional | ✅ Optional |
| University | ✅ Required | ✅ Required |
| Department | ❌ Auto: "General" | ✅ Required |
| Year | ❌ Auto: "1" | ✅ Required (2-6) |
| Course | ✅ Required | ✅ Required |

---

## Visual Differences

### Freshman Upload:
- 🎓 Graduation cap icon in header
- Blue gradient header box
- Info alert: "Materials uploaded here will appear in the Freshman Courses page"
- Info box showing auto-filled values
- Button text: "Upload to Freshman Hub"
- Link: "Upload General Material Instead"

### General Upload:
- 📤 Standard upload icon
- Simple header
- For admins: Link to Freshman Upload
- Standard form layout
- Button text: "Upload material"

---

## Navigation Flow

```
Admin User:
  /upload → See link to Freshman Upload
  /freshman-upload → Simplified form
  
Regular User:
  /upload → Standard form
  /freshman-upload → Access denied → Redirect options
```

---

## Database Records

### Freshman Upload Result:
```json
{
  "title": "Intro to Programming Notes",
  "university": "aau",
  "department": "General",  // Auto-set
  "year": "1",              // Auto-set
  "course": "Introduction to Programming",
  "status": "pending"
}
```

### General Upload Result:
```json
{
  "title": "Data Structures Final Exam",
  "university": "aau",
  "department": "Computer Science",  // User selected
  "year": "2",                       // User selected
  "course": "Data Structures",
  "status": "pending"
}
```

---

## Benefits

1. **Simplified Admin Workflow**: Admins don't need to fill department/year for freshman materials
2. **Clear Separation**: Different forms for different purposes
3. **Reduced Errors**: Auto-filled fields prevent mistakes
4. **Better UX**: Users see only relevant fields
5. **Access Control**: Freshman upload restricted to admins
6. **Flexibility**: Admins can easily switch between forms

---

## Testing Checklist

- [ ] Admin can access `/freshman-upload`
- [ ] Regular user sees access denied at `/freshman-upload`
- [ ] Freshman upload auto-sets year to "1"
- [ ] Freshman upload auto-sets department to "General"
- [ ] General upload excludes Year 1 from dropdown
- [ ] Admin sees link to Freshman Upload on `/upload`
- [ ] Regular user doesn't see Freshman Upload link
- [ ] Freshman materials appear in Freshman Courses
- [ ] General materials appear in Materials page
- [ ] Both forms validate required fields
- [ ] Both forms show upload progress

---

## Future Enhancements

Potential additions:
- Bulk upload for freshman materials
- Template selection for common course types
- Auto-suggest course names based on university
- Preview before submission
- Draft saving functionality
- Upload history for admins
