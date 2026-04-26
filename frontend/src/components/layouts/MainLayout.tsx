import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/common/Sidebar";
import { Navbar } from "@/components/navbar/Navbar";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin text-primary border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        {user && <Sidebar />}
        <div className={cn(
          "flex-1 flex flex-col min-w-0 dynamic-padding",
          user && "dynamic-padding-sidebar"
        )}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
