import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Target,
  Sparkles,
  GraduationCap,
  BarChart3
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  credits: number;
  points: number;
  grade: string;
  gradePoints: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}

const getGradeFromPoints = (points: number): { grade: string; gradePoints: number } => {
  if (points >= 90) return { grade: "A+", gradePoints: 4.0 };
  if (points >= 85) return { grade: "A", gradePoints: 4.0 };
  if (points >= 80) return { grade: "A-", gradePoints: 3.7 };
  if (points >= 75) return { grade: "B+", gradePoints: 3.3 };
  if (points >= 70) return { grade: "B", gradePoints: 3.0 };
  if (points >= 65) return { grade: "B-", gradePoints: 2.7 };
  if (points >= 60) return { grade: "C+", gradePoints: 2.3 };
  if (points >= 50) return { grade: "C", gradePoints: 2.0 };
  if (points >= 45) return { grade: "C-", gradePoints: 1.7 };
  if (points >= 40) return { grade: "D", gradePoints: 1.0 };
  return { grade: "F", gradePoints: 0.0 };
};

const getGradeColor = (gpa: number) => {
  if (gpa >= 3.7) return "from-emerald-500 to-green-600";
  if (gpa >= 3.3) return "from-blue-500 to-cyan-600";
  if (gpa >= 3.0) return "from-yellow-500 to-orange-500";
  if (gpa >= 2.0) return "from-orange-500 to-red-500";
  return "from-red-500 to-red-700";
};

const getGradeLabel = (gpa: number) => {
  if (gpa >= 3.7) return "Excellent";
  if (gpa >= 3.3) return "Very Good";
  if (gpa >= 3.0) return "Good";
  if (gpa >= 2.0) return "Satisfactory";
  return "Needs Improvement";
};

