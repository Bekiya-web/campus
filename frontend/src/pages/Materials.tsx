import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchGeneralMaterials, Material, MaterialFilters, searchMaterials } from "@/services/materialService";
import { MaterialCard } from "@/components/common/MaterialCard";
import { SearchBar } from "@/components/common/SearchBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UNIVERSITIES, DEPARTMENTS, YEARS } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { Loader2, FilterX, BookOpen, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ANY = "__any__";

const Materials = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<MaterialFilters>({});
  const [items, setItems] = useState<Material[]>([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Check for university filter from URL
  useEffect(() => {
    const universityParam = searchParams.get('university');
    if (universityParam) {
      setFilters(prev => ({ ...prev, university: universityParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetchGeneralMaterials(filters, 100)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const visible = useMemo(() => searchMaterials(items, term), [items, term]);
  const set = (k: keyof MaterialFilters, v: string) =>
    setFilters((f) => ({ ...f, [k]: v === ANY ? undefined : v }));
  const clear = () => setFilters({});
  const hasFilters = Object.values(filters).some(Boolean);

  // Require login to access materials
  if (!user) {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto p-8 text-center border-border shadow-card">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t.materials.loginRequired}</h2>
          <p className="text-muted-foreground mb-6">
            {t.materials.loginRequiredDesc}
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/login')} variant="outline" className="font-semibold">
              {t.materials.logIn}
            </Button>
            <Button onClick={() => navigate('/register')} className="bg-blue-600 hover:bg-blue-700 font-semibold">
              {t.materials.signUp}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-blue-600" /> {t.materials.title}
        </h1>
        <p className="text-muted-foreground mt-1">{t.materials.browseFilter}</p>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        {/* Filters sidebar */}
        <aside className="space-y-4 md:sticky md:top-20 md:self-start">
          <div className="p-5 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">{t.materials.filters}</h3>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clear} className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                  <FilterX className="h-3 w-3 mr-1" /> {t.materials.clearFilters}
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">{t.materials.university}</label>
                <Select value={filters.university ?? ANY} onValueChange={(v) => set("university", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder={t.common.search} /></SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value={ANY}>{t.materials.anyUniversity}</SelectItem>
                    {UNIVERSITIES.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">{t.auth.department}</label>
                <Select value={filters.department ?? ANY} onValueChange={(v) => set("department", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder={t.common.search} /></SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value={ANY}>{t.materials.anyDepartment}</SelectItem>
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">{t.auth.year}</label>
                <Select value={filters.year ?? ANY} onValueChange={(v) => set("year", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder={t.common.search} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>{t.materials.anyYear}</SelectItem>
                    {YEARS.filter(y => y !== "1st Year").map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-5"><SearchBar onSearch={setTerm} /></div>
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <BookOpen className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">{t.materials.noMatch}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                {visible.length} {visible.length === 1 ? t.materials.result : t.materials.results}
              </p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {visible.map((m) => <MaterialCard key={m.id} material={m} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Materials;
