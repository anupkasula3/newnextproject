
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { adminRoleDefinitions, AdminRole } from '@/types/adminRoles';
import { AdminNavItem } from '@/types/adminNavigation';

interface AdminMobileNavProps {
  navItems: AdminNavItem[];
  currentAdminRole: AdminRole;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (isOpen: boolean) => void;
}

const AdminMobileNav: React.FC<AdminMobileNavProps> = ({
  navItems,
  currentAdminRole,
  isMobileNavOpen,
  setIsMobileNavOpen
}) => {
  const location = useLocation();

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const getAdminRoleBadgeColor = (role: AdminRole) => {
    const roleDefinition = adminRoleDefinitions[role];
    return roleDefinition ? roleDefinition.color : 'gray';
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'red': 'bg-red-100 text-red-800',
      'orange': 'bg-orange-100 text-orange-800',
      'amber': 'bg-amber-100 text-amber-800',
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'slate': 'bg-slate-100 text-slate-800',
    };
    
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden absolute left-4 top-4 z-50">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center gap-2" onClick={closeMobileNav}>
            <div className="rounded-md bg-indigo-600 p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 7L12 12L4 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold">Neplia Admin</span>
          </Link>
          <div className={`mt-2 text-xs px-2 py-1 rounded inline-block ${getColorClass(getAdminRoleBadgeColor(currentAdminRole))}`}>
            {adminRoleDefinitions[currentAdminRole].name}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isLinkActive(item.href)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                }`}
                onClick={closeMobileNav}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.notifications && (
                  <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    {item.notifications}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/images/admin-avatar.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@neplia.com</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminMobileNav;
