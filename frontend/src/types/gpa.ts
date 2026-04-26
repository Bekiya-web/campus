export interface Course {
  id: string;
  name: string;
  credits: number;
  points: number;
  grade: string;
  gradePoints: number;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}
