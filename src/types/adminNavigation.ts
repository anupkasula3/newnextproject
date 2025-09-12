
import { LucideIcon } from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: string[];
  notifications?: number; // Optional notifications count
  subItems?: AdminNavItem[]; // Optional nested navigation items
}
