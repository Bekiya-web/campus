import { Card } from "@/components/ui/card";
import { Users, FileText, TrendingUp, MessageSquare } from "lucide-react";
import { SystemStats } from "./types";

interface StatsCardsProps {
  systemStats: SystemStats | null;
  usersCount: number;
  materialsCount: number;
  requestsCount: number;
  messagesCount: number;
  onCardClick: (tab: string) => void;
}

export function StatsCards({ 
  systemStats, 
  usersCount, 
  materialsCount, 
  requestsCount, 
  messagesCount, 
  onCardClick 
}: StatsCardsProps) {
  if (!systemStats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick("users")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{usersCount}</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
      </Card>
      
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick("materials")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
            <p className="text-2xl font-bold">{materialsCount}</p>
          </div>
          <FileText className="h-8 w-8 text-green-600" />
        </div>
      </Card>
      
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick("requests")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Feature Requests</p>
            <p className="text-2xl font-bold">{requestsCount}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-600" />
        </div>
      </Card>
      
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick("messages")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
            <p className="text-2xl font-bold">{messagesCount}</p>
          </div>
          <MessageSquare className="h-8 w-8 text-orange-600" />
        </div>
      </Card>
    </div>
  );
}