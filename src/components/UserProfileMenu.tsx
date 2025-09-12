
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Settings, User, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface UserProfileMenuProps {
  isMobile?: boolean;
}

const UserProfileMenu = ({ isMobile = false }: UserProfileMenuProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  // Get user details from localStorage
  const userEmail = localStorage.getItem('userEmail') || '';
  const userName = localStorage.getItem('userName') || 'Guest';
  const isGuest = !localStorage.getItem('demoUserLoggedIn') && !userEmail;
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    // Clear all user-related localStorage items
    localStorage.removeItem('demoUserLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Only remove the session indicators, keep "rememberUser" if user wants to be remembered
    // for next login
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    
    navigate('/');
    setOpen(false);
  };

  // If on mobile, just return the avatar without the dropdown
  if (isMobile) {
    return (
      <Avatar className="h-8 w-8 border border-muted">
        <AvatarImage src="" />
        <AvatarFallback className="bg-blue-50 text-blue-700">
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar className="h-8 w-8 border border-muted">
          <AvatarImage src="" />
          <AvatarFallback className="bg-blue-50 text-blue-700">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:block">
          {isGuest ? "Guest" : userName}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{isGuest ? "Guest User" : userName}</p>
            {!isGuest && userEmail && (
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            )}
            {isGuest && (
              <p className="text-xs text-muted-foreground">Using Neplia in guest mode</p>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => {
          navigate('/dashboard');
          setOpen(false);
        }}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        
        {isGuest ? (
          <>
            <DropdownMenuItem onClick={() => {
              navigate('/login');
              setOpen(false);
            }}>
              <User className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => {
              toast({
                title: "Profile",
                description: "Profile page is coming soon!",
              });
              setOpen(false);
            }}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => {
              toast({
                title: "Settings",
                description: "Settings page is coming soon!",
              });
              setOpen(false);
            }}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
