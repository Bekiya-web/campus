import { useState } from "react";
import { Link } from "react-router-dom";
import { NewsPost } from "@/services/newsService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock, GraduationCap } from "lucide-react";
import { format, isPast } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedNewsCarouselProps {
  news: NewsPost[];
}

const categoryConfig = {
  admission: { color: "bg-blue-500", label: "Admission" },
  scholarship: { color: "bg-green-500", label: "Scholarship" },
  event: { color: "bg-purple-500", label: "Event" },
  deadline: { color: "bg-red-500", label: "Deadline" },
  announcement: { color: "bg-orange-500", label: "Announcement" }
};

export function FeaturedNewsCarousel({ news }: FeaturedNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  if (news.length === 0) return null;

  const currentNews = news[currentIndex];
  const config = categoryConfig[currentNews.category];
  const hasDeadline = currentNews.deadline && !isPast(new Date(currentNews.deadline));
  const hasEvent = currentNews.eventDate && !isPast(new Date(currentNews.eventDate));

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              {currentNews.imageUrl ? (
                <div className="absolute inset-0">
                  <img 
                    src={currentNews.imageUrl} 
                    alt={currentNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
              ) : (
                <div className={`absolute inset-0 ${config.color} bg-opacity-20`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-3xl space-y-4">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${config.color} text-white border-0 shadow-lg`}>
                      {config.label}
                    </Badge>
                    <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
                      ⭐ Featured
                    </Badge>
                  </div>

                  {/* University */}
                  <div className="flex items-center gap-2 text-white/90">
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-bold">{currentNews.universityName}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    {currentNews.title}
                  </h2>

                  {/* Summary */}
                  {currentNews.summary && (
                    <p className="text-lg text-white/90 line-clamp-2">
                      {currentNews.summary}
                    </p>
                  )}

                  {/* Deadline/Event */}
                  <div className="flex flex-wrap gap-4">
                    {hasDeadline && (
                      <div className="flex items-center gap-2 text-red-300 font-bold">
                        <Clock className="h-5 w-5" />
                        <span>Deadline: {format(new Date(currentNews.deadline!), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                    {hasEvent && (
                      <div className="flex items-center gap-2 text-purple-300 font-bold">
                        <Calendar className="h-5 w-5" />
                        <span>Event: {format(new Date(currentNews.eventDate!), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div>
                    <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-bold shadow-xl">
                      <Link to={`/news/${currentNews.id}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {news.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Indicators */}
          {news.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
