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
  BarChart3,
  CheckCircle2
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  credits: number;
  points: number; // Points out of 100
  grade: string;
  gradePoints: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}

// Ethiopian University Grading System (Points to Grade conversion)
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
    {
      id: "1",
      name: "Semester 1",
      courses: [],
      gpa: 0
    }
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
    
    return {
      gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
      credits: totalCredits
    };
  };

  useEffect(() => {
    const updatedSemesters = semesters.map(sem => ({
      ...sem,
      gpa: calculateSemesterGPA(sem.courses)
    }));
    setSemesters(updatedSemesters);
    
    const { gpa, credits } = calculateCumulativeGPA();
    setCumulativeGPA(gpa);
    setTotalCredits(credits);
  }, [semesters.map(s => s.courses).flat()]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      credits: 3,
      points: 0,
      grade: "F",
      gradePoints: 0.0
    };

    setSemesters(prev => prev.map(sem => 
      sem.id === activeSemester 
        ? { ...sem, courses: [...sem.courses, newCourse] }
        : sem
    ));
  };

  const updateCourse = (courseId: string, field: keyof Course, value: any) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === activeSemester 
        ? {
            ...sem,
            courses: sem.courses.map(course => {
              if (course.id !== courseId) return course;
              
              const updatedCourse = { ...course, [field]: value };
              
              // If points are updated, recalculate grade
              if (field === 'points') {
                const points = Math.min(100, Math.max(0, Number(value) || 0));
                const { grade, gradePoints } = getGradeFromPoints(points);
                return { ...updatedCourse, points, grade, gradePoints };
              }
              
              return updatedCourse;
            })
          }
        : sem
    ));
  };

  const deleteCourse = (courseId: string) => {
    setSemesters(prev => prev.map(sem => 
      sem.id === activeSemester 
        ? { ...sem, courses: sem.courses.filter(course => course.id !== courseId) }
        : sem
    ));
  };

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      gpa: 0
    };
    setSemesters(prev => [...prev, newSemester]);
    setActiveSemester(newSemester.id);
  };

  const currentSemester = semesters.find(sem => sem.id === activeSemester);

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs md:text-sm font-bold mb-3 md:mb-4 border border-blue-200 dark:border-blue-800">
          <Calculator className="h-3 w-3 md:h-4 md:w-4" />
          GPA CALCULATOR
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-3 md:mb-4 px-4">
          Calculate Your <span className="text-gradient">Academic Performance</span>
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Track your grades, calculate semester and cumulative GPA with our modern calculator designed for Ethiopian university students.
        </p>
      </div>

      {/* Stats Overview - Calculator Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 shadow-elegant">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs md:text-sm opacity-90 font-medium">CGPA</div>
              <div className="text-xl md:text-2xl font-extrabold">{cumulativeGPA.toFixed(2)}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 border-border shadow-card">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs md:text-sm text-muted-foreground font-medium">Credits</div>
              <div className="text-xl md:text-2xl font-extrabold text-foreground">{totalCredits}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 border-border shadow-card">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center shrink-0">
              <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs md:text-sm text-muted-foreground font-medium">Semesters</div>
              <div className="text-xl md:text-2xl font-extrabold text-foreground">{semesters.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 border-border shadow-card">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5 md:h-6 md:w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xs md:text-sm text-muted-foreground font-medium">Status</div>
              <div className="text-sm md:text-lg font-extrabold text-foreground">{getGradeLabel(cumulativeGPA)}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Calculator */}
        <div className="lg:col-span-2">
          <Card className="p-4 md:p-6 border-border shadow-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <Calculator className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                GPA Calculator
              </h2>
              <Button onClick={addSemester} variant="outline" size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Semester
              </Button>
            </div>

            {/* Semester Tabs */}
            <Tabs value={activeSemester} onValueChange={setActiveSemester} className="mb-4 md:mb-6">
              <TabsList className="bg-secondary border border-border w-full sm:w-auto grid grid-cols-2 sm:flex">
                {semesters.map((semester) => (
                  <TabsTrigger 
                    key={semester.id} 
                    value={semester.id}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold text-xs sm:text-sm"
                  >
                    {semester.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {semesters.map((semester) => (
                <TabsContent key={semester.id} value={semester.id} className="mt-4 md:mt-6">
                  <div className="space-y-3 md:space-y-4">
                    {/* Semester GPA Display - Calculator style */}
                    <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800">
                      <div>
                        <div className="text-xs md:text-sm text-blue-700 dark:text-blue-300 font-semibold">Semester GPA</div>
                        <div className="text-2xl md:text-3xl font-extrabold text-blue-900 dark:text-blue-100">{semester.gpa.toFixed(2)}</div>
                      </div>
                      <Badge 
                        className={`bg-gradient-to-r ${getGradeColor(semester.gpa)} text-white border-0 px-2 md:px-3 py-1 text-xs md:text-sm font-bold`}
                      >
                        {getGradeLabel(semester.gpa)}
                      </Badge>
                    </div>

                    {/* Course List - Calculator Style */}
                    {semester.courses.length === 0 ? (
                      <Card className="p-8 text-center border-dashed border-border">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No courses added yet</p>
                        <Button onClick={addCourse} className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Course
                        </Button>
                      </Card>
                    ) : (
                      <>
                        {/* Calculator-style table header - Desktop only */}
                        <div className="hidden md:grid md:grid-cols-12 gap-3 px-4 py-2 bg-secondary/50 rounded-lg border border-border mb-2">
                          <div className="md:col-span-4 text-xs font-bold text-muted-foreground uppercase">Course</div>
                          <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase text-center">Credits</div>
                          <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase text-center">Points</div>
                          <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase text-center">Grade</div>
                          <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase text-center">Action</div>
                        </div>

                        {/* Course rows */}
                        <div className="space-y-2">
                          {semester.courses.map((course, index) => (
                            <div key={course.id} className="bg-card border border-border rounded-lg p-3 md:p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 shadow-sm hover:shadow-md">
                              {/* Mobile: Stacked layout */}
                              <div className="md:hidden space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Course {index + 1}</span>
                                  <Button
                                    onClick={() => deleteCourse(course.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                                
                                <Input
                                  placeholder="Course name"
                                  value={course.name}
                                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                  className="border-border text-sm font-medium"
                                />
                                
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Credits</label>
                                    <Input
                                      type="number"
                                      placeholder="3"
                                      value={course.credits}
                                      onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                                      className="border-border text-center font-bold text-sm h-9"
                                      min="1"
                                      max="6"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Points</label>
                                    <Input
                                      type="number"
                                      placeholder="85"
                                      value={course.points || ''}
                                      onChange={(e) => updateCourse(course.id, 'points', e.target.value)}
                                      className={`border-border text-center font-bold text-sm h-9 ${getPointsColor(course.points)}`}
                                      min="0"
                                      max="100"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Grade</label>
                                    <div className="h-9 rounded-md bg-gradient-to-r from-secondary to-secondary/50 flex items-center justify-center border border-border">
                                      <span className={`text-sm font-extrabold ${getPointsColor(course.points)}`}>
                                        {course.grade}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Desktop: Row layout */}
                              <div className="hidden md:grid md:grid-cols-12 gap-3 items-center">
                                <div className="md:col-span-4">
                                  <Input
                                    placeholder="e.g., Mathematics"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    className="border-border font-medium"
                                  />
                                </div>
                                
                                <div className="md:col-span-2">
                                  <Input
                                    type="number"
                                    placeholder="3"
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                                    className="border-border text-center font-bold"
                                    min="1"
                                    max="6"
                                  />
                                </div>
                                
                                <div className="md:col-span-2">
                                  <Input
                                    type="number"
                                    placeholder="85"
                                    value={course.points || ''}
                                    onChange={(e) => updateCourse(course.id, 'points', e.target.value)}
                                    className={`border-border text-center font-bold ${getPointsColor(course.points)}`}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                                
                                <div className="md:col-span-2 flex justify-center">
                                  <Badge className={`bg-gradient-to-r ${getGradeColor(course.gradePoints)} text-white border-0 font-bold px-3 py-1`}>
                                    {course.grade}
                                  </Badge>
                                </div>
                                
                                <div className="md:col-span-2 flex justify-center">
                                  <Button
                                    onClick={() => deleteCourse(course.id)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add course button */}
                        <Button 
                          onClick={addCourse} 
                          variant="outline" 
                          className="w-full mt-4 border-dashed border-2 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 font-semibold"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another Course
                        </Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* GPA Scale */}
          <Card className="p-4 md:p-6 border-border shadow-card">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              Grading Scale
            </h3>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border border-emerald-200 dark:border-emerald-800">
                <span className="font-semibold text-xs md:text-sm text-emerald-700 dark:text-emerald-300">90-100</span>
                <span className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400">A+ (4.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border border-emerald-200 dark:border-emerald-800">
                <span className="font-semibold text-xs md:text-sm text-emerald-700 dark:text-emerald-300">85-89</span>
                <span className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400">A (4.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">80-84</span>
                <span className="text-xs md:text-sm text-muted-foreground">A- (3.7)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">75-79</span>
                <span className="text-xs md:text-sm text-muted-foreground">B+ (3.3)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">70-74</span>
                <span className="text-xs md:text-sm text-muted-foreground">B (3.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">65-69</span>
                <span className="text-xs md:text-sm text-muted-foreground">B- (2.7)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">60-64</span>
                <span className="text-xs md:text-sm text-muted-foreground">C+ (2.3)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">50-59</span>
                <span className="text-xs md:text-sm text-muted-foreground">C (2.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">45-49</span>
                <span className="text-xs md:text-sm text-muted-foreground">C- (1.7)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-secondary/30">
                <span className="font-semibold text-xs md:text-sm text-foreground">40-44</span>
                <span className="text-xs md:text-sm text-muted-foreground">D (1.0)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 md:py-2 px-2 md:px-3 rounded-lg bg-gradient-to-r from-red-50 to-red-50 dark:from-red-950 dark:to-red-950 border border-red-200 dark:border-red-800">
                <span className="font-semibold text-xs md:text-sm text-red-700 dark:text-red-300">0-39</span>
                <span className="text-xs md:text-sm text-red-600 dark:text-red-400">F (0.0)</span>
              </div>
            </div>
          </Card>

          {/* Performance Guide */}
          <Card className="p-4 md:p-6 border-border shadow-card">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              Performance Guide
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border border-emerald-200 dark:border-emerald-800">
                <div className="font-semibold text-xs md:text-sm text-emerald-700 dark:text-emerald-300">3.7 - 4.0</div>
                <div className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400">Excellent (First Class)</div>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-xs md:text-sm text-blue-700 dark:text-blue-300">3.3 - 3.69</div>
                <div className="text-xs md:text-sm text-blue-600 dark:text-blue-400">Very Good (Second Class Upper)</div>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border border-yellow-200 dark:border-yellow-800">
                <div className="font-semibold text-xs md:text-sm text-yellow-700 dark:text-yellow-300">3.0 - 3.29</div>
                <div className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400">Good (Second Class Lower)</div>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border border-orange-200 dark:border-orange-800">
                <div className="font-semibold text-xs md:text-sm text-orange-700 dark:text-orange-300">2.0 - 2.99</div>
                <div className="text-xs md:text-sm text-orange-600 dark:text-orange-400">Satisfactory (Third Class)</div>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 md:p-6 border-border shadow-card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              Pro Tips
            </h3>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <p className="text-muted-foreground">Focus on high-credit courses for maximum GPA impact</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <p className="text-muted-foreground">Maintain consistent performance across all semesters</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                <p className="text-muted-foreground">Use this calculator to plan your target grades</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;