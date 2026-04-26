import { supabase } from "@/integrations/supabase/client";
import { Material, fetchMaterials } from "./materialService";
import { Course } from "./chatService";

export interface CourseWithDetails extends Course {
  materialsCount: number;
  discussionCount: number;
  materials?: Material[];
}

export async function ensureCourseExists(code: string, name: string, department: string): Promise<void> {
  const { data, error } = await supabase
    .from('courses')
    .select('id')
    .eq('code', code)
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
        code,
        name,
        department,
        description: `Automated entry for ${name}`
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

export async function getCourseWithResources(courseCode: string, year = '1'): Promise<CourseWithDetails | null> {
  // Get course info
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .or(`code.eq."${courseCode}",name.eq."${courseCode}"`)
    .maybeSingle();

  if (courseError || !course) return null;

  // Get materials for this course and year
  const materials = await fetchMaterials({ course: course.code, year });
  
  // Get discussion count (mock for now or query posts)
  const { count: discussionCount } = await supabase
    .from('discussion_posts')
    .select('*', { count: 'exact', head: true })
    .ilike('title', `%${course.code}%`);

  return {
    ...course,
    materialsCount: materials.length,
    discussionCount: discussionCount || 0,
    materials
  };
}

export async function getMaterialsByYear(year: string): Promise<Material[]> {
  return fetchMaterials({ year });
}
