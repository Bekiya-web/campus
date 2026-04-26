import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Calculator } from "lucide-react";
import { Semester, Course } from "@/types/gpa";
import { CourseRow } from "./CourseRow";
import { getGradeColor, getGradeLabel } from "./utils";

interface CourseManagerProps {
  semesters: Semester[];
  activeSemester: string;
  onActiveSemesterChange: (id: string) => void;
  onAddSemester: () => void;
  onAddCourse: () => void;
  onUpdateCourse: (courseId: string, field: keyof Course, value: string | number) => void;
  onDeleteCourse: (courseId: string) => void;
}

export const CourseManager = ({
  semesters,
  activeSemester,
  onActiveSemesterChange,
  onAddSemester,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}: CourseManagerProps) => {
  const currentSemester = semesters.find(sem => sem.id === activeSemester);

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Course Input
        </h2>
        <Button onClick={onAddSemester} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Semester
        </Button>
      </div>

      <Tabs value={activeSemester} onValueChange={onActiveSemesterChange} className="mb-6">
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
                <Button onClick={onAddCourse} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
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
                    <CourseRow
                      key={course.id}
                      course={course}
                      index={index}
                      onUpdate={onUpdateCourse}
                      onDelete={onDeleteCourse}
                    />
                  ))}
                </div>

                <Button onClick={onAddCourse} variant="outline" className="w-full mt-4 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 font-bold h-12">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Course
                </Button>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
