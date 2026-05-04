import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const PerformanceGuide = () => {
  const { t } = useLanguage();
  
  const performanceData = [
    { range: '3.7 - 4.0', label: t.gpa.excellent, desc: 'First Class', color: 'from-green-500 to-emerald-600' },
    { range: '3.3 - 3.69', label: t.gpa.veryGood, desc: 'Second Upper', color: 'from-blue-500 to-cyan-600' },
    { range: '3.0 - 3.29', label: t.gpa.good, desc: 'Second Lower', color: 'from-yellow-500 to-orange-500' },
    { range: '2.0 - 2.99', label: t.gpa.satisfactory, desc: 'Third Class', color: 'from-orange-500 to-red-500' },
  ];
  
  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
        <h3 className="text-white font-black flex items-center gap-2">
          <Award className="h-5 w-5" />
          {t.gpa.performanceGuide}
        </h3>
      </div>
      <div className="p-4 space-y-3">
        {performanceData.map((item) => (
          <div key={item.range} className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
            <div className="font-black text-sm">{item.range}</div>
            <div className="text-xs opacity-90">{item.label} • {item.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