const getPointsColor = (points: number) => {
  if (points >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (points >= 75) return "text-blue-600 dark:text-blue-400";
  if (points >= 60) return "text-yellow-600 dark:text-yellow-400";
  if (points >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

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
  }, [semesters.map(s => s.courses).flat()]);

  const addCourse = () => {
    const newCourse: Course = { id: Date.now().toString(), name: "", credits: 3, points: 0, grade: "F", gradePoints: 0.0 };
    setSemesters(prev => prev.map(sem => sem.id === activeSemester ? { ...sem, courses: [...sem.courses, newCourse] } : sem));
  };

  const updateCourse = (courseId: string, field: keyof Course, value: any) => {
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

  const currentSemester = semesters.find(sem => sem.id === activeSemester);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold mb-4 shadow-lg">
            <Calculator className="h-4 w-4" />
            GPA CALCULATOR
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Smart GPA Calculator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Calculate your academic performance with precision
          </p>
        </div>

        {/* Calculator Display - Modern Stats */}
        <Card className="mb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 border-0 shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Cumulative GPA</div>
                <div className="text-4xl md:text-6xl font-black text-white mb-1">{cumulativeGPA.toFixed(2)}</div>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">{getGradeLabel(cumulativeGPA)}</Badge>
              </div>
              <div className="text-center border-l border-white/20">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Total Credits</div>
                <div className="text-3xl md:text-5xl font-black text-white">{totalCredits}</div>
                <div className="text-blue-200 text-xs mt-1">Credit Hours</div>
              </div>
              <div className="text-center border-l border-white/20">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Semesters</div>
                <div className="text-3xl md:text-5xl font-black text-white">{semesters.length}</div>
                <div className="text-blue-200 text-xs mt-1">Completed</div>
              </div>
              <div className="text-center border-l border-white/20">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">Performance</div>
                <div className={`text-2xl md:text-3xl font-black ${
                  cumulativeGPA >= 3.7 ? 'text-green-300' : cumulativeGPA >= 3.0 ? 'text-yellow-300' : cumulativeGPA >= 2.0 ? 'text-orange-300' : 'text-red-300'
                }`}>
                  {cumulativeGPA >= 3.7 ? 'A' : cumulativeGPA >= 3.0 ? 'B' : cumulativeGPA >= 2.0 ? 'C' : 'D'}
                </div>
                <div className="text-blue-200 text-xs mt-1">Grade Level</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Course Input
                </h2>
                <Button onClick={addSemester} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Semester
                </Button>
              </div>

              <Tabs value={activeSemester} onValueChange={setActiveSemester} className="mb-6">
                <TabsList className="bg-slate-100 dark:bg-slate-800 border-0 p-1 w-full grid grid-cols-2 sm:flex">
                  {semesters.map((semester) => (
                    <TabsTrigger key={semester.id} value={semester.id} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold rounded-lg">
                      {semester.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {semesters.map((semester) => (
                  <TabsContent key={semester.id} value={semester.id} className="mt-6">
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Semester GPA</div>
                          <div className="text-3xl font-black text-slate-900 dark:text-white">{semester.gpa.toFixed(2)}</div>
                        </div>
                        <Badge className={`bg-gradient-to-r ${getGradeColor(semester.gpa)} text-white border-0 px-4 py-2 text-sm font-bold shadow-lg`}>
                          {getGradeLabel(semester.gpa)}
                        </Badge>
                      </div>
                    </div>

                    {semester.courses.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                        <Calculator className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-600 dark:text-slate-400 mb-4 font-medium">No courses added yet</p>
                        <Button onClick={addCourse} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Course
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="hidden md:grid md:grid-cols-12 gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
                          <div className="md:col-span-4 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">Course Name</div>
                          <div className="md:col-span-2 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">Credits</div>
                          <div className="md:col-span-2 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">Points</div>
                          <div className="md:col-span-2 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">Grade</div>
                          <div className="md:col-span-2 text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">Action</div>
                        </div>

                        <div className="space-y-3">
                          {semester.courses.map((course, index) => (
                            <div key={course.id} className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg">
                              <div className="md:hidden space-y-3">
                                <div className="flex items-center justify-between">
                                  <Badge className="bg-blue-600 text-white font-bold">Course {index + 1}</Badge>
                                  <Button onClick={() => deleteCourse(course.id)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Input placeholder="Course name" value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)} className="font-semibold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" />
                                <div className="grid grid-cols-3 gap-3">
                                  <div>
                                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Credits</label>
                                    <Input type="number" value={course.credits} onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)} className="text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" min="1" max="6" />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Points</label>
                                    <Input type="number" value={course.points || ''} onChange={(e) => updateCourse(course.id, 'points', e.target.value)} className={`text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 ${getPointsColor(course.points)}`} min="0" max="100" />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Grade</label>
                                    <div className={`h-10 rounded-lg flex items-center justify-center font-black text-lg ${
                                      course.points >= 85 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                                      course.points >= 70 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                                      course.points >= 50 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' :
                                      'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                    }`}>
                                      {course.grade}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="hidden md:grid md:grid-cols-12 gap-3 items-center">
                                <div className="md:col-span-4">
                                  <Input placeholder="e.g., Mathematics" value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)} className="font-semibold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" />
                                </div>
                                <div className="md:col-span-2">
                                  <Input type="number" value={course.credits} onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)} className="text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" min="1" max="6" />
                                </div>
                                <div className="md:col-span-2">
                                  <Input type="number" value={course.points || ''} onChange={(e) => updateCourse(course.id, 'points', e.target.value)} className={`text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 ${getPointsColor(course.points)}`} min="0" max="100" />
                                </div>
                                <div className="md:col-span-2 flex justify-center">
                                  <Badge className={`bg-gradient-to-r ${getGradeColor(course.gradePoints)} text-white border-0 font-black text-base px-4 py-2 shadow-lg`}>
                                    {course.grade}
                                  </Badge>
                                </div>
                                <div className="md:col-span-2 flex justify-center">
                                  <Button onClick={() => deleteCourse(course.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 border-2">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button onClick={addCourse} variant="outline" className="w-full mt-4 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 font-bold h-12">
                          <Plus className="h-5 w-5 mr-2" />
                          Add Another Course
                        </Button>
                      </>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </div>

          {/* Sidebar - Quick Reference */}
          <div className="space-y-6">
            {/* Grading Scale */}
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <h3 className="text-white font-black flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Grading Scale
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { range: '90-100', grade: 'A+', points: '4.0', color: 'from-green-500 to-emerald-600' },
                  { range: '85-89', grade: 'A', points: '4.0', color: 'from-green-500 to-emerald-600' },
                  { range: '80-84', grade: 'A-', points: '3.7', color: 'from-blue-500 to-cyan-600' },
                  { range: '75-79', grade: 'B+', points: '3.3', color: 'from-blue-500 to-cyan-600' },
                  { range: '70-74', grade: 'B', points: '3.0', color: 'from-yellow-500 to-orange-500' },
                  { range: '65-69', grade: 'B-', points: '2.7', color: 'from-yellow-500 to-orange-500' },
                  { range: '60-64', grade: 'C+', points: '2.3', color: 'from-orange-500 to-red-500' },
                  { range: '50-59', grade: 'C', points: '2.0', color: 'from-orange-500 to-red-500' },
                  { range: '45-49', grade: 'C-', points: '1.7', color: 'from-red-500 to-red-600' },
                  { range: '40-44', grade: 'D', points: '1.0', color: 'from-red-600 to-red-700' },
                  { range: '0-39', grade: 'F', points: '0.0', color: 'from-red-700 to-red-800' },
                ].map((item) => (
                  <div key={item.range} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.range}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`bg-gradient-to-r ${item.color} text-white border-0 font-black`}>{item.grade}</Badge>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">{item.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Guide */}
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                <h3 className="text-white font-black flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Performance Levels
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { range: '3.7 - 4.0', label: 'Excellent', desc: 'First Class', color: 'from-green-500 to-emerald-600' },
                  { range: '3.3 - 3.69', label: 'Very Good', desc: 'Second Upper', color: 'from-blue-500 to-cyan-600' },
                  { range: '3.0 - 3.29', label: 'Good', desc: 'Second Lower', color: 'from-yellow-500 to-orange-500' },
                  { range: '2.0 - 2.99', label: 'Satisfactory', desc: 'Third Class', color: 'from-orange-500 to-red-500' },
                ].map((item) => (
                  <div key={item.range} className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                    <div className="font-black text-sm">{item.range}</div>
                    <div className="text-xs opacity-90">{item.label} • {item.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pro Tips */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white overflow-hidden p-4">
              <h3 className="font-black flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" />
                Pro Tips
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Target, text: 'Focus on high-credit courses' },
                  { icon: TrendingUp, text: 'Maintain consistent performance' },
                  { icon: Calculator, text: 'Plan your target grades ahead' },
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                    <tip.icon className="h-5 w-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{tip.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
