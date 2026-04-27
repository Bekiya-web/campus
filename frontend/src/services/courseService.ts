import { supabase } from "@/integrations/supabase/client";
import { Material, fetchMaterials } from "./materialService";
import { Course } from "./chatService";

export interface CourseWithDetails extends Course {
  materialsCount: number;
  discussionCount: number;
  materials?: Material[];
}

export async function ensureCourseExists(code: string, name: string, department: string): Promise<void> {
  // Sanitize the code to make it URL-friendly
  const sanitizedCode = code
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .trim();

  const { data, error } = await supabase
    .from('courses')
    .select('id')
    .eq('code', sanitizedCode)
    .maybeSingle();

  if (error) {
    console.error("Error checking course existence:", error);
    return;
  }

  if (!data) {
    // Course doesn't exist, create it
    const { error: insertError } = await supabase
      .from('courses')
      .insert({
        code: sanitizedCode,
        name: name,
        department,
        description: `Year 1 course: ${name}`
      });
    
    if (insertError) {
      console.error("Error auto-creating course:", insertError);
    }
  }
}

export async function getFreshmanCourses(): Promise<Course[]> {
  // Fetch materials for year 1
  const { data: materials, error } = await supabase
    .from('materials')
    .select('course')
    .eq('year', '1st Year')
    .eq('status', 'approved'); // Only approved materials
  
  if (error) throw error;
  
  const courseCodes = [...new Set(materials.map(m => m.course))];
  if (courseCodes.length === 0) return [];

  // Fetch course details for these codes
  const { data: courses, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .in('code', courseCodes)
    .order('name');

  if (courseError) throw courseError;
  return courses || [];
}

export async function getCourseWithResources(courseCode: string, year = '1st Year'): Promise<CourseWithDetails | null> {
  // Get course info
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .or(`code.eq."${courseCode}",name.eq."${courseCode}"`)
    .maybeSingle();

  if (courseError || !course) return null;

  // Get materials for this course and year - query directly to ensure we get all materials
  const { data: materials, error: materialsError } = await supabase
    .from('materials')
    .select('*')
    .eq('status', 'approved')
    .eq('year', year)
    .or(`course.eq."${course.code}",course.eq."${course.name}"`)
    .order('createdAt', { ascending: false });

  if (materialsError) {
    console.error('Error fetching materials:', materialsError);
  }
  
  // Get discussion count (mock for now or query posts)
  const { count: discussionCount } = await supabase
    .from('discussion_posts')
    .select('*', { count: 'exact', head: true })
    .ilike('title', `%${course.code}%`);

  return {
    ...course,
    materialsCount: materials?.length || 0,
    discussionCount: discussionCount || 0,
    materials: (materials || []) as Material[]
  };
}

export async function getMaterialsByYear(year: string): Promise<Material[]> {
  return fetchMaterials({ year });
}
