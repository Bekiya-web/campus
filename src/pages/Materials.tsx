import { useEffect, useMemo, useState } from "react";
import { fetchMaterials, Material, MaterialFilters, searchMaterials } from "@/services/materialService";
import { MaterialCard } from "@/components/MaterialCard";
import { SearchBar } from "@/components/SearchBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UNIVERSITIES, DEPARTMENTS, YEARS } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { Loader2, FilterX, BookOpen } from "lucide-react";

const ANY = "__any__";

const Materials = () => {
  const [filters, setFilters] = useState<MaterialFilters>({});
  const [items, setItems] = useState<Material[]>([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMaterials(filters, 100)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const visible = useMemo(() => searchMaterials(items, term), [items, term]);
  const set = (k: keyof MaterialFilters, v: string) =>
    setFilters((f) => ({ ...f, [k]: v === ANY ? undefined : v }));
  const clear = () => setFilters({});
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-blue-600" /> Materials
        </h1>
        <p className="text-muted-foreground mt-1">Browse, filter, and search across all uploads</p>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        {/* Filters sidebar */}
        <aside className="space-y-4 md:sticky md:top-20 md:self-start">
          <div className="p-5 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Filters</h3>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clear} className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                  <FilterX className="h-3 w-3 mr-1" /> Clear
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">University</label>
                <Select value={filters.university ?? ANY} onValueChange={(v) => set("university", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value={ANY}>Any university</SelectItem>
                    {UNIVERSITIES.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Department</label>
                <Select value={filters.department ?? ANY} onValueChange={(v) => set("department", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value={ANY}>Any department</SelectItem>
                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wide">Year</label>
                <Select value={filters.year ?? ANY} onValueChange={(v) => set("year", v)}>
                  <SelectTrigger className="h-10 text-foreground"><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any year</SelectItem>
                    {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
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
              <p className="text-muted-foreground font-medium">No materials match your filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                {visible.length} result{visible.length === 1 ? "" : "s"}
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
