import { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export interface NotificationDoc {
  id: string;
  title: string;
  body: string;
  read: boolean;
  materialId?: string;
  createdAt: Date;
}
