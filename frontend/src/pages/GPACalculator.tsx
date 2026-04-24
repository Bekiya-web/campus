import { useState, useEffect } from "react";
import {
  GPAHeader,
  GPADisplay,
  CourseManager,
  GradingScale,
  PerformanceGuide,
  ProTips,
  Semester,
  Course,
  getGradeFromPoints
} from "@/components/gpa";

const GPACalculator = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", name: "Semester 1", courses: [], gpa: 0 }
  ]);
  const [activeSemester, setActiveSemester] = useState("1");
  const [cumulativeGPA, setCumulativeGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  const calculateSemesterGPA = (courses: Course[]) => {
    if (courses.length === 0) return 0;
    const totalPoints = courses.reduce((sum, course) => sum + (course.gradePoints * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateCumulativeGPA = () => {
    const allCourses = semesters.flatMap(sem => sem.courses);
    if (allCourses.length === 0) return { gpa: 0, credits: 0 };
    const totalPoints = allCourses.reduce((sum, course) => sum + (course.gradePoints * course.credits), 0);
    const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
    return { gpa: totalCredits > 0 ? totalPoints / totalCredits : 0, credits: totalCredits };
  };

  useEffect(() => {
    const updatedSemesters = semesters.map(sem => ({ ...sem, gpa: calculateSemesterGPA(sem.courses) }));
    setSemesters(updatedSemesters);
    const { gpa, credits } = calculateCumulativeGPA();
    setCumulativeGPA(gpa);
    setTotalCredits(credits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesters.map(s => s.courses).flat().length]);

  const addCourse = () => {
    const newCourse: Course = { id: Date.now().toString(), name: "", credits: 3, points: 0, grade: "F", gradePoints: 0.0 };
    setSemesters(prev => prev.map(sem => sem.id === activeSemester ? { ...sem, courses: [...sem.courses, newCourse] } : sem));
  };

  const updateCourse = (courseId: string, field: keyof Course, value: string | number) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === activeSemester ? {
        ...sem,
        courses: sem.courses.map(course => {
          if (course.id !== courseId) return course;
          const updatedCourse = { ...course, [field]: value };
          if (field === 'points') {
            const points = Math.min(100, Math.max(0, Number(value) || 0));
            const { grade, gradePoints } = getGradeFromPoints(points);
            return { ...updatedCourse, points, grade, gradePoints };
          }
          return updatedCourse;
        })
      } : sem
    ));
  };

  const deleteCourse = (courseId: string) => {
    setSemesters(prev => prev.map(sem => sem.id === activeSemester ? { ...sem, courses: sem.courses.filter(course => course.id !== courseId) } : sem));
  };

  const addSemester = () => {
    const newSemester: Semester = { id: Date.now().toString(), name: `Semester ${semesters.length + 1}`, courses: [], gpa: 0 };
    setSemesters(prev => [...prev, newSemester]);
    setActiveSemester(newSemester.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <GPAHeader />
        <GPADisplay 
          cumulativeGPA={cumulativeGPA} 
          totalCredits={totalCredits} 
          semesterCount={semesters.length} 
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CourseManager
              semesters={semesters}
              activeSemester={activeSemester}
              onActiveSemesterChange={setActiveSemester}
              onAddSemester={addSemester}
              onAddCourse={addCourse}
              onUpdateCourse={updateCourse}
              onDeleteCourse={deleteCourse}
            />
          </div>

          <div className="space-y-6">
            <GradingScale />
            <PerformanceGuide />
            <ProTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
