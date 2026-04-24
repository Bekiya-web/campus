import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  initial?: string;
}

export function SearchBar({ onSearch, placeholder = "Search materials, courses…", initial = "" }: SearchBarProps) {
  const [term, setTerm] = useState(initial);
  const [debounced] = useDebounce(term, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-11 bg-card shadow-soft"
      />
    </div>
  );
}
