import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const GPAHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold mb-4 shadow-lg">
        <Calculator className="h-4 w-4" />
        {t.gpa.title.toUpperCase()}
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
        {t.gpa.calculator}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Calculate your academic performance with precision
      </p>
    </div>
  );
};
