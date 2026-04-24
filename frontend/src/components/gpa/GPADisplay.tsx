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
            <div className="text-3xl md:text-5xl font-black text-white">{semesterCount}</div>
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
  );
};
