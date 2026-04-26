import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGradeLabel } from "./utils";

interface GPADisplayProps {
  cumulativeGPA: number;
  totalCredits: number;
  semesterCount: number;
}

export const GPADisplay = ({ cumulativeGPA, totalCredits, semesterCount }: GPADisplayProps) => {
  return (
    <Card className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden transition-all duration-300">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center">
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Cumulative GPA</div>
            <div className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-1">{cumulativeGPA.toFixed(2)}</div>
            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 hover:bg-slate-200">{getGradeLabel(cumulativeGPA)}</Badge>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Credits</div>
            <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">{totalCredits}</div>
            <div className="text-slate-400 dark:text-slate-500 text-xs mt-1">Credit Hours</div>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Semesters</div>
            <div className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">{semesterCount}</div>
            <div className="text-slate-400 dark:text-slate-500 text-xs mt-1">Completed</div>
          </div>
          <div className="text-center border-l border-slate-200 dark:border-slate-800">
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Performance</div>
            <div className={`text-2xl md:text-3xl font-black ${
              cumulativeGPA >= 3.7 ? 'text-green-500 dark:text-green-400' : cumulativeGPA >= 3.0 ? 'text-blue-500 dark:text-blue-400' : cumulativeGPA >= 2.0 ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400'
            }`}>
              {cumulativeGPA >= 3.7 ? 'A' : cumulativeGPA >= 3.0 ? 'B' : cumulativeGPA >= 2.0 ? 'C' : 'D'}
            </div>
            <div className="text-slate-400 dark:text-slate-500 text-xs mt-1">Grade Level</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
