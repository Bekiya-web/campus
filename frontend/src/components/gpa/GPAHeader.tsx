import { Calculator } from "lucide-react";

export const GPAHeader = () => {
  return (
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
  );
};
