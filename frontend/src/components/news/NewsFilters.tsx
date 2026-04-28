import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { NewsCategory } from "@/services/newsService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsFiltersProps {
  category: NewsCategory | 'all';
  university: string;
  searchQuery: string;
  onCategoryChange: (category: NewsCategory | 'all') => void;
  onUniversityChange: (university: string) => void;
  onSearchChange: (query: string) => void;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'admission', label: '🎓 Admissions' },
  { value: 'scholarship', label: '💰 Scholarships' },
  { value: 'event', label: '📅 Events' },
  { value: 'deadline', label: '⏰ Deadlines' },
  { value: 'announcement', label: '📢 Announcements' }
];

const universities = [
  { value: 'all', label: 'All Universities' },
  { value: 'aau', label: 'Addis Ababa University' },
  { value: 'bahir-dar', label: 'Bahir Dar University' },
  { value: 'jimma', label: 'Jimma University' },
  { value: 'haramaya', label: 'Haramaya University' },
  { value: 'mekelle', label: 'Mekelle University' },
  { value: 'hawassa', label: 'Hawassa University' },
  { value: 'gondar', label: 'University of Gondar' },
  { value: 'arba-minch', label: 'Arba Minch University' },
  { value: 'aastu', label: 'Addis Ababa Science and Technology University' },
  { value: 'dbu', label: 'Debre Berhan University' }
];

export function NewsFilters({
  category,
  university,
  searchQuery,
  onCategoryChange,
  onUniversityChange,
  onSearchChange
}: NewsFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search news, scholarships, events..." 
          className="pl-11 h-12 bg-card/50 border-border focus:ring-primary/20 text-lg shadow-sm"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={category} onValueChange={(value) => onCategoryChange(value as NewsCategory | 'all')}>
          <SelectTrigger className="w-full md:w-[250px] h-12 bg-card/50 border-border">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={university} onValueChange={onUniversityChange}>
          <SelectTrigger className="w-full md:w-[300px] h-12 bg-card/50 border-border">
            <SelectValue placeholder="Select university" />
          </SelectTrigger>
          <SelectContent>
            {universities.map(uni => (
              <SelectItem key={uni.value} value={uni.value}>
                {uni.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(category !== 'all' || university !== 'all' || searchQuery) && (
          <Button 
            variant="outline" 
            onClick={() => {
              onCategoryChange('all');
              onUniversityChange('all');
              onSearchChange('');
            }}
            className="h-12"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
