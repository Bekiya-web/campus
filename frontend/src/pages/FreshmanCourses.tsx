import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getFreshmanCourses } from "@/services/courseService";
import { Course } from "@/services/chatService";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, GraduationCap, Search, ChevronRight, 
  School, Users, MessageSquare, FileText, Sparkles, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

const FreshmanCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const fetchCourses = useCallback(async () => {
    try {
      const data = await getFreshmanCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by department
  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.department]) acc[course.department] = [];
    acc[course.department].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">{t.freshman.organizingResources}</p>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/10 p-8 md:p-16">
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-4 bg-primary text-primary-foreground font-bold px-3 py-1">{t.freshman.year1Resources}</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
            {t.freshman.title.split(' ')[0]} <span className="text-primary">{t.freshman.successHub.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t.freshman.crushFirstYear}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full border border-border/50 text-sm font-medium">
              <Users className="h-4 w-4 text-blue-500" />
              {t.freshman.students}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full border border-border/50 text-sm font-medium">
              <FileText className="h-4 w-4 text-primary" />
              {t.freshman.resources}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full border border-border/50 text-sm font-medium">
              <MessageSquare className="h-4 w-4 text-green-500" />
              {t.freshman.support}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/5 -skew-x-12 translate-x-12" />
        <GraduationCap className="absolute -bottom-10 -right-10 h-64 w-64 text-primary/5 -rotate-12" />
      </section>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-16">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.freshman.searchPlaceholder}
          className="pl-12 h-14 bg-background border-2 border-primary/10 focus:border-primary/50 text-lg rounded-2xl shadow-xl shadow-primary/5"
        />
      </div>

      {/* Course Grid */}
      <div className="space-y-16">
        {Object.entries(groupedCourses).map(([dept, deptCourses]) => (
          <section key={dept}>
            <div className="flex items-center gap-3 mb-8">
              <School className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{dept}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent ml-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptCourses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/courses/${course.code}`}>
                    <Card className="p-6 h-full border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-xl bg-card group overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                      
                      <div className="flex flex-col h-full relative z-10">
                        <Badge variant="outline" className="w-fit mb-3 border-primary/20 text-primary font-bold">
                          {course.code}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
                          {course.description || t.freshman.accessResources}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              {t.freshman.viewResources}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-20 text-center bg-card/30 rounded-3xl border-2 border-dashed border-border">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground mb-6">
            <GraduationCap className="h-10 w-10 opacity-20" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">{t.freshman.hubEmpty}</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            {t.freshman.checkBackSoon}
          </p>
        </div>
      )}

      {/* Support Banner */}
      <section className="mt-24 p-10 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-extrabold flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="h-8 w-8" />
              {t.freshman.needSupport}
            </h2>
            <p className="text-primary-foreground/80 max-w-lg text-lg">
              {t.freshman.mentorshipDesc}
            </p>
          </div>
          <Button size="lg" variant="secondary" className="font-extrabold px-8 h-14 text-primary text-lg shadow-xl">
            {t.freshman.joinMentorship}
          </Button>
        </div>
        <div className="absolute top-0 left-0 h-full w-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
      </section>
    </div>
  );
};

export default FreshmanCourses;
