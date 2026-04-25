import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  getCourses,
  getOrCreateCourseByCode,
  getRoomsForCourse,
  getOrCreateGlobalRoom,
  getDMRooms,
  getOrCreateDMRoom,
  getMessages,
  sendChatMessage,
  subscribeToRoom,
  deleteCourse,
  deleteMessage,
  Course,
  ChatRoom,
  ChatMessage,
} from "@/services/chatService";
import { fetchMaterials, Material } from "@/services/materialService";
import { getPendingMaterials } from "@/services/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Hash,
  Globe,
  School,
  Send,
  Search,
  Plus,
  MoreVertical,
  Pin,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
  Smile,
  ChevronRight,
  Menu,
  X,
  Reply,
  User,
  Inbox,
  Trash2,
  Info,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const GlobalCourseChat = () => {
  const { user, profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [dmRooms, setDmRooms] = useState<ChatRoom[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [isSearchingMessages, setIsSearchingMessages] = useState(false);
  const [courseMaterials, setCourseMaterials] = useState<Material[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [showMaterials, setShowMaterials] = useState(false);
  
  const [searchParams] = useSearchParams();
  const initialCourseCode = searchParams.get("course");
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    const init = async () => {
      try {
        const [courseData, dmData] = await Promise.all([
          getCourses(),
          user ? getDMRooms(user.id) : Promise.resolve([])
        ]);
        setCourses(courseData);
        setDmRooms(dmData);
        
        if (initialCourseCode) {
          const targetCourse = await getOrCreateCourseByCode(initialCourseCode);
          if (!courseData.find(c => c.id === targetCourse.id)) {
            setCourses(prev => [targetCourse, ...prev]);
          }
          handleSelectCourse(targetCourse);
        } else if (courseData.length > 0) {
          handleSelectCourse(courseData[0]);
        }
      } catch (error: any) {
        console.error("Chat Init Error:", error);
        toast.error("Failed to initialize chat hub.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user, initialCourseCode]);

  const handleSelectCourse = async (course: Course) => {
    setSelectedCourse(course);
    try {
      const [courseRooms, allMaterials, pendingMaterials] = await Promise.all([
        getRoomsForCourse(course.id),
        fetchMaterials(),
        isAdmin ? getPendingMaterials() : Promise.resolve([])
      ]);
      
      setRooms(courseRooms);
      
      const relatedMaterials = allMaterials.filter(m => m.course === course.name || m.course === course.code);
      setCourseMaterials(relatedMaterials);
      
      const relatedPending = pendingMaterials.filter(m => m.course === course.name || m.course === course.code);
      setPendingCount(relatedPending.length);
      
      const uniRoom = courseRooms.find(r => r.type === 'university' && r.universityId === profile?.university);
      const globalRoom = courseRooms.find(r => r.type === 'global');
      
      if (uniRoom || globalRoom) {
        setActiveRoom(uniRoom || globalRoom || null);
      } else {
        const newGlobal = await getOrCreateGlobalRoom(course.id);
        setRooms(prev => [...prev, newGlobal]);
        setActiveRoom(newGlobal);
      }
    } catch (error) {
      toast.error("Failed to load course details");
    }
  };

  const handleDeleteActiveCourse = async () => {
    if (!selectedCourse || !isAdmin) return;
    if (!confirm(`Are you sure you want to delete ${selectedCourse.code}? This will remove ALL chat history and rooms.`)) return;

    try {
      await deleteCourse(selectedCourse.id);
      setCourses(prev => prev.filter(c => c.id !== selectedCourse.id));
      setSelectedCourse(null);
      setActiveRoom(null);
      toast.success("Course and its discussions deleted.");
    } catch (error) {
      toast.error("Failed to delete course.");
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    try {
      await deleteMessage(msgId);
      setMessages(prev => prev.filter(m => m.id !== msgId));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const handleStartDM = async (otherUserId: string, otherUserName: string) => {
    if (!user) return;
    try {
      const room = await getOrCreateDMRoom(user.id, otherUserId);
      setDmRooms(prev => {
        if (prev.find(r => r.id === room.id)) return prev;
        return [...prev, room];
      });
      setSelectedCourse(null);
      setActiveRoom(room);
    } catch (error) {
      toast.error("Failed to start direct message");
    }
  };

  useEffect(() => {
    if (!activeRoom) return;
    
    const loadMessages = async () => {
      const data = await getMessages(activeRoom.id);
      setMessages(data);
    };
    loadMessages();

    const subscription = subscribeToRoom(activeRoom.id, (newMsg) => {
      setMessages(prev => {
        if (prev.find(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [activeRoom]);

  useEffect(() => {
    if (scrollRef.current && !isSearchingMessages) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSearchingMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeRoom || !user || !profile) return;

    if (profile.canChat === false) {
      toast.error("You have been restricted from chatting by an admin.");
      return;
    }

    try {
      await sendChatMessage({
        roomId: activeRoom.id,
        senderId: user.id,
        senderName: profile.name,
        content: inputValue,
        replyToId: replyTo?.id,
      });
      setInputValue("");
      setReplyTo(null);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m => 
    m.content.toLowerCase().includes(messageSearchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="h-[80vh] flex items-center justify-center">Loading EduNexus Chat...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="border-r bg-muted/30 flex flex-col overflow-hidden relative z-20"
      >
        <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur-md">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Global Hub
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-3 border-b bg-background/30">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..." 
              className="pl-9 bg-background/50 border-none ring-1 ring-border" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Active Channels</p>
            {filteredCourses.map(course => (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 group",
                  selectedCourse?.id === course.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "hover:bg-background/80"
                )}
              >
                <div className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                  selectedCourse?.id === course.id ? "bg-white/20" : "bg-blue-50 text-blue-600"
                )}>
                  <Hash className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold truncate text-xs">{course.code}</p>
                    {isAdmin && (
                      <Trash2 
                        className="h-3 w-3 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-200" 
                        onClick={(e) => { e.stopPropagation(); handleDeleteActiveCourse(); }} 
                      />
                    )}
                  </div>
                  <p className={cn(
                    "text-[11px] truncate leading-tight",
                    selectedCourse?.id === course.id ? "text-blue-100" : "text-muted-foreground"
                  )}>
                    {course.name}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {dmRooms.length > 0 && (
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Inbox</p>
              {dmRooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => { setSelectedCourse(null); setActiveRoom(room); }}
                  className={cn(
                    "w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 group",
                    activeRoom?.id === room.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "hover:bg-background/80"
                  )}
                >
                  <div className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0",
                    activeRoom?.id === room.id ? "bg-white/20" : "bg-slate-100 text-slate-600"
                  )}>
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-xs">Direct Chat</p>
                    <p className={cn("text-[11px] truncate", activeRoom?.id === room.id ? "text-blue-100" : "text-muted-foreground")}>
                      Private Conversation
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background relative">
        {!activeRoom ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-slate-50/30">
            <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6 shadow-xl">
              <Globe className="h-10 w-10 text-blue-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">EduNexus Hub</h3>
            <p className="max-w-md mx-auto mt-2">Join a discussion or start a private message.</p>
          </div>
        ) : (
          <>
            <header className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-5 w-5" />
                  </Button>
                )}
                <div>
                  <h3 className="font-bold flex items-center gap-2 text-lg">
                    {activeRoom.type === 'direct' ? "Private Conversation" : (
                      <>
                        {selectedCourse?.name} 
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">{selectedCourse?.code}</Badge>
                        {pendingCount > 0 && isAdmin && (
                          <Badge className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {pendingCount} Pending
                          </Badge>
                        )}
                      </>
                    )}
                  </h3>
                  {activeRoom.type !== 'direct' && (
                    <div className="flex gap-2 mt-1">
                      {rooms.map(room => (
                        <button
                          key={room.id}
                          onClick={() => setActiveRoom(room)}
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter transition-all",
                            activeRoom?.id === room.id ? "bg-blue-600 text-white font-bold" : "bg-muted text-muted-foreground hover:bg-blue-100"
                          )}
                        >
                          {room.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {isSearchingMessages ? (
                  <div className="flex items-center gap-2 bg-muted rounded-lg px-2 mr-2">
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                    <Input 
                      autoFocus
                      placeholder="Find in chat..."
                      value={messageSearchQuery}
                      onChange={(e) => setMessageSearchQuery(e.target.value)}
                      className="h-8 border-none bg-transparent focus-visible:ring-0 text-xs w-40"
                    />
                    <X className="h-3.5 w-3.5 cursor-pointer" onClick={() => { setIsSearchingMessages(false); setMessageSearchQuery(""); }} />
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchingMessages(true)}><Search className="h-4 w-4" /></Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowMaterials(!showMaterials)}
                  className={cn("gap-2 text-xs", showMaterials ? "bg-blue-50 text-blue-600" : "text-muted-foreground")}
                >
                  <FileText className="h-4 w-4" /> 
                  <span className="hidden md:inline">Materials</span>
                  {courseMaterials.length > 0 && <Badge className="h-4 w-4 p-0 bg-blue-600">{courseMaterials.length}</Badge>}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Channel Options</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2"><Info className="h-4 w-4" /> View Details</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Pin className="h-4 w-4" /> Pinned Messages</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isAdmin && activeRoom.type !== 'direct' && (
                      <>
                        <DropdownMenuItem className="text-red-600 gap-2 focus:bg-red-50" onClick={handleDeleteActiveCourse}>
                          <Trash2 className="h-4 w-4" /> Delete Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><AlertTriangle className="h-4 w-4" /> Moderate Room</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative">
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50"
              >
              {(messageSearchQuery ? filteredMessages : messages).map((msg, i) => {
                const isMe = msg.senderId === user?.id;
                const prevMsg = messages[i - 1];
                const showSender = !prevMsg || prevMsg.senderId !== msg.senderId;

                return (
                  <div key={msg.id} className={cn("flex group", isMe ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] flex flex-col", isMe ? "items-end" : "items-start")}>
                      {showSender && !isMe && (
                        <div className="flex items-center gap-2 ml-2 mb-1">
                          <button 
                            onClick={() => handleStartDM(msg.senderId, msg.senderName)}
                            className="text-[11px] font-bold text-blue-600 hover:underline"
                          >
                            {msg.senderName}
                          </button>
                        </div>
                      )}
                      
                      <div className="relative">
                        <div className={cn(
                          "absolute -top-8 bg-background border rounded-lg shadow-sm p-1 gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex z-10",
                          isMe ? "right-0" : "left-0"
                        )}>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setReplyTo(msg)}><Reply className="h-3 w-3" /></Button>
                          {(isAdmin || isMe) && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleDeleteMessage(msg.id)}><Trash2 className="h-3 w-3" /></Button>
                          )}
                        </div>

                        <div className={cn(
                          "p-3 rounded-2xl shadow-sm",
                          isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 rounded-tl-none border"
                        )}>
                          {msg.replyToId && (
                            <div className="text-[10px] mb-2 p-1.5 rounded bg-black/10 border-l-2 border-white/50">Replying to a message</div>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1 opacity-50">
                            <span className="text-[9px]">{format(new Date(msg.createdAt), "h:mm a")}</span>
                            {isMe && <CheckCircle2 className="h-2.5 w-2.5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>

              <AnimatePresence>
                {showMaterials && (
                  <motion.div
                    initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
                    className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l shadow-xl z-20 flex flex-col"
                  >
                    <div className="p-4 border-b flex items-center justify-between">
                      <h4 className="font-bold text-sm">Course Materials</h4>
                      <X className="h-4 w-4 cursor-pointer" onClick={() => setShowMaterials(false)} />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {courseMaterials.map(mat => (
                        <Link key={mat.id} to={`/materials/${mat.id}`} className="block p-3 rounded-lg border hover:bg-blue-50 transition-colors">
                          <p className="font-bold text-xs truncate">{mat.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">By {mat.uploaderName}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <footer className="p-4 border-t">
              <div className="max-w-4xl mx-auto">
                <AnimatePresence>
                  {replyTo && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-muted p-2 rounded-t-lg flex items-center justify-between">
                      <span className="text-xs truncate">Replying to {replyTo.senderName}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setReplyTo(null)} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..." 
                    className="rounded-xl"
                  />
                  <Button type="submit" size="icon" className="bg-blue-600 rounded-xl flex-shrink-0"><Send className="h-4 w-4" /></Button>
                </form>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
};

export default GlobalCourseChat;
