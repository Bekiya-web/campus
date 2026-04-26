import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseWithResources, CourseWithDetails } from "@/services/courseService";
import { MaterialCard } from "@/components/common/MaterialCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, MessageSquare, FileText, ChevronLeft, 
  ExternalLink, Download, Share2, Sparkles, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

const CoursePage = () => {
  const { code } = useParams<{ code: string }>();
  const [course, setCourse] = useState<CourseWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = useCallback(async () => {
    try {
      const data = await getCourseWithResources(code!);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (code) fetchCourseData();
  }, [code, fetchCourseData]);

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Gathering course resources...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/freshman-courses">Back to Freshman Hub</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl">
      <Link 
        to="/freshman-courses" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Freshman Hub
      </Link>

      {/* Header Section */}
      <div className="bg-card rounded-3xl border border-border p-8 md:p-12 mb-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground font-bold px-3">{course.code}</Badge>
                <Badge variant="outline" className="border-primary/20 text-primary">{course.department}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
                {course.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {course.description || `Comprehensive resources and student discussions for ${course.name}. Join the community to share knowledge and study effectively.`}
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 shadow-lg shadow-primary/20">
                <Link to={`/global-chat?course=${course.code}`}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join Live Chat
                </Link>
              </Button>
              <Button variant="outline" className="h-12 border-border font-bold">
                <Share2 className="mr-2 h-4 w-4" />
                Share Course
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">{course.materialsCount}</span>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Materials</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">{course.discussionCount}</span>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Discussions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">Year 1</span>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Curriculum</span>
            </div>
          </div>
        </div>
        <BookOpen className="absolute -bottom-10 -right-10 h-64 w-64 text-primary/5 -rotate-12 pointer-events-none" />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="materials" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 border border-border inline-flex h-14">
          <TabsTrigger value="materials" className="px-8 h-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold gap-2">
            <FileText className="h-4 w-4" />
            Study Materials
          </TabsTrigger>
          <TabsTrigger value="discussions" className="px-8 h-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold gap-2">
            <MessageSquare className="h-4 w-4" />
            Course Discussions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="focus-visible:ring-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Downloadable Resources
            </h2>
            <Button variant="ghost" className="text-primary font-bold">
              View All <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {course.materials && course.materials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                <FileText className="h-8 w-8 opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No materials yet</h3>
              <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                Be the first to share study resources for this course and earn points!
              </p>
              <Button asChild className="mt-6 bg-primary text-primary-foreground font-bold">
                <Link to="/upload">Upload Now</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discussions" className="focus-visible:ring-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Recent Discussions
            </h2>
            <Button asChild variant="outline" className="font-bold">
              <Link to="/discussions">Go to Discussions Forum</Link>
            </Button>
          </div>
          
          <div className="bg-card rounded-3xl border border-border p-12 text-center">
            <MessageSquare className="h-12 w-12 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Engage with Peer Students</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Ask questions about assignments, share study tips, or collaborate on projects.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold px-10">
              <Link to="/discussions">Browse Discussions</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursePage;
