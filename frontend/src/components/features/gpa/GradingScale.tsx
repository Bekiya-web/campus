import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

const gradingData = [
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
];

export const GradingScale = () => {
  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h3 className="text-white font-black flex items-center gap-2">
          <Target className="h-5 w-5" />
          Grading Scale
        </h3>
      </div>
      <div className="p-4 space-y-2">
        {gradingData.map((item) => (
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
  );
};
