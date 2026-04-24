import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Course } from "./types";
import { getPointsColor, getGradeColor } from "./utils";

interface CourseRowProps {
  course: Course;
  index: number;
  onUpdate: (courseId: string, field: keyof Course, value: string | number) => void;
  onDelete: (courseId: string) => void;
}

export const CourseRow = ({ course, index, onUpdate, onDelete }: CourseRowProps) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-600 text-white font-bold">Course {index + 1}</Badge>
          <Button onClick={() => onDelete(course.id)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Input placeholder="Course name" value={course.name} onChange={(e) => onUpdate(course.id, 'name', e.target.value)} className="font-semibold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" />
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Credits</label>
            <Input type="number" value={course.credits} onChange={(e) => onUpdate(course.id, 'credits', parseInt(e.target.value) || 0)} className="text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" min="1" max="6" />
          </div>
          <div>
            <label className="text-xs text-slate-600 dark:text-slate-400 font-bold mb-1 block">Points</label>
            <Input type="number" value={course.points || ''} onChange={(e) => onUpdate(course.id, 'points', e.target.value)} className={`text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 ${getPointsColor(course.points)}`} min="0" max="100" />
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

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-4">
          <Input placeholder="e.g., Mathematics" value={course.name} onChange={(e) => onUpdate(course.id, 'name', e.target.value)} className="font-semibold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" />
        </div>
        <div className="md:col-span-2">
          <Input type="number" value={course.credits} onChange={(e) => onUpdate(course.id, 'credits', parseInt(e.target.value) || 0)} className="text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500" min="1" max="6" />
        </div>
        <div className="md:col-span-2">
          <Input type="number" value={course.points || ''} onChange={(e) => onUpdate(course.id, 'points', e.target.value)} className={`text-center font-bold border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 ${getPointsColor(course.points)}`} min="0" max="100" />
        </div>
        <div className="md:col-span-2 flex justify-center">
          <Badge className={`bg-gradient-to-r ${getGradeColor(course.gradePoints)} text-white border-0 font-black text-base px-4 py-2 shadow-lg`}>
            {course.grade}
          </Badge>
        </div>
        <div className="md:col-span-2 flex justify-center">
          <Button onClick={() => onDelete(course.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 border-2">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
