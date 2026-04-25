import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navbar } from "@/components/navbar/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { SmartAIChatWidget } from "@/components/SmartAIChatWidget";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Materials from "./pages/Materials";
import MaterialDetail from "./pages/MaterialDetail";
import Profile from "./pages/Profile";
import GPACalculator from "./pages/GPACalculator";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import GlobalCourseChat from "./pages/GlobalCourseChat";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1 flex flex-col">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/materials/:id" element={<MaterialDetail />} />
                    <Route path="/gpa-calculator" element={<GPACalculator />} />
                    
                    {/* Protected Routes */}
                    <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/global-chat" element={<ProtectedRoute><GlobalCourseChat /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin-setup" element={<ProtectedRoute><AdminRoute><AdminSetup /></AdminRoute></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminRoute><AdminDashboard /></AdminRoute></ProtectedRoute>} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <SmartAIChatWidget />
              </div>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
