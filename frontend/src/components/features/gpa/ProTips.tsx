import { Card } from "@/components/ui/card";
import { Sparkles, Target, TrendingUp, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProTips = () => {
  const { t } = useLanguage();
  
  const tips = [
    { icon: Target, text: t.gpa.tip1 },
    { icon: TrendingUp, text: t.gpa.tip2 },
    { icon: Calculator, text: t.gpa.tip3 },
  ];
  
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white overflow-hidden p-4">
      <h3 className="font-black flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5" />
        {t.gpa.proTips}
      </h3>
      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
            <tip.icon className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{tip.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
