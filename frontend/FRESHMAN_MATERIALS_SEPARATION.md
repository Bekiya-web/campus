# Freshman Materials Separation - Implementation Guide

## Overview
The platform now properly separates **Freshman (Year 1)** materials from **General (Year 2-6)** materials, ensuring they appear in different sections of the application.

## Material Distribution

### 1. **Freshman Hub** (`/freshman-courses`)
**Shows**: Only Year 1 materials
- Materials uploaded with `year: "1"` or `year: "1st Year"`
- Organized by course code
- Only admins can upload Year 1 materials
- Displays as course cards with resource counts

**Purpose**: Dedicated hub for first-year students to find their course materials

### 2. **Materials Page** (`/materials`)
**Shows**: Only Year 2-6 materials (excludes Year 1)
- Materials uploaded with `year: "2"` through `year: "6"`
- Filterable by university, department, and year
- Year filter dropdown excludes "1st Year" option
- Standard material browsing experience

**Purpose**: General material library for upper-year students

## Technical Implementation

### New Function: `fetchGeneralMaterials()`
```typescript
// Excludes Year 1 materials
export async function fetchGeneralMaterials(
  filters: MaterialFilters = {}, 
  max = 50
): Promise<Material[]> {
  // Uses .neq("year", "1") to exclude freshman materials
}
```

### Updated Functions

1. **`fetchTrending()`** - Now excludes Year 1 from trending lists
   - Recent materials
   - Most downloaded
   - Highest rated

2. **`fetchGeneralMaterials()`** - New function for Materials page
   - Replaces `fetchMaterials()` in general browsing
   - Automatically filters out Year 1

### Files Modified

1. **`src/services/materialService.ts`**
   - Added `fetchGeneralMaterials()` function
   - Updated `fetchTrending()` to exclude Year 1

2. **`src/pages/Materials.tsx`**
   - Changed from `fetchMaterials()` to `fetchGeneralMaterials()`
   - Filtered Year dropdown to exclude "1st Year"

3. **`src/pages/Dashboard.tsx`**
   - Changed from `fetchMaterials()` to `fetchGeneralMaterials()`
   - Dashboard now shows only general materials

## Upload Behavior

### Admin Uploads Year 1 Material:
1. Admin goes to Upload page
2. Selects "1st Year" from year dropdown
3. Uploads material (only admins can do this)
4. After approval, material appears in:
   - ✅ **Freshman Courses** page (grouped by course)
   - ❌ **Materials** page (excluded)
   - ❌ **Dashboard** trending (excluded)

### User Uploads Year 2-6 Material:
1. User goes to Upload page
2. Selects "2nd Year" through "6th Year"
3. Uploads material
4. After approval, material appears in:
   - ❌ **Freshman Courses** page (excluded)
   - ✅ **Materials** page (included)
   - ✅ **Dashboard** trending (included)

## User Experience

### For Freshman Students:
- Visit **Freshman Courses** page to find Year 1 materials
- Materials organized by course for easy navigation
- Dedicated hub with curated admin-approved content

### For Upper-Year Students:
- Visit **Materials** page to browse Year 2-6 materials
- Use filters to find specific courses and departments
- Year 1 materials don't clutter their search results

### For Admins:
- Can upload to both Freshman Hub (Year 1) and General Materials (Year 2-6)
- Year 1 uploads restricted to admins only
- Clear separation helps organize content by audience

## Database Query Differences

### Freshman Courses Query:
```sql
SELECT * FROM materials 
WHERE year = '1' 
AND status = 'approved'
ORDER BY createdAt DESC
```

### General Materials Query:
```sql
SELECT * FROM materials 
WHERE year != '1' 
AND status = 'approved'
ORDER BY createdAt DESC
```

## Benefits

1. **Better Organization**: Clear separation between freshman and upper-year content
2. **Reduced Clutter**: Students only see materials relevant to their year level
3. **Admin Control**: Year 1 materials curated by admins for quality
4. **Improved Navigation**: Dedicated pages for different audiences
5. **Scalability**: Easy to add more year-specific hubs in the future

## Testing Checklist

- [ ] Upload Year 1 material as admin
- [ ] Verify it appears in Freshman Courses page
- [ ] Verify it does NOT appear in Materials page
- [ ] Upload Year 2 material as regular user
- [ ] Verify it appears in Materials page
- [ ] Verify it does NOT appear in Freshman Courses page
- [ ] Check Dashboard trending excludes Year 1
- [ ] Verify Year filter in Materials page excludes "1st Year"
- [ ] Test course-specific material display in both sections

## Future Enhancements

Potential additions:
- Dedicated hubs for other years (Sophomore Hub, Junior Hub, etc.)
- Year-specific trending sections
- Automatic year detection based on user profile
- Cross-year material recommendations
- Year progression tracking

## Notes

- The original `fetchMaterials()` function still exists for cases where all materials are needed (e.g., admin panel, course chat)
- Year 1 restriction on uploads is enforced in the Upload page
- The separation is purely based on the `year` field in the database
- Materials can be moved between sections by changing their year value
